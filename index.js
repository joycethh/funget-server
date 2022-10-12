import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//express app setup
const app = express();

//middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

//for testing
app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
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
