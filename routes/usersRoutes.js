import express from "express";
import { signUp, signIn } from "../controller/userController.js";
const router = express.Router();

//register
router.post("/register", signUp);

//log in
router.post("/login", signIn);

export default router;
