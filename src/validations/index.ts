import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Full name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("avatarUrl", "Invalid URL").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body("title", "Enter title").isLength({ min: 3 }).isString(),
  body("text", "Enter text").isLength({ min: 3 }).isString(),
  body("tags", "Invalid tags").optional().isString(),
  body("imageUrl", "Invalid URL").optional().isString(),
];
