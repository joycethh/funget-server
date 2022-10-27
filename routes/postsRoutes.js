import express from "express";
import {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controller/postController.js";
const router = express.Router();

//fetchPosts
router.get("/", fetchPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

router.patch("/:id/likePost", likePost);

export default router;
