import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer'
import fs from "fs"
import nodemailer from "nodemailer"

const app = express();
const PORT = 5000;

const SECRET_KEY = 'your-secret-key'; // Zmień na lepszy klucz i trzymaj go w zmiennych środowiskowych

app.use(cors());
app.use(express.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder, w którym będą zapisywane zdjęcia
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Dodanie unikalnej nazwy
    },
});

const upload = multer({ storage });

app.post('/projects', upload.array("images"), (req, res) => {

    if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }
    let translations;
    try {
        translations = JSON.parse(req.body.translations);
    } catch (error) {
        return res.status(400).send('Invalid translations JSON');
    }
    const images = req.files;
    // Upewnij się, że translations i images są w odpowiednim formacie (np. JSON)
    if (!translations || !images) {
        return res.status(400).send('Translations and images are required');
    }
    const imagesPath = images.map((i) => '/uploads/' + i.filename);

    // Zapis danych do bazy
    const query = `
        INSERT INTO projects (translations, images)
        VALUES (?, ?)
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

app.use('/uploads', express.static('uploads')); // Udostępnienie folderu uploads

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

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






// Połączenie z bazą danych
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'avXwYdiEYN7V1ri',
    database: '3axes_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database!');
});


// Middleware do uwierzytelniania za pomocą tokena
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user; // Zapisujemy użytkownika w obiekcie req
        next();
    });
};



// Endpoint do pobierania projektów
app.get('/projects', (req, res) => {
    db.query('SELECT * FROM projects', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.get('/projects/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM projects WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Project not found' });
        } else {
            res.json(results[0]); // Zwracamy pierwszy wynik
        }
    });
});

// Usuwanie projektu
app.delete("/projects/:id", (req, res) => {
    const { id } = req.params;

    // Pobierz zdjęcia projektu
    db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: "Project not found" });
        const images = results[0].images

        // Usuń zdjęcia z systemu plików
        images.forEach((path) => fs.unlink("." + path, (err) => console.error(err)));

        // Usuń projekt z bazy
        db.query("DELETE FROM projects WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).send("Error deleting project");
            res.status(200).send("Project deleted successfully");
        });
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM admin WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Weryfikacja hasła
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generowanie tokena
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    });
});


// Edycja projektu
app.put("/projects/:id", upload.array("images"), (req, res) => {
    const { id } = req.params;
    const { translations, existingImages } = req.body;

    if (!translations) {
        return res.status(400).send("Missing translations data");
    }

    let parsedTranslations;
    try {
        parsedTranslations = JSON.parse(translations);
    } catch (error) {
        return res.status(400).send("Invalid translations format");
    }

    // Sprawdzenie długości pól dla każdego języka
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

    const newImagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const existingImagesArray = existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : [];

    // Zapobieganie duplikatom
    const updatedImages = [...new Set([...existingImagesArray, ...newImagePaths])];

    if (updatedImages.length < 2) {
        return res.status(400).send("Please upload at least 2 images.");
    }

    db.query("SELECT images FROM projects WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).send("Database error");

        if (results.length === 0) {
            return res.status(404).send("Project not found");
        }

        console.log(results[0].images)
        const oldImages = results[0].images;
        const imagesToDelete = oldImages.filter(img => !updatedImages.includes(img));

        imagesToDelete.forEach(img => {
            const filePath = `.${img}`;
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error deleting file ${filePath}:`, err);
            });
        });

        db.query(
            "UPDATE projects SET translations = ?, images = ? WHERE id = ?",
            [JSON.stringify(parsedTranslations), JSON.stringify(updatedImages), id],
            (err) => {
                if (err) return res.status(500).send("Error updating project");
                res.status(200).json({ id, translations: parsedTranslations, images: updatedImages });
            }
        );
    });
});
;

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.user });
});



app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // lub inny serwer SMTP
            auth: {
                user: '3axes.customer@gmail.com',
                pass: 'xvzi oulu xuyu csaq',
            },
            port: 465,
        });

        console.log(email)
        console.log(name)
        console.log(message)
        await transporter.sendMail({
            from: `${email}`,
            to: 'grrybinski@gmail.com',
            subject: `Wiadomość od ${name} - ${email}`,
            text: `${message}`,
        });

        res.status(200).json({ message: 'E-mail wysłany pomyślnie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Błąd podczas wysyłania e-maila' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

