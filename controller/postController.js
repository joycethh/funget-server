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
  const { author, message, tags, seletedFile, image } = req.body;

  const newPost = new PostMessage({
    author,
    message,
    tags,
    seletedFile,
    image,
  });
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

// like post
export const likePost = async (req, res) => {
  const { id } = req.params;
  console.log("like-id", id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const seletedPost = PostMessage.findById(id);
    const updatedLikePost = await PostMessage.findByIdAndUpdate(
      id,
      { likes: seletedPost.likes + 1 },
      { new: true }
    );

    console.log("updatedLikePost", updatedLikePost);
    res.jason(updatedLikePost);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

// export const likePost = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   const seletedPost = await PostMessage.findById(id);
//   const updatedPost = await PostMessage.findByIdAndUpdate(
//     id,
//     { likes: seletedPost.likes + 1 },
//     { new: true }
//   );
//   res.json(updatedPost);
// };

//delete one
export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("delete id", id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};
