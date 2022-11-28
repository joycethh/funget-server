import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import Post from "./models/postsModel.js";
import Comment from "./models/commentsModel.js";
import { commentPost } from "./controller/postController.js";

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

//for testing
app.get("/", (req, res) => {
  res.send("The FUNGET APP IS RUNNING");
});

//db relations test
app.post("/testposts/addPost", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post("/testposts/addComment/:id", async (req, res) => {
  try {
    const { content } = req.body;
    console.log("content", content);

    const { id } = req.params; //6383dafd4f5a402c7f139433
    const seletedPost = await Post.findById(id);
    console.log("seletedPost", seletedPost);

    const newComment = new Comment({
      content: content,
      postId: seletedPost._id, //assign post id from the seleted post to the comment.postId key.
    });
    console.log("newComment", newComment);

    await newComment.save();

    seletedPost.comments.push(newComment);
    console.log("selectedPost", seletedPost);

    await seletedPost.save();

    res.status(200).json({ success: true, data: seletedPost });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
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
