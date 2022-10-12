import express from "express";

const router = express.Router();

router.get("/", fetchPosts);

router.get("/:id", getPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
