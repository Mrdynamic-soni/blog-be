import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';
import jwt from 'jsonwebtoken';

// Email and Password Validators
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password: string): boolean => {
  // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    res.status(201).json({
      message: 'User created successfully.',
      userId: result.rows[0].id,
    });
  } catch (err: any) {
    if (err.code === '23505') {
      // PostgreSQL unique_violation error
      return res.status(409).json({ message: 'User already exists.' });
    }
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email, // ✅ Include email here
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '30d',
      }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      })
      .json({ message: 'Login successful' });

  } catch (err: any) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


export const getMe = (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


export const logout = (req: Request, res: Response) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ message: 'Logged out successfully' });
};

