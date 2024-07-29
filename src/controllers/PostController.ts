import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { formatDate } from "../utils";
import { SortBy, SortOrder } from "../types";

interface CreateUpdatePostBody {
  title: string;
  text: string;
  imageUrl?: string;
  tags: string;
}

interface CustomRequest extends Request {
  userId?: string;
}

export const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .exec();

    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const {
      sortBy = "createdAt",
      order = "desc",
    }: { sortBy?: SortBy; order?: "asc" | "desc" } = req.query;

    const sortOrder: SortOrder = order === "desc" ? -1 : 1;

    const sortCriteria: { [key in SortBy]?: SortOrder } = {
      [sortBy]: sortOrder,
    };

    if (sortBy !== "viewsCount") sortCriteria["viewsCount"] = sortOrder;
    if (sortBy !== "createdAt") sortCriteria["createdAt"] = sortOrder;

    const posts = await PostModel.find()
      .sort(sortCriteria)
      .populate({
        path: "user",
        select: "avatarUrl fullName additionalText",
      })
      .exec();

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    )
      .populate({
        path: "user",
        select: "avatarUrl fullName additionalText",
      })
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const formattedPost = {
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
    };

    res.json(formattedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to get post",
    });
  }
};

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { title, text, imageUrl, tags }: CreateUpdatePostBody = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const doc = new PostModel({
      title,
      text,
      imageUrl,
      tags: tags.split(","),
      user: userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to delete post",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const update = async (req: CustomRequest, res: Response) => {
  try {
    const postId = req.params.id;
    const { title, text, imageUrl, tags }: CreateUpdatePostBody = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await PostModel.updateOne(
      { _id: postId },
      {
        title,
        text,
        imageUrl,
        tags: tags.split(","),
        user: userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update post",
    });
  }
};
