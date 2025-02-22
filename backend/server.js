import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const SECRET_KEY = process.env.JWT_KEY;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.endsWith('.vercel.app') || origin === 'http://localhost:3000') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'gif', 'webp', 'svg'],
    },
});

const upload = multer({ storage: storage });

// PostgreSQL connection
const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database!');
});


// // Wstawianie użytkownika (przykład):
// const createAdminUser = async () => {
//     const username = 'admin';
//     const password = await hashPassword('twoje_super_tajne_haslo');
//
//     db.query('INSERT INTO admin (username, password) VALUES (?, ?)', [username, password], (err) => {
//         if (err) {
//             console.error('Error creating admin user:', err);
//         } else {
//             console.log('Admin user created successfully');
//         }
//     });
// };
//
// // Wywołaj funkcję jednorazowo, aby dodać admina:
// createAdminUser();

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    db.query('SELECT * FROM admin WHERE username = $1', [username], async (err, results) => {
        if (err) return res.status(500).json({error: 'Database error'});

        if (results.length === 0) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const user = results.rows[0];

        // Weryfikacja hasła
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        // Generowanie tokena
        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});

        res.json({token});
    });
});




// Helper function to hash passwords
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

// Endpoint to create a new project
app.post('/projects', upload.array('images'), (req, res) => {
    let translations;
    try {
        translations = JSON.parse(req.body.translations);
    } catch (error) {
        return res.status(400).send('Invalid translations JSON');
    }

    const images = req.files;
    if (!translations || !images) {
        return res.status(400).send('Translations and images are required');
    }

    // Get Cloudinary URLs for the uploaded images
    const imagesPath = images.map((file) => file.path);

    // Save data to the database
    const query = `
        INSERT INTO projects (translations, images)
        VALUES ($1, $2)
    `;

    db.query(query, [JSON.stringify(translations), JSON.stringify(imagesPath)], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving project');
        } else {
            res.status(200).json({ message: 'Project saved successfully' });
        }
    });
});

// Endpoint to get all projects
app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results.rows);
        }
    });
});

// Endpoint to get a specific project by ID
app.get('/projects/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM projects WHERE id = $1', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.rows.length === 0) {
            res.status(404).json({ message: 'Project not found' });
        } else {
            res.json(results.rows[0]);
        }
    });
});

// Endpoint to delete a project
app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM projects WHERE id = $1', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.rows.length === 0) return res.status(404).json({ message: 'Project not found' });

        const images = results.rows[0].images;

        // Delete images from Cloudinary
        images.forEach((url) => {
            const publicId = url.split('/').pop().split('.')[0]; // Extract public ID from URL
            cloudinary.v2.uploader.destroy(`uploads/${publicId}`, (err) => {
                if (err) console.error(`Error deleting image from Cloudinary: ${err}`);
            });
        });

        // Delete project from the database
        db.query('DELETE FROM projects WHERE id = $1', [id], (err) => {
            if (err) return res.status(500).send('Error deleting project');
            res.status(200).send('Project deleted successfully');
        });
    });
});

// Endpoint to update a project
app.put('/projects/:id', upload.array('images'), (req, res) => {
    const { id } = req.params;
    const { translations, existingImages } = req.body;

    if (!translations) {
        return res.status(400).send('Missing translations data');
    }

    let parsedTranslations;
    try {
        parsedTranslations = JSON.parse(translations);
    } catch (error) {
        return res.status(400).send('Invalid translations format');
    }

    // Validate translations
    for (const lang in parsedTranslations) {
        const { title, short_desc, long_desc } = parsedTranslations[lang];

        if (!title || title.length > 50) {
            return res.status(400).send(`Title exceeds maximum length in ${lang}`);
        }
        if (!short_desc || short_desc.length > 100) {
            return res.status(400).send(`Short description exceeds maximum length in ${lang}`);
        }
        if (!long_desc || long_desc.length > 1000) {
            return res.status(400).send(`Long description exceeds maximum length in ${lang}`);
        }
    }

    const newImagePaths = req.files.map((file) => file.path);
    const existingImagesArray = existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : [];

    // Combine existing and new images
    const updatedImages = [...new Set([...existingImagesArray, ...newImagePaths])];

    if (updatedImages.length < 2) {
        return res.status(400).send('Please upload at least 2 images.');
    }

    db.query('SELECT images FROM projects WHERE id = $1', [id], (err, results) => {
        if (err) return res.status(500).send('Database error');

        if (results.rows.length === 0) {
            return res.status(404).send('Project not found');
        }

        const oldImages = results.rows[0].images;
        const imagesToDelete = oldImages.filter((img) => !updatedImages.includes(img));

        // Delete old images from Cloudinary
        imagesToDelete.forEach((url) => {
            const publicId = url.split('/').pop().split('.')[0]; // Extract public ID from URL
            cloudinary.v2.uploader.destroy(`uploads/${publicId}`, (err) => {
                if (err) console.error(`Error deleting image from Cloudinary: ${err}`);
            });
        });

        // Update the project in the database
        db.query(
            'UPDATE projects SET translations = $1, images = $2 WHERE id = $3',
            [JSON.stringify(parsedTranslations), JSON.stringify(updatedImages), id],
            (err) => {
                if (err) return res.status(500).send('Error updating project');
                res.status(200).json({ id, translations: parsedTranslations, images: updatedImages });
            }
        );
    });
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});

// Endpoint to send an email
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            port: 465,
        });

        await transporter.sendMail({
            from: `${email}`,
            to: '3axes.agh@gmail.com',
            subject: `Wiadomość od ${name} - ${email}`,
            text: `${message}`,
        });

        res.status(200).json({ message: 'E-mail wysłany pomyślnie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Błąd podczas wysyłania e-maila' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});