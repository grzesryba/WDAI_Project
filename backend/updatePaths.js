import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure PostgreSQL connection
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Function to replace local paths with Cloudinary URLs
const updatePathsToCloudinary = async () => {
    try {
        // Query the database for all projects
        const query = 'SELECT id, images FROM projects';
        const result = await db.query(query);

        for (const row of result.rows) {
            const { id, images } = row;
            const updatedImages = [];

            // Replace each local path with the corresponding Cloudinary URL
            for (const imagePath of images) {
                const fileName = imagePath.split('/').pop(); // Extract filename
                const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/uploads/${fileName}`;
                updatedImages.push(cloudinaryUrl);
            }

            // Update the database with the new URLs
            const updateQuery = 'UPDATE projects SET images = $1 WHERE id = $2';
            await db.query(updateQuery, [JSON.stringify(updatedImages), id]);
            console.log(`Updated project ${id} with new URLs:`, updatedImages);
        }

        console.log('All paths updated successfully!');
    } catch (error) {
        console.error('Error updating paths:', error);
    } finally {
        await db.end(); // Close the database connection
    }
};

// Run the script
updatePathsToCloudinary();