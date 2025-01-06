import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import LoadingPage from './assets/LoadingPage';
import { ChannelListContainer, ChannelContainer, Auth, Chatbot } from './components';
import './components/App.css';
import 'stream-chat-react/dist/css/v2/index.layout.css';

const cookies = new Cookies();
const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const authToken = cookies.get("token");

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [createType, setCreateType] = useState('');
    const [showAIChatbot, setShowAIChatbot] = useState(false); // State for AI Chatbot visibility

    const client = StreamChat.getInstance(apiKey);

    useEffect(() => {
        const userId = cookies.get('userId');
        const username = cookies.get('username') || 'Test User';
        const authToken = cookies.get("token");

        if (authToken && userId) {
            client.connectUser(
                {
                    id: userId,
                    name: username,
                },
                authToken
            ).then(() => {
                setIsConnected(true);
                setLoading(false);
            }).catch(error => {
                console.error("Failed to connect user:", error.message || error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

        return () => {
            if (isConnected) {
                client.disconnectUser()
                    .then(() => console.log("User disconnected successfully"))
                    .catch(err => console.error("Error disconnecting user:", err));
            }
        };
    }, [client, isConnected]);

    if (loading) return <LoadingPage />;
    if (!authToken) return <Auth />;

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    toggleAIChatbot={() => setShowAIChatbot((prev) => !prev)} // Toggle AI Chatbot
                />
                {!showAIChatbot && ( // Conditionally render ChannelContainer if AI chatbot is not visible
                    <ChannelContainer 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        createType={createType}
                    />
                )}
                {showAIChatbot && <Chatbot className="AI" />} {/* Conditionally render Chatbot */}
            </Chat>
        </div>
    );
};

export default App;
