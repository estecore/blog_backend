import { Request as ExRequest, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken extends JwtPayload {
  _id: string;
}

//  ================= TODO change any type ====================
export const checkAuth = (req: any, res: Response, next: NextFunction) => {
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
