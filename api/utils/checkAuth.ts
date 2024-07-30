import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { CustomRequest } from "../types";

dotenv.config();

interface DecodedToken extends JwtPayload {
  _id: string;
}

export const checkAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    return res.status(403).json({
      message: "No token",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    ) as DecodedToken;

    req.userId = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};
