import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  message: String,
  tags: [String],
  image: Object,
  likes: {
    type: Number,
    default: 0,
  },
  userId: String,
  userName: String,
  userAvatar: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
