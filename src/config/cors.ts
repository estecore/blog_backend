import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
