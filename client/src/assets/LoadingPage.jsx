// assets/Loading.js
import React from 'react';
import './LoadingPage.css'; // Ensure you have some styles for loading

const LoadingPage = ({ message = "Loading...", showSpinner = true }) => {
    return (
        <div className="loading-container">
            {showSpinner && <div className="spinner"></div>}
            <p>{message}</p>
        </div>
    );
};

export default LoadingPage; // Default export
