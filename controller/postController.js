import mongoose from "mongoose";
import PostMessage from "../models/postsModel.js";

//fetch all
export const fetchPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();

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
  const { author, message, tags, seletedFile, image } = req.body;
  // Your problem was that PostMessage expected an array of data_url strings, but you gave it an array of objects and
  // const image = [req.body.image[0].data_url];
  const newPost = new PostMessage({
    author,
    message,
    tags,
    seletedFile,
    image,
  });
  console.log("newPost", newPost);
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
  await PostMessage.findByIdAndUpdate(id, updatePost, { new: true });
  res.json(updatedPost);
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
