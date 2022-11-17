import express from "express";
import { register, login } from "../controller/userController.js";
const router = express.Router();

//register
router.post("/register", register);

//log in
router.post("/login", login);

export default router;
