import React from 'react';
import './LoadingPage.css'; // Import the CSS for styling

const LoadingPage = ({ message = "Loading...", showSpinner = true }) => {
    return (
        <div className="loading-container">
            {showSpinner && <div className="spinner"></div>}
            <p>{message}</p>
        </div>
    );
};

export default LoadingPage;
