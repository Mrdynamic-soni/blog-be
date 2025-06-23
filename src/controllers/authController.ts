import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';
import { generateToken } from '../utils/jwt';

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
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};
