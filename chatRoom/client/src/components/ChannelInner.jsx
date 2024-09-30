import React, { useState } from 'react';
import { 
  Channel, 
  MessageList, 
  MessageInput, 
  Window, 
  useChannelActionContext, 
  Avatar, 
  useChannelStateContext, 
  useChatContext,
} from 'stream-chat-react';

import { ChannelInfo } from '../assets';
import '../components/App.css';
import axios from 'axios'; // Import axios to make API requests

const emojis = [
  '😀', '😂', '😍', '😢', '😡', '🥳', '😎', '🤔', '😱', '😴', // Add more emojis as needed
];

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker visibility
  const [messageInputValue, setMessageInputValue] = useState(''); // State to control MessageInput text
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = async (message) => {
    let updatedMessage = {
      attachments: message.attachments || [],
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    // Send user's message to the backend AI API
    try {
      const response = await axios.post('http://localhost:5000/ai-chat', { message: message.text });
      const aiMessage = response.data.aiMessage;

      // Send AI's response as a new message
      sendMessage({ text: aiMessage, user: { id: 'ai-bot' } }); // Customize user id for AI
    } catch (error) {
      console.error("Error sending message to AI:", error);
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
      setMessageInputValue(''); // Clear the input field after sending
    }
  };

  const handleEmojiSelect = (emoji) => {
    // Append the selected emoji to the MessageInput value
    setMessageInputValue(prevValue => prevValue + emoji);
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ width: '100%' }}>
        <Channel>
          <Window>
            <TeamChannelHeader setIsEditing={setIsEditing} />

            {/* Message List */}
            <MessageList />

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="emoji-picker" style={{ marginRight: '8px' }}>
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    style={{ cursor: 'pointer', marginRight: '4px' }} // Optional: Add spacing between emojis
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}

            <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className="emoji-picker-button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{ marginRight: '8px' }} // Optional: Add some spacing between the button and the picker
              >
                😃
              </button>

              {/* MessageInput with the emoji appended to its value */}
              <MessageInput
                value={messageInputValue} // Bind the value to state
                onChange={(e) => setMessageInputValue(e.target.value)} // Handle input changes
                style={{ flexGrow: 1 }} // Make MessageInput take the remaining space
                overrideSubmitHandler={overrideSubmitHandler}
              />
            </div>
          </Window>
        </Channel>
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    if (channel.type === 'messaging') {
      return (
        <div className='team-channel-header__name-wrapper'>
          {members.map(({ user }, i) => (
            <div key={i} className='team-channel-header__name-multi'>
              <Avatar image={user.image} name={user.name || user.id} size={32} />
              <p className='team-channel-header__name user'>{user.name || user.id}</p>
            </div>
          ))}
          {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
        </div>
      );
    }

    return (
      <div className='team-channel-header__channel-wrapper'>
        <p className='team-channel-header__name'># {channel.data.name}</p>
        <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return '1 user online';
    return `${watchers} users online`;
  };

  return (
    <div className='team-channel-header__container'>
      <MessagingHeader />
      <div className='team-channel-header__right'>
        <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChannelInner;
