import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: 'usages',
  host: 'usages-db',
  database: 'usages_db',
  password: 'password',
  port: 5432,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
