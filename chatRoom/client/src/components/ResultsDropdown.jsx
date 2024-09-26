import React from 'react';
import { Avatar } from 'stream-chat-react';
import ChannelSearch from './ChannelSearch'; // Ensure correct path

const ResultsDropdown = ({ teamChannels, directChannels, loading, setToggleContainer }) => {
    return (
        <div className='channel-search__results'>
            <p className='channel-search__results-header'>Channels</p>
            {loading && !teamChannels.length && <p className='channel-search__results-header'><i>Loading...</i></p>}
            {!loading && !teamChannels.length ? (
                <p className='channel-search__results-header'><i>No channels found</i></p>
            ) : (
                teamChannels.map((channel, i) => (
                    <ChannelSearch
                        channel={channel}
                        key={i}
                        type='channel'
                        setToggleContainer={setToggleContainer}
                    />
                ))
            )}

            <p className='channel-search__results-header'>Users</p>
            {loading && !directChannels.length && <p className='channel-search__results-header'><i>Loading...</i></p>}
            {!loading && !directChannels.length ? (
                <p className='channel-search__results-header'><i>No users found</i></p>
            ) : (
                directChannels.map((user, i) => (
                    <ChannelSearch
                        channel={user} // Here, treat user as a channel for consistency in rendering
                        key={i}
                        type='user'
                        setToggleContainer={setToggleContainer}
                    />
                ))
            )}
        </div>
    );
};

export default ResultsDropdown;
