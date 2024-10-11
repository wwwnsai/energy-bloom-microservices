import express from 'express';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'energy_bloom',
  password: 'password',
  port: 5432,
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(result.rows);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Billing service running on port ${PORT}`);
});
