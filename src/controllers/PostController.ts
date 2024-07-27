import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};
