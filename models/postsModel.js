import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  author: String,
  message: String,
  tags: [String],
  image: Object,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
