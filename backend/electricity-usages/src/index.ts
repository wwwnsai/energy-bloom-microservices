import express, { Request, Response } from 'express'; // Import Request and Response
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Usages from './../models/usages';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 3003;

const JWT_SECRET = 'secret';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

// Middleware to handle JSON bodies
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const usages = await Usages.findAll();    
    res.json(usages);
  } catch (err: any) {
    console.error("Error in query:", err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Billing service running on port ${PORT}`);
});
