import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import pool from '../db';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content ,userId} = req.body;

  // Ensure all required fields are present
  if (!title || !content || !userId) {
    return res.status(400).json({ message: 'Title, content, and user ID are required.' });
  }

  try {
    // Verify if user exists
    const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid user. Please log in again.' });
    }

    // Create the post
    await pool.query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)',
      [title, content, userId]
    );

    res.status(201).json({ message: 'Post created successfully.' });
  } catch (err: any) {
    res.status(500).json({ message: 'Error creating post.', error: err.message });
  }
};


export const getPosts = async (req: Request, res: Response) => {
  const { author } = req.query;
  try {
    let result;
    if (author) {
      result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC', [author]);
    } else {
      result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    }
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
};


