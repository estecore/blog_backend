import mongoose from "mongoose";

export const connectToDatabase = async (mongoURI: string) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    throw err;
  }
};
