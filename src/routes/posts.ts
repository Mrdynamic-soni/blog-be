import express from 'express';
import { createPost, getPosts } from '../controllers/postsController';
import { authenticate } from '../middleware/auth';


const router = express.Router();

router.post('/post', authenticate, (req, res, next) => {
  Promise.resolve(createPost(req, res)).catch(next);
});
router.get('/posts', getPosts);

export default router;
