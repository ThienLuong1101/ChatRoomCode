import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const SearchResult = ({ channel, type, setToggleContainer }) => {
    const { client, setActiveChannel } = useChatContext();

    const handleSelect = async () => {
        if (type === 'channel') {
            setActiveChannel(channel);
        } else if (type === 'user') {
            // Logic for creating a new direct message channel with the user
            const filters = {
                type: 'messaging',
                member_count: 2,
                members: { $eq: [client.user.id, channel.id] },
            };

            const [existingChannel] = await client.queryChannels(filters);
            if (existingChannel) {
                setActiveChannel(existingChannel);
            } else {
                const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
                setActiveChannel(newChannel);
            }
        }
        setToggleContainer(prev => !prev); // Toggle the container if necessary
    };

    return (
        <div onClick={handleSelect} className="channel-search__result-container">
            {type === 'channel' ? (
                <>
                    <div className='result-hashtag'>#</div>
                    <p className='channel-search__result-text'>{channel.data.name}</p>
                </>
            ) : (
                <div className='channel-search__result-user'>
                    <Avatar image={channel.image} name={channel.name} size={24} />
                    <p className='channel-search__result-text'>{channel.name}</p>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
