import React, { useState } from 'react';
import axios from 'axios';
import '../assets/chatbot.css'; // Make sure to create this CSS file for styling

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        
        // Append user's message to the messages array
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        
        try {
            const response = await axios.post('http://localhost:5000/ai-chat', { message: input });
            const aiMessage = response.data.aiMessage;

            // Append AI's response to the messages array
            const aiResponse = { text: aiMessage, sender: 'ai' };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error("Error sending message to AI:", error);
        } finally {
            setInput('');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>Chatterly AI</h2>
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className={`message-text`}>{msg.text}</div>
                    </div>
                ))}
            </div>
            <form className="message-input" onSubmit={sendMessage}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your message..." 
                    required 
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
