import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';
import AlertBox from '../assets/AlertBox'; // Import the AlertBox component

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();
        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    );
};

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const [channelName, setChannelName] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

    const createChannel = async (e) => {
        e.preventDefault();

        if (createType === 'team' && !channelName) {
            setShowAlert(true); // Show alert if channel name is empty for team creation
            return;
        }

        if (createType === 'messaging' && selectedUsers.length !== 2) {
            setShowAlert(true); // Show alert if user tries to select more than one person for direct messaging
            return;
        }

        try {
            const newChannel = await client.channel(createType, {
                name: createType === 'team' ? channelName : undefined, // Only set channel name for team channels
                members: selectedUsers
            });

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false); // Close the alert when user clicks the close button
    };

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>

            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            
            {/* UserList component for selecting users */}
            <UserList
                setSelectedUsers={(users) => {
                    // For direct messages, only allow one user (in addition to the current user)
                    if (createType === 'messaging' && users.length > 1) {
                        return;
                    }
                    setSelectedUsers(users);
                }}
            />

            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>

            {/* Render the AlertBox if showAlert is true */}
            {showAlert && (
                <AlertBox
                    message={createType === 'team' 
                        ? 'Please enter a channel name.' 
                        : 'Please select only one user for direct messaging.'
                    }
                    type="warning"
                    onClose={handleAlertClose}
                />
            )}
        </div>
    );
};

export default CreateChannel;
