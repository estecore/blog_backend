import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { registerValidation } from "./validations/auth";

import { checkAuth } from "./utils/checkAuth";

import * as UserControllers from "./controllers/UserControllers";

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

app.use(express.json());

app.post("/auth/register", registerValidation, UserControllers.register);

app.post("/auth/login", UserControllers.login);

app.get("/auth/me", checkAuth, UserControllers.getMe);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
