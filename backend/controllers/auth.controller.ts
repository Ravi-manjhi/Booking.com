import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../model/user.model";

// register user
export const authRegister = async (req: Request, res: Response) => {
  try {
    let isUserExist = await UserModel.findOne({ email: req.body.email });

    if (isUserExist)
      return res
        .status(400)
        .json({ status: "failed", message: "User already exists" });

    const newUser = new UserModel(req.body);
    const user = await newUser.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRETE_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRO",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ status: "ok", message: "Created" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

// sign-in user
export const authLogin = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "No User with this Email! Try Click Register",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Credentials not match",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRETE_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRO",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ status: "ok", userId: user._id });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const validateTokenCtrl = (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
};

export const signOutCtrl = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    maxAge: 0,
  });

  return res.status(200).json({ status: "ok", message: "Logout Success" });
};
