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
