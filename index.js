import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(PORT, () => {
  console.log(`App is runing on port ${PORT}`);
});
