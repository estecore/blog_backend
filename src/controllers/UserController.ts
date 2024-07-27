import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/User";

import { handleValidationErrors } from "../utils/handleValidationErrors";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user.toObject();

    res.json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Error login",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Error login",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user.toObject();

    res.json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

//  ================= TODO change any type ====================
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = user.toObject();

    res.json({ userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};
