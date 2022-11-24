import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  message: String,
  tags: [String],
  image: Object,
  likes: {
    type: [String],
    default: [],
  },
  comments: Object,
  //author's info
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

// comments: {
//   commentBody: [String],
//   userId: String,
//   userName: String,
//   userAvatar: String,
// },

// comments: {
//   type: [String],
//   default: [],
// },
