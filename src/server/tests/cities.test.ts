import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

describe('Cities Database Integration Tests', () => {
  
  afterAll(async () => {
    await pool.end();
  });

  test('The database should contain the correct initial cities', async () => {
    const res = await pool.query('SELECT name, population FROM cities ORDER BY population DESC');
    
    expect(res.rows[0].name).toBe('Sofia');
    expect(res.rows.length).toBeGreaterThanOrEqual(3);
  });

  test('The total population from the database should be calculated correctly', async () => {
    const res = await pool.query('SELECT population FROM cities');
    
    const totalPopulation = res.rows.reduce(
      (sum, row) => sum + parseInt(row.population),
      0
    );

    const expectedSum = 2258000;

    expect(totalPopulation).toBe(expectedSum);
  });
});