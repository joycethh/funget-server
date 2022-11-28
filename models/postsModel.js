import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  message: String,
  image: Object,
  authorId: String,
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
});

postSchema.virtual("commentsAdded", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

// const postSchema = new mongoose.Schema({
//   message: {
//     type: String,
//     required: true,
//   },
//   image: Object,
//   authorId: String,
//   authorName: String,
//   authorAvatar: String,
//   likes: {
//     type: [String],
//     default: [],
//   },
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment",
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
// });

const Post = mongoose.model("Post", postSchema);

export default Post;
