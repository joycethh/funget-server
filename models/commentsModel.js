import mongoose, { isObjectIdOrHexString } from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: "true",
    },
    authorId: String,
    authorName: String,
    authorAvatar: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
