import express from "express";
import { signUp, signIn } from "../controller/userController.js";
const router = express.Router();

//sign up user
router.post("/signup", signUp);

//sign in user
router.post("/signin", signIn);

export default router;
