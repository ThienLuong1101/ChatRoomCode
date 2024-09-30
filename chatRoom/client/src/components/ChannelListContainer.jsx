import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

import LogoutIcon from '../assets/logout.png';
import MenuIcon from '../assets/menu.png';
import AIIcon from '../assets/AI.png';

const cookies = new Cookies();

const SideBar = ({ logout, toggleMenu, toggleAIChatbot, aiActive }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon2" onClick={toggleMenu}>
            <div className="icon1__inner">
                <img src={MenuIcon} alt="Menu" width="30" />
            </div>
        </div>
         <div 
            className="channel-list__sidebar__icon2"
            style={{ backgroundColor: aiActive ? '#74AA9C' : '' }} // Conditional background color
        >
            <div className="icon2__inner" onClick={toggleAIChatbot}> {/* Toggle AI Chatbot */}
                <img src={AIIcon} alt="AI" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon2__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
       
    </div>
);

// Header component for displaying company name
const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Chatterly</p>
    </div>
);

// Filter functions for team and messaging channels
const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
};

// Main content for displaying channel list
const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, toggleAIChatbot }) => {
    const { client } = useChatContext();
    const [menuVisible, setMenuVisible] = useState(true); // State for menu visibility
    const [aiActive, setAiActive] = useState(false); // State for AI button active status

    const toggleMenu = () => {
        setMenuVisible((prevMenuVisible) => !prevMenuVisible);
    };

    // Toggle AI chatbot and button active state
    const handleToggleAIChatbot = () => {
        setAiActive((prevAiActive) => !prevAiActive);
        toggleAIChatbot(); // Call the passed function to toggle the AI Chatbot
    };

    // Logout function to remove cookies and reload page
    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');
        
        window.location.reload();
    };

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} toggleMenu={toggleMenu} toggleAIChatbot={handleToggleAIChatbot} aiActive={aiActive} /> {/* Pass the AI active state */}
            <div style={{ display: menuVisible || aiActive ? 'flex' : 'none' }}>

                <div className="channel-list__list__wrapper" style={{ display: 'flex' }}>
                    <CompanyHeader />
                    <ChannelSearch setToggleContainer={setToggleContainer} />
                    <ChannelList
                        filters={filters}
                        channelRenderFilterFn={customChannelTeamFilter}
                        List={(listProps) => (
                            <TeamChannelList
                                {...listProps}
                                type="team"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                type="team"
                            />
                        )}
                    />
                    <ChannelList
                        filters={filters}
                        channelRenderFilterFn={customChannelMessagingFilter}
                        List={(listProps) => (
                            <TeamChannelList
                                {...listProps}
                                type="messaging"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                type="messaging"
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
};

// ChannelListContainer with AI toggle integration
const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, toggleAIChatbot }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    toggleAIChatbot={toggleAIChatbot} // Pass AI toggle function
                />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)} />
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    toggleAIChatbot={toggleAIChatbot} // Pass AI toggle function
                />
            </div>
        </>
    );
};

export default ChannelListContainer;
