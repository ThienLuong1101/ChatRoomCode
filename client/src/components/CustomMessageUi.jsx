import React, { useState } from 'react';
import { MessageSimple } from 'stream-chat-react'; // You can use this as a base for your custom message

const CustomMessageUi = (props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
  const emojis = ['😀', '😂', '😍', '😢', '😡', '🥳', '😎', '🤔', '😱', '😴']; // Your emoji list

  const handleEmojiSelect = (emoji) => {
    const { message, handleReaction } = props;
    handleReaction(message, emoji); // Send reaction to the server
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  return (
    <div className="custom-message">
      <MessageSimple {...props} /> {/* Render the default message UI */}
      
      {/* Reaction Button */}
      <div className="reaction-button-container">
        <button 
          className="reaction-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊 React
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker" style={{ marginTop: '8px' }}>
            {emojis.map((emoji, index) => (
              <span
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                style={{ cursor: 'pointer', marginRight: '4px' }} // Add some spacing between emojis
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMessageUi;
