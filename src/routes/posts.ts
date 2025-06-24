import express from 'express';
import { createPost, getPosts } from '../controllers/postsController.js';
import { authenticate } from '../middleware/auth.js';


const postRouter = express.Router();

postRouter.post('/post', authenticate, (req, res, next) => {
  Promise.resolve(createPost(req, res)).catch(next);
});
postRouter.get('/posts', (req, res, next) => {
  Promise.resolve(getPosts(req, res)).catch(next);
});

export default postRouter;
