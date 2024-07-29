import { Router } from "express";
import { checkAuth } from "../utils";
import { upload } from "../config/multerConfig";

const router = Router();

router.post("/", checkAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.originalname}` });
});

export default router;
