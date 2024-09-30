import React, { useState } from 'react';
import axios from 'axios';
import '../assets/chatbot.css'; // Ensure chatbot.css exists for styling

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        
        // Append user's message to the messages array
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        
        try {
            const response = await axios.post('https://chatroom1-2.onrender.com/ai-chat', { message: input });
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
                {/* Display a placeholder when there are no messages */}
                {messages.length === 0 ? (
                    <div className="channel-empty__container">
                    <p className="channel-empty__first">The chatbot is introverted at times and may take a while to respond.</p>
<p className="channel-empty__second">If the wait is too long, click the chatbot icon again to refresh.</p>

                </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <div className={`message-text`}>{msg.text}</div>
                        </div>
                    ))
                )}
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
