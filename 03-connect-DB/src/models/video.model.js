import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    duration: {
      type: Number, // in seconds
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },

    tags: {
      type: [String],
      index: true,
    },

    category: {
      type: String,
      default: "general",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);
videoSchema.plugin(mongooseAggregatePaginate);
export const Videos = mongoose.model("Video", videoSchema);
