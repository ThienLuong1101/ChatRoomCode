import React from 'react';
import { Channel, useMessageContext } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';
import '../components/App.css';

// Custom message component using the useMessageContext hook
const CustomMessageUI = () => {
    const { message } = useMessageContext(); // Get the message context

    return (
        <div className="message-container" data-message-id={message.id}>
            <strong>{message.user.name}</strong>: {message.text}
        </div>
    );
};

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        );
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    );

    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={CustomMessageUI} // Pass the custom message UI component
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
};

export default ChannelContainer;
