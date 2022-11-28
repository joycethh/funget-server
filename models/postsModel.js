import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  image: Object,
  // authorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  authorName: String,
  authorAvatar: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
