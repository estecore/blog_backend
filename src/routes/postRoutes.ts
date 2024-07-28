import { Router } from "express";
import { checkAuth, handleValidationErrors } from "../utils";
import { postCreateValidation } from "../validations";
import { PostController } from "../controllers";

const router = Router();

router.get("/tags", PostController.getLastTags);

router.get("/", PostController.getAll);
router.get("/tags", PostController.getLastTags);
router.get("/:id", PostController.getOne);

router.post(
  "/",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

router.delete("/:id", checkAuth, PostController.remove);

router.patch(
  "/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

export default router;
