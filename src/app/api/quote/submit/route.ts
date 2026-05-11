import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        message: 'Database connection not configured. Please add DATABASE_URL to your .env file.' 
      }, { status: 500 });
    }
    const { fullName, email, phone, whatsapp, enquiry, consent, otp } = await req.json();

    // 1. Verify OTP
    const otpResult = await query(
      'SELECT * FROM otps WHERE email = $1 AND otp = $2 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [email, otp]
    );

    if (otpResult.rows.length === 0) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // 2. Delete used OTP
    await query('DELETE FROM otps WHERE email = $1', [email]);

    // 3. Save Enquiry to Database
    await query(
      'INSERT INTO quotes (full_name, email, phone, whatsapp, enquiry, consent) VALUES ($1, $2, $3, $4, $5, $6)',
      [fullName, email, phone, whatsapp, enquiry, consent]
    );

    return NextResponse.json({ message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    console.error('Quote Submit Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
