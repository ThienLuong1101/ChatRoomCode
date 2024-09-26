// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { signup, login } = require('./controllers/auth'); // Import both signup and login functions
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});
const upload = multer({ storage });

// Signup Route
app.post('/auth/signup', upload.single('avatarFile'), signup); // Use the signup function here
app.post('/auth/login', login); // Use the login function here

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
