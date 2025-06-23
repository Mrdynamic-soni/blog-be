import express from 'express';
import { login, signup } from '../controllers/authController';

const router = express.Router();

router.post('/signup', (req, res, next) => {
  Promise.resolve(signup(req, res)).catch(next);
});
// If login is an async function, wrap it to handle errors
router.post('/login', (req, res, next) => {
  Promise.resolve(login(req, res)).catch(next);
});

export default router;
