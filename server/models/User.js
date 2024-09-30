// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    avatarURL: { type: String, required: true }, // URL of the uploaded avatar
});

const User = mongoose.model('User', userSchema);
module.exports = User;
