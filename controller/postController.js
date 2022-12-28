import mongoose from "mongoose";
import Post from "../models/postsModel.js";
import Comment from "../models/commentsModel.js";

//fetch all
export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({ postData: posts });
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//get single
export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const post = await Post.findById(id);

    const comments = await Comment.findOne({ postId: id });
    console.log("comments", comments);
    res.status(200).json({ postData: post });
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//create one
export const createPost = async (req, res) => {
  if (!req.userId)
    return res.json({ mssg: "Please sign in to share a new post" });
  const { message, image } = req.body;

  const newPost = new Post({
    message,
    image,
    // createdAt: new Date().toISOString(),
    authorId: req.userId,
    authorName: req.author,
    authorAvatar: req.avatar,
  });

  try {
    await newPost.save();
    res.status(200).json({ postData: newPost });
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

  res.status(200).json({ postData: updatedPost });
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
  res.json({ postData: updatedPost });
};

//add comment
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const content = req.body.comments;

  // const content = JSON.stringify(req.body);

  if (!req.userId)
    return res.json({ mssg: "Please sign in to comment the post" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const seletedPost = await Post.findById(id);

    const newComment = new Comment({
      content: content,
      authorId: req.userId,
      authorName: req.author,
      authorAvatar: req.avatar,
      postId: id, //assign post id from the seleted post to the comment.postId key.
    });
    // console.log("newComment", newComment);
    await newComment.save();

    seletedPost.comments.push(newComment);
    // console.log("seletedPost", seletedPost);
    await seletedPost.save();

    res.status(200).json({ commentData: newComment, postData: seletedPost });
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

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
