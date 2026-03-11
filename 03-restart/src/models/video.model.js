import mongoose, { Schema } from "mongoose";
import aggregatePaginationPlugin from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFileUrl: {
      type: String, // URL of the uploaded video (Cloudinary / S3 / storage bucket)
      required: true,
      trim: true,
    },

    thumbnailUrl: {
      type: String, // URL of the video thumbnail
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    durationInSeconds: {
      type: Number, // total video length in seconds
      required: true,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
-----------------------------------------
AGGREGATE PAGINATION PLUGIN
-----------------------------------------
Used for advanced pagination with
aggregation pipelines.
*/
videoSchema.plugin(aggregatePaginationPlugin);

export const Video = mongoose.model("Video", videoSchema);
