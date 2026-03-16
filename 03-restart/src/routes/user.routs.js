import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { fileUploadMiddleware } from "../middlewares/multer.moddleware.js";
import { verifyJWT } from "../controllers/auth.controller.js";
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

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logoutUser);

export default router;
