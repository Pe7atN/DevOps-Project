import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import 'dotenv/config';

const app = express();
app.use(cors());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432'),
};

const pool = new Pool(dbConfig);

app.get('/api/cities', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, population FROM cities');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Database connection error' });
  }
});
