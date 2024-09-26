import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { SearchIcon } from '../assets';

// Function component
const ChannelSearch = () => {
    const [query, setQuery] = useState(''); // Destructure correctly for query
    const [loading, setLoading] = useState(false); // Destructure correctly for loading

    const getChannels = async (text) => {
        try {
            // TODO: Fetch channels later
        } catch (error) {
            setQuery('');
        }
    };

    const onSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    };

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input
                    className="channel-search__input__text"
                    placeholder="Search UserName"
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
        </div>
    );
};

export default ChannelSearch;
