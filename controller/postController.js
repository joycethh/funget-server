import mongoose from "mongoose";

import PostMessage from "../models/postsModel";

//fetch all
export const fetchPosts = async (req, res) => {
  try {
    const posts = await postMessage.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//get single
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//create one
export const createPost = async (req, res) => {
  const { author, message, tags, seletedFile } = req.body;
  const newPost = new postMessage({ author, message, tags, seletedFile });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//update one
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { message, tags, seletedFile } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = { message, tags, seletedFile, _id: id };
  await postMessage.findByIdAndUpdate(id, updatePost, { new: true });
  res.json(updatePost);
};

//delete one
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const seletedPost = await postMessage.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};
