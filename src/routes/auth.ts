import express from 'express';
import { getMe, login, signup } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', (req, res, next) => {
  Promise.resolve(signup(req, res)).catch(next);
});
// If login is an async function, wrap it to handle errors
authRouter.post('/login', (req, res, next) => {
  Promise.resolve(login(req, res)).catch(next);
});

authRouter.get('/me', (req, res, next) => {
  Promise.resolve(getMe(req, res)).catch(next);
});

export default authRouter;
