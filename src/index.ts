import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import { corsMiddleware } from "./config/cors";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const PORT = process.env.PORT || 1234;
const MONGO_CONNECT = process.env.MONGO_CONNECT;

if (!MONGO_CONNECT) {
  throw new Error("MONGO_CONNECT is not defined");
}

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase(MONGO_CONNECT);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
