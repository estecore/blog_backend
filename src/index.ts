import express, { Request, Response } from "express";
import multer, { StorageEngine } from "multer";
import mongoose, { Callback } from "mongoose";
import dotenv from "dotenv";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations";

import { checkAuth } from "./utils/checkAuth";

import * as UserController from "./controllers/UserController";
import * as PostController from "./controllers/PostController";

dotenv.config();

if (!process.env.MONGO_CONNECT) {
  throw new Error("MONGO_CONNECT is not defined");
}

const PORT = process.env.PORT || 1337;
const MONGO_CONNECT = process.env.MONGO_CONNECT;

mongoose
  .connect(MONGO_CONNECT)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));

const app = express();

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Callback) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Callback) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/upload",
  checkAuth,
  upload.single("image"),
  (req: Request, res: Response) => {
    res.json({
      url: `/uploads/${req?.file?.originalname}`,
    });
  }
);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, PostController.update);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
