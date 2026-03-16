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
      type: String, // URL of stored profile image (Cloudinary or other storage)
      required: true,
    },
    coverImage: {
      type: String, // URL of stored profile image (Cloudinary or other storage)
      required: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/*
------------------------------------------------
PASSWORD HASHING MIDDLEWARE
------------------------------------------------
*/
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

/*
------------------------------------------------
PASSWORD VALIDATION METHOD
------------------------------------------------
*/
userSchema.methods.isPasswordCorrect = async function compareUserPassword(
  plainTextPassword
) {
  return bcrypt.compare(plainTextPassword, this.password);
};

/*
------------------------------------------------
ACCESS TOKEN GENERATION
------------------------------------------------
*/
userSchema.methods.generateAccessToken = function createAccessToken() {
  const tokenPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };

  return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

/*
------------------------------------------------
REFRESH TOKEN GENERATION
------------------------------------------------
*/
userSchema.methods.generateRefreshToken = function createRefreshToken() {
  const tokenPayload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  };

  return jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
