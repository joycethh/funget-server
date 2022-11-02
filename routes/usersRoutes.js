import express from "express";
import { signUp, signIn } from "../controller/userController.js";
const router = express.Router();

//sign up user
router.post("/register", signUp);

//sign in user
router.post("/login", signIn);

export default router;
