import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudinary ya kisi bucket ka URL
            required: true
        },
        thumbnail: {
            type: String, // Thumbnail image ka URL
            required: true
        },
        title: {
            type: String, 
            required: true,
            trim: true
        },
        description: {
            type: String, 
            required: true,
            trim: true
        },
        duration: {
            type: Number, // Video ki length (seconds mein)
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User" // Yeh User model se link hai
        }
    },
    { 
        timestamps: true 
    }
);

// Pagination plugin (Advanced queries ke liye)
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);