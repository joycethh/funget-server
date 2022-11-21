import express from "express";
import {
  fetchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controller/postController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

//fetchPosts
router.get("/", fetchPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/edit/:id", auth, updatePost);

router.delete("/edit/:id", auth, deletePost);

router.patch("/likes/:id", auth, likePost);

export default router;
