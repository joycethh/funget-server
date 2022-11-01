import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//sign up
export const signUp = async (req, res) => {
  const { username, email, password, confirmedPassword } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  //1. user exist?
  //2. password correct?
  //3. password correct, sign in user & assign a web token
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) return res.status(404).json({ mssg: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ mssg: "Invalid password" });

    const token = jwt.sign(
      { email: existUser.email, id: existUser._id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ data: existUser, token });
  } catch (error) {
    res.status(500).json({ mssg: "Something went wrong" });
  }
};
