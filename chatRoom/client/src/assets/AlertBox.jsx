import React, { useState } from 'react';
import './AlertBox.css'; // Style the alert box using this file

const AlertBox = ({ message, type = 'info', onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Manually close the alert box when the close button is clicked
    const handleClose = () => {
        setIsVisible(false);
        onClose(); // Trigger the callback to handle any additional close logic
    };

    if (!isVisible) return null;

    return (
        <div className={`alert-box alert-${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={handleClose}>X</button>
        </div>
    );
};

export default AlertBox;
