import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import User from './../models/User'; // Import the User model

dotenv.config();

const app = express();
const PORT = 3007;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

// Middleware to handle JSON bodies
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3007',
  credentials: true,
}));
app.use(cookieParser());

// Test route to check database connection
app.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err: any) {
    console.error("Error in query:", err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// New POST route for sign-up
app.post('/sign-up', async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, address1, city, postal_code, date_of_birth } = req.body;
  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      address1,
      city,
      postal_code,
      date_of_birth,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error("Error in sign-up:", err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/sign-in', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error("Error in sign-in:", err);
    res.status(500).json({ error: 'Error signing in' });
  }
});

app.get('/get-login', async (req: Request, res: Response): Promise<void> => {
  try {
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
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    const userId = (decodedToken as any).userId;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const user = await User.findByPk(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (error: any) {
    console.error("Error in /get-login route:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Logout route
app.post('/sign-out', async (req: Request, res: Response) => {
  res.clearCookie('userId', { path: '/' });
  res.status(200).json({ message: 'Logged out' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
