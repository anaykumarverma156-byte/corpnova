import { NextResponse } from 'next/server';
import { query, initDb } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await initDb();
    const { email } = await req.json();

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        message: 'Database connection not configured. Please add DATABASE_URL to your .env file.' 
      }, { status: 500 });
    }

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in database
    await query(
      'INSERT INTO otps (email, otp, expires_at) VALUES ($1, $2, $3)',
      [email, otp, expiresAt]
    );

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`--- DEV MODE: OTP for ${email} is ${otp} ---`);
      return NextResponse.json({ 
        message: 'OTP generated! (Check server console for the code, as SMTP is not configured in .env)' 
      });
    }

    // Send Real Email
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
      subject: 'Your OTP for Get Quote - Register Startup',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0071E3;">Verify Your Email</h2>
          <p>You requested a custom quote from Register Startup. Use the OTP below to verify your email address:</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 10px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0071E3;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">This OTP will expire in 10 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'OTP sent to your email successfully!' });
  } catch (error: any) {
    console.error('OTP Send Error:', error);
    return NextResponse.json({ message: 'Failed to send OTP. Please try again later.' }, { status: 500 });
  }
}
