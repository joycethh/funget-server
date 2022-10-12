import express from "express";

const router = express.Router();

//fetchPosts
router.get("/", (req, res) => {
  res.json({ mssg: "fetch all" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "get a single post" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "create new one" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "update one" });
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete one" });
});

export default router;
