import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Directory to upload
const uploadsDir = path.join(process.cwd(), 'uploads');

// Function to upload a file to Cloudinary
const uploadFileToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'uploads', // Optional: Organize files in a folder on Cloudinary
        });
        console.log(`Uploaded: ${filePath} => ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error);
        return null;
    }
};

// Function to upload all files in a directory
const uploadDirectoryToCloudinary = async (directory) => {
    try {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                await uploadFileToCloudinary(filePath);
            }
        }

        console.log('All files uploaded successfully!');
    } catch (error) {
        console.error('Error uploading directory:', error);
    }
};

// Run the script
uploadDirectoryToCloudinary(uploadsDir);