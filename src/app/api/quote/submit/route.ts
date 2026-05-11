import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import nodemailer from 'nodemailer';

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

    // 4. Send Summary Email to User
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Register Startup" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Enquiry Received - Register Startup',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1D1D1F; background-color: #F5F5F7;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
              <div style="background: #0071E3; padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Enquiry Received!</h1>
                <p style="color: rgba(255,255,255,0.8); margin-top: 10px;">Making your first step towards Unicorn.</p>
              </div>
              <div style="padding: 40px;">
                <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${fullName}</strong>,</p>
                <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to <strong>Register Startup</strong>. We have received your enquiry and our experts are already reviewing it.</p>
                
                <div style="margin: 30px 0; padding: 20px; background: #F5F5F7; border-radius: 12px;">
                  <h3 style="margin-top: 0; color: #0071E3; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Enquiry Summary</h3>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Name:</strong> ${fullName}</p>
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Phone:</strong> ${phone}</p>
                  <p style="margin: 15px 0 5px 0; font-size: 14px; font-weight: bold;">Enquiry Details:</p>
                  <p style="margin: 5px 0; font-size: 14px; line-height: 1.5; color: #424245;">${enquiry}</p>
                </div>

                <p style="font-size: 14px; color: #6E6E73;">Our team will get back to you within 24-48 hours with a customized plan and quotation.</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center;">
                  <p style="font-size: 12px; color: #86868B; margin: 0;">&copy; 2024 Register Startup. All rights reserved.</p>
                  <p style="font-size: 12px; color: #86868B; margin: 5px 0;">India's Premier Business Formation Platform</p>
                </div>
              </div>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    console.error('Quote Submit Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
