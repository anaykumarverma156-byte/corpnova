const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  try {
    console.log('Running migration...');
    await pool.query('ALTER TABLE quotes ADD COLUMN IF NOT EXISTS answered BOOLEAN DEFAULT FALSE;');
    console.log('Migration successful: "answered" column added to quotes table.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

migrate();
