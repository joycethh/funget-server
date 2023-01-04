import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import Post from "./models/postsModel.js";
import Comment from "./models/commentsModel.js";

//express app setup
const app = express();

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

//middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

//db testing
app.post(`/test/posts/addPost`, async (req, res) => {
  const { message, image } = req.body;

  const newPost = new Post({
    message,
    image,
    createdAt: new Date().toISOString(),
    authorId: req.userId,
    authorName: req.author,
    authorAvatar: req.avatar,
  });
  try {
    await newPost.save();
    res.status(200).json(newPost);
    return;
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post(`/test/posts/addComment/:id`, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

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
    console.log("newComment", newComment);
    await newComment.save();

    seletedPost.comments.push(newComment);
    await seletedPost.save();

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
//for testing
app.get("/", (req, res) => {
  res.send("The FUNGET APP IS RUNNING");
});

//DB connection
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is runing on port ${PORT} and DB is connected`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
