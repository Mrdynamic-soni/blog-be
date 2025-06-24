import express from "express";
import { createPost, getPosts } from "../controllers/postsController";
import { authenticate } from "../middleware/auth";

const postRouter = express.Router();

postRouter.post("/post", authenticate, (req, res, next) => {
  Promise.resolve(createPost(req, res)).catch(next);
});
postRouter.get("/posts", (req, res, next) => {
  Promise.resolve(getPosts(req, res)).catch(next);
});

export default postRouter;
