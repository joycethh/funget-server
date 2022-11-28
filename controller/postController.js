import mongoose from "mongoose";
import Post from "../models/postsModel.js";

//fetch all
export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//get single
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//create one
export const createPost = async (req, res) => {
  const { message, image } = req.body;

  const newPost = new Post({
    message,
    image,
    createdAt: new Date().toISOString(),
    userId: req.userId,
    userName: req.author,
    userAvatar: req.avatar,
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
    return;
  } catch (error) {
    res.status(404).json({ mssg: error.message });
    return;
  }
};

//update one
export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json(updatedPost);
};

//delete one
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

// like post
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ mssg: "Please sign in to like the post" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const seletedPost = await Post.findById(id);

  const index = seletedPost.likes.findIndex(
    (userId) => userId === String(req.userId)
  );
  if (index === -1) {
    seletedPost.likes.push(req.userId);
  } else {
    seletedPost.likes = seletedPost.likes.filter(
      (userId) => userId !== String(req.userId)
    );
  }

  const updatedPost = await Post.findByIdAndUpdate({ _id: id }, seletedPost, {
    new: true,
  });
  res.json(updatedPost);
};

//add comment
export const commentPost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId)
    return res.json({ mssg: "Please sign in to comment the post" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const seletedPost = await Post.findById(id);

    const newComment = new Comment({
      content: content,
      postId: seletedPost._id, //assign post id from the seleted post to the comment.postId key.
    });

    await newComment.save();

    seletedPost.comments.push(newComment);
    await seletedPost.save();
    res.status(200).json(seletedPost);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//get comments
export const getComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const data = await Post.findById(id).populate({
      path: "commentsAdded",
      select: "content",
    });
    console.log("data", data);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
