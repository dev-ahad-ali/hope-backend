import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // file upload successfully response
    // console.log('File uploaded successfully', response.url);
    console.log('cloudinary response', response);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file as the file upload operation failed.
    return null;
  }
};

export { uploadOnCloudinary };
