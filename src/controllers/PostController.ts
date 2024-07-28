import { Request, Response } from "express";
import { PostModel } from "../models/Post";

export const getLastTags = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

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
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed to get post",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

//  ================= TODO change any type ====================
export const create = async (req: any, res: Response) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
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

//  ================= TODO change any type ====================
export const update = async (req: any, res: Response) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update post",
    });
  }
};
