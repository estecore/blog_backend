import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth";
import { UserModel } from "./models/User";

import { checkAuth } from "./utils/checkAuth";

dotenv.config();

if (!process.env.MONGO_CONNECT) {
  throw new Error("MONGO_CONNECT is not defined");
}

const PORT = process.env.PORT || 1337;
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const MONGO_CONNECT = process.env.MONGO_CONNECT;

mongoose
  .connect(MONGO_CONNECT)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));

const app = express();

app.use(express.json());

app.post(
  "/auth/register",
  registerValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

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
  }
);

app.post("/auth/login", async (req: Request, res: Response) => {
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
});

//  ================= TODO change any type ====================
app.get("/auth/me", checkAuth, async (req: any, res: Response) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
