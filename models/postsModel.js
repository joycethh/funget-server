import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  author: String,
  message: String,
  tags: [String],
  image: Object,
  likes: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
