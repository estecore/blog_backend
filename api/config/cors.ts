import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
