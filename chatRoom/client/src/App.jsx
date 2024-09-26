import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';
import './components/App.css';

const cookies = new Cookies();
const apiKey = process.env.APIKEY; // Using environment variable

const authToken = cookies.get("token");

console.log("Auth Token:", authToken); // Debugging line

const userId = cookies.get('userId');
console.log("User ID:", userId); // Debugging line

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const client = StreamChat.getInstance(apiKey);

    useEffect(() => {
        const userId = cookies.get('userId') || 'testUserId'; // Hardcoded for testing
        const username = cookies.get('username') || 'Test User';
        const authToken = cookies.get("token") || 'your_test_user_token'; // Hardcoded token for testing

        // Only connect if authToken and userId exist
        if (authToken && userId) {
            client.connectUser(
                {
                    id: userId,
                    name: username,
                    fullName: username, // Optional
                    
                },
                authToken
            ).then(() => {
                setLoading(false);
                console.log("User connected successfully");
            }).catch(error => {
                console.error("Failed to connect user:", error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            if (authToken) {
                client.disconnectUser();
            }
        };
    }, []); // Only run once when the component mounts

    if (loading) return <div>Loading...</div>; 
    if (!cookies.get("token")) return <Auth />;

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;
