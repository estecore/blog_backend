import { Router } from "express";
import { checkAuth } from "../utils";
import { upload } from "../config/multerConfig";

const router = Router();

router.post("/", checkAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/tmp/uploads/${
    req.file.filename
  }`;
  res.json({ url: fileUrl });
});

export default router;
