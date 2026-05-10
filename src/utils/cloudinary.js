import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadToCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (result) {
          resolve(result); 
        } else {
          reject(error); 
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export default cloudinary;