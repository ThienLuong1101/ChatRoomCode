import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import AlertBox from '../assets/AlertBox';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
};

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const checkPasswordStrength = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasNumbers) {
            return "Password must contain at least one number.";
        }

        return "strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = form;

        if (isSignup && password !== confirmPassword) {
            setAlert({ message: "Passwords do not match!", type: 'error' });
            return;
        }

        const passwordStrength = checkPasswordStrength(password);
        if (isSignup && passwordStrength !== "strong") {
            setAlert({ message: passwordStrength, type: 'error' });
            return;
        }

        const URL = 'https://chatroom1-2.onrender.com/auth'; //IMPORTANT

        try {
            if (isSignup) {
                // Sign Up Logic
                const { data } = await axios.post(`${URL}/signup`, {
                    username: form.username,
                    password,
                    fullName: form.fullName,
                    phoneNumber: form.phoneNumber,
                });

                // Set cookies with the returned user data
                cookies.set('token', data.token, { path: '/' });
                cookies.set('userId', data.userId, { path: '/' });
                cookies.set('username', data.username, { path: '/' });
                cookies.set('fullName', data.fullName, { path: '/' });
                setAlert({ message: "Login successful!", type: 'success' });
                window.location.reload();

            } else {
                // Sign In Logic
                const { data } = await axios.post(`${URL}/login`, {
                    username: form.username,
                    password,
                });

                // Set cookies with the returned user data
                cookies.set('token', data.token, { path: '/' });
                cookies.set('userId', data.userId, { path: '/' });
                cookies.set('username', data.username, { path: '/' });
                cookies.set('fullName', data.fullName, { path: '/' });

                window.location.reload();
            }
        } catch (error) {
            console.error("Error during authentication:", error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.message) {
                setAlert({ message: error.response.data.message, type: 'error' });
            } else {
                setAlert({ message: "An unknown error occurred.", type: 'error' });
            }
        }
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className="auth__form-container">
            {alert.message && <AlertBox message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
            <div className="auth__form-container_image">
                <div className="slogan">
                    <h1>Chatterly</h1>
                    <h3> Talk the talk, in your world, your way.</h3>
                    <p> A ChatApp developed by Ansaidepchieu</p>
                </div>
            </div>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"}
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
