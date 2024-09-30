const { connect } = require('getstream');
const bcrypt = require('bcryptjs');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const serverClient = connect(api_key, api_secret, app_id);
const chatClient = StreamChat.getInstance(api_key, api_secret);

// Function to check if username exists
const checkUsernameExists = async (username) => {
    try {
        const response = await chatClient.queryUsers({
            name: { $eq: username } // Query users where "name" equals the provided username
        });

        // If users are found, username is taken
        if (response.users.length > 0) {
            return true; // Username exists
        }

        return false; // Username does not exist
    } catch (error) {
        console.error('Error checking username:', error);
        throw error;
    }
};

// Signup function
const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;
       

        // Check if username exists
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            return res.status(400).json({ message: "Username already exists, please choose another name." });
        }

        // Proceed with signup if username is available
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(userId);

        // Create the user in Stream
        await chatClient.upsertUser({
            id: userId,
            name: username,
            fullName: fullName,
            hashedPassword,
            phoneNumber
        });

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Signup failed, please try again." });
    }
};




const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const { users } = await chatClient.queryUsers({ name: username });

        if (users.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = users[0];

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // If the password matches, create a token for the user
        const token = serverClient.createUserToken(user.id);
       
        // Respond with the user data and token
        res.status(200).json({
            token,
            fullName: user.fullName,
            username: user.name,
            userId: user.id,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed, please try again.' });
    }
};


module.exports = { signup, login, checkUsernameExists}