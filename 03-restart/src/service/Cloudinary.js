import { v2 as cloudinaryClient } from "cloudinary";
import fs from "fs";

/*
----------------------------------------
CLOUDINARY CONFIGURATION
----------------------------------------
*/
cloudinaryClient.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*
----------------------------------------
UPLOAD FILE TO CLOUDINARY
----------------------------------------
*/
const uploadFileToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const uploadResponse = await cloudinaryClient.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      }
    );

    console.log(
      "File uploaded successfully to Cloudinary:",
      uploadResponse.url
    );

    return uploadResponse;
  } catch (uploadError) {
    console.error("Cloudinary upload failed:", uploadError);
    return null;
  } finally {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // delete temporary file
    }
  }
};

export default uploadFileToCloudinary;
