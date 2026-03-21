import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatarDetails,
  updateCoverImageDetails,
  getUserChannelProfile,
  getWatchHistory,
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

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, fileUploadMiddleware.single("avatar"), updateAvatarDetails);
router
  .route("/cover-image")
  .patch(
    verifyJWT,
    fileUploadMiddleware.single("coverImage"),
    updateCoverImageDetails
  );
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
