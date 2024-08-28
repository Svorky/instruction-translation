import { createUser, getUserByUsername, updateRefreshToken, getAllUsers as _getAllUsers, getUserById as _getUserById } from "../models/userModel.js";
import { compare } from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken
// require('dotenv').config();
import 'dotenv/config'
export async function registerUser(req, res) {
  const { username, password, email, first_name, last_name } = req.body;

  const user = { username, password, email, first_name, last_name };

  try {
    const userInfo = await createUser(user);
    res.status(201).json({
      message: "User registered successfullt",
      user: userInfo,
    });
  } catch(error) {
    console.log(error.code);
    if(error.code == 23505) {
      return res
        .status(200)
        .json({ message: "Email or Username already exist" });
    }
    res.status(500).json({ message: "internal server error" });
  }
}
export async function loginUser(req, res) {
  const { email, username, password } = req.body;

  try {
    const user = await getUserByUsername(email, username);

    if(!user) {
      return res.status(404).json({ message: "User not found, ...." });
    }

    const passwordMatch = await compare(password + "", user.password);

    if(!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed..." });
    }

    /** create the token */
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
    const accessToken = sign(
      { userid: user.id, email: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );

    /** refresh the token */
    const refreshToken = sign(
      { userid: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '3d' }
    );

    /** set token in httpOnly */
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false, // default is false, localhost require false
      maxAge: 60 * 1000
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: false, // default is false, localhost require false
      maxAge: 60 * 60 * 1000 * 24 * 3
    });

    await updateRefreshToken(refreshToken, user.id);

    res.json({
      message: "Login succesfully",
      user: { userid: user.id, email: user.email },
      token: accessToken,
      refresh: refreshToken
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
}
