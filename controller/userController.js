import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//register
export const signUp = async (req, res) => {
  const { username, email, password, confirmedPassword } = req.body;
  //1. user already exist?
  //2. new user, compare password and confirmedPassword
  //3. password match: -- create and save new user, --sign in user and assign token
  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(404).json({ mssg: "User already exists" });
    if (password !== confirmedPassword)
      return res
        .status(404)
        .json({ mssg: "The paassword confirmation doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET
      // { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(404).json({ mssg: error.message });
  }
};

//log in
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
      process.env.SECRET
      // { expiresIn: "1h" }
    );
    res.status(200).json({ result: existUser, token });
  } catch (error) {
    res.status(500).json({ mssg: "Something went wrong" });
  }
};
