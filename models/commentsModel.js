import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    authorId: String,
    authorName: String,
    authorAvatar: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: "true",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
