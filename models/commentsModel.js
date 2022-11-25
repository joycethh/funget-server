import mongoose, { isObjectIdOrHexString } from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: "true",
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: String,
  userAvatar: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
