import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL is not set in environment variables. Database features will fail.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async () => {
  const createQuotesTable = `
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT,
      enquiry TEXT NOT NULL,
      consent BOOLEAN NOT NULL,
      answered BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createOtpsTable = `
    CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      otp TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await query(createQuotesTable);
  await query(createOtpsTable);
};
