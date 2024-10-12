import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Aircons from './../models/Aircons';
import sequelize from './utils/db';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // Secure this later with env variables

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust according to frontend origin
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Sync the database (create tables if they don't exist)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Electricity usage service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error syncing the database:", err);
  });

// Routes

// Get all usages (for admin or testing)
app.get('/', async (req: Request, res: Response) => {
  try {
    const usages = await Aircons.findAll();
    res.json(usages);
  } catch (err: any) {
    console.error("Error in query:", err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.get('/aircons', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token not provided or invalid' });
    return;
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }

  const user_id = (decodedToken as any).userId;

  try {
    const aircons = await Aircons.findAll({ where: { user_id } });
    if (!aircons) {
      res.status(404).json({ message: 'No aircons found' });
      return;
    }
    res.json(aircons);
  } catch (error: any) {
    console.error("Error fetching aircons:", error.message);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});