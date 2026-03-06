import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // Cloudinary ya kisi image storage ka URL
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "video" }],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // Isse 'createdAt' aur 'updatedAt' apne aap ban jayenge
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
