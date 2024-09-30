import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { signup, login } from './controllers/auth.js'; // Import signup and login functions
import dotenv from 'dotenv'; // Load environment variables from .env file
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the Google Generative AI library

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Routes
app.post('/auth/signup', signup); // Signup route
app.post('/auth/login', login); // Login route

// AI Chat Route
app.post('/ai-chat', async (req, res) => {
  const { message } = req.body; // Get the user message from request body

  try {
    const result = await model.generateContent(message); // Generate content using the Gemini API
    const aiMessage = result.response.text(); // Extract the AI's response
    res.json({ aiMessage }); // Send back the AI's message
  } catch (error) {
    console.error('Error with AI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating AI response' }); // Handle errors gracefully
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
