import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { fileUploadMiddleware } from "../middlewares/multer.moddleware.js";
const router = Router();
router.route("/register").post(
  fileUploadMiddleware.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
