import mongoose from "mongoose";
import PostMessage from "../models/postsModel.js";

//fetch all
export const fetchPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//get single
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//create one
export const createPost = async (req, res) => {
  const { message, tags, seletedFile, image } = req.body;

  const newPost = new PostMessage({
    message,
    tags,
    seletedFile,
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

  const updatedPost = await PostMessage.findByIdAndUpdate(
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
    await PostMessage.findByIdAndDelete(id);
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

  const seletedPost = await PostMessage.findById(id);

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

  const updatedPost = await PostMessage.findByIdAndUpdate(
    { _id: id },
    seletedPost,
    { new: true }
  );
  res.json(updatedPost);
};

//comment post
export const commentPost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId)
    return res.json({ mssg: "Please sign in to comment the post" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const seletedPost = await PostMessage.findById(id);
  const commentBody = req.body;
  console.log("commentBody", commentBody);

  if (seletedPost.comments) {
    seletedPost.comments.commentBody.push(commentBody);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      { _id: id },
      seletedPost,
      { new: true }
    );

    res.status(200).json(updatedPost);
    return;
  } else {
    const commentBody = req.body;
    const postWithComments = { seletedPost, comments: commentBody };
    console.log("postWithComments", postWithComments);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      { _id: id },
      postWithComments,
      { new: true }
    );

    res.status(200).json(updatedPost);
    return;
  }
};
