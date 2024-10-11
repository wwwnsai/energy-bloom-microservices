  import express, { Request, Response } from 'express'; // Import Request and Response
  import { Pool } from 'pg';
  import dotenv from 'dotenv';
  import cors from 'cors';
  import cookieParser from 'cookie-parser';
  import jwt from 'jsonwebtoken';
  import bodyParser from 'body-parser';

  import { getUserIdFromRequest, getLoggedInUser } from './users.actions'; 

  dotenv.config();

  const app = express();
  const PORT = 3008;
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
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

  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.PG_HOST, // Adjust based on environment
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
  });


  export default pool;

  // Test route to check database connection
  app.get('/', async (req: Request, res: Response) => {
    // res.send('User service is running');

    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err: any) {
      console.error("Error in query:", err.message);  // Log detailed error message
      res.status(500).json({ error: err.message || 'Server error' });
    }
  });

  // New POST route for sign-up
  app.post('/sign-up', async (req: Request, res: Response) => {
    console.log("Request body:", req.body);
    const { first_name, last_name, email, password, address1, city, postal_code, date_of_birth } = req.body;
    try {
      const query = `
        INSERT INTO users (first_name, last_name, email, password, address1, city, postal_code, date_of_birth)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      const values = [first_name, last_name, email, password, address1, city, postal_code, date_of_birth];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error in sign-up:", err);
      res.status(500).json({ error: 'Error registering user' });
    }
  });

  
app.post('/sign-in', async (req: Request, res: Response) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  try {
    // Query to find user by email and password
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user_info = result.rows[0];
      const token = jwt.sign({ userId: user_info.id }, JWT_SECRET, { expiresIn: '24h' });
      console.log("Token:", token);
      res.status(200).json({ user: user_info, token: token });
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
      // Extract the Authorization header
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token not provided or invalid' });
        return;
      }
  
      const token = authHeader.split(' ')[1];
  
      // Verify and decode the token
      const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Replace with your JWT secret
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, secretKey);
      } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
      }
  
      // Extract userId from decoded token (assuming userId is stored in the token payload)
      const userId = (decodedToken as any).userId; // Adjust according to your token structure
  
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
      }
  
      // Query the database using userId
      const query = 'SELECT * FROM users WHERE id = $1';
      const values = [userId];
      
      const result = await pool.query(query, values);
      
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]); // Return the full user object
      } else {
        res.status(200).json(null); // Return null if no user found
      }
  
    } catch (error: any) {
      console.error("Error in /get-login route:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });
  

  // Logout route
  app.post('/sign-out', async (req: Request, res: Response) => {
    res.clearCookie('userId', { path: '/' }); // Assuming you are using cookies for session management
    res.status(200).json({ message: 'Logged out' });
  });

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
  });


  app.listen(3000, () => {
    console.log(`User service running on port ${PORT}`);
  });
