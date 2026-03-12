import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadFileToCloudinary from "../service/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("email", email);
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are requred");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user with name all ready exist");
  }

  console.log("req.files:", req.files);
  const avtarLocalPath = req.files?.avatar?.[0]?.path;

  let backCoverLocalPath;
  if (
    req.files?.coverImage &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    backCoverLocalPath = req.files.coverImage[0].path;
  }

  if (!avtarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avtar = await uploadFileToCloudinary(avtarLocalPath);
  let coverImage;
  if (backCoverLocalPath) {
    coverImage = await uploadFileToCloudinary(backCoverLocalPath);
  }

  if (!avtar) {
    throw new ApiError(400, "avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  
  if (!createdUser) {
    throw new ApiError(500, "somthing want wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user register succesfully"));
});

export { registerUser };
