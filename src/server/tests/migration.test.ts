import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

describe('Database Migration Integration Tests', () => {
  afterAll(async () => {
    await pool.end();
  });

  test('Verify that the "country" column exists and Sofia is updated', async () => {
    const res = await pool.query(
      "SELECT name, country FROM cities WHERE name = 'Sofia'",
    );

    expect(res.rows.length).toBe(1);

    expect(res.rows[0].name).toBe('Sofia');
    expect(res.rows[0].country).toBe('Bulgaria');
  });
});
