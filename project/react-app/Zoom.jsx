import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack } from "@mui/material";
import './main.css';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { generateRoomId } from '../utils/IDgenerating';
import { useTheme as useNextTheme } from "next-themes";
import ReactPlayer from "react-player";
import logo from "./logo512.png";
import { Link, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const PeerChat = () => {
  const [roomId, setRoomId] = useState('');
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const videoId = params.get('videoId'); // Get videoId from query parameters

  useEffect(() => {
    const uniqueRoomId = generateRoomId();
    setRoomId(uniqueRoomId);

    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { theme: nextTheme, setTheme } = useNextTheme();

  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          position: "sticky",
          backgroundColor: nextTheme === 'dark' ? '#000000' : '#ffffff', // Set background color based on theme
          color: nextTheme === 'dark' ? '#ffffff' : '#000000', // Set text color based on theme
          top: 0,
          justifyContent: "space-between",
          zIndex: 10, // Add z-index to ensure Navbar stays on top
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={50} />
          <Typography variant="h5" sx={{ mb: 2, color: nextTheme === 'light' ? '#000000' : 'rgb(97, 218, 251)' }} fontWeight="bold">
            MyTube
          </Typography>
        </Link>

        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{
              fontWeight: "bold",
              backgroundColor: 'rgb(97, 218, 251)', // Set the background color to red
              borderColor: 'rgb(97, 218, 251)', // Optional: Set the border color to red to match the background
              color: nextTheme === 'dark' ? '#000000' : '#ffffff', // Ensure text is readable with a red background
            }}
          >
            Theme
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => toggleTheme('light')}>Light Mode</Dropdown.Item>
            <Dropdown.Item onClick={() => toggleTheme('dark')}>Dark Mode</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} sx={{ height: '100vh', backgroundColor: nextTheme === 'dark' ? 'rgb(10, 12, 12)' : '#ffffff' }}>
        <Box flex={1} sx={{ overflow: 'hidden' }}>
          <Box id="ytbVideo" sx={{ width: "70%", margin: "20px", position: 'relative', top: '0' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player" controls />
            <Typography variant="h4" sx={{ mt: 2, color: "black" }}>
              Room ID: {roomId} {/* Display room ID */}
            </Typography>
          </Box>
        </Box>

        <div>
          <div id="videos">
            <video className="video-player" id="user-1" autoPlay playsInline></video>
            <video className="video-player" id="user-2" autoPlay playsInline></video>
          </div>

          <div id="controls">
            <div className="control-container" id="camera-btn">
              <VideocamIcon />
            </div>

            <div className="control-container" id="mic-btn">
              <MicIcon />
            </div>

            <a href="/">
              <div className="control-container" id="leave-btn">
                <CallIcon />
              </div>
            </a>
          </div>
             <script src="https://cdn.agora.io/sdk/rtm/1.4.4/agora-rtm-sdk.min.js"></script>
          <script src='agora-rtm-sdk-1.4.4.js'></script>
          <script src='./main.js'></script>
        </div>
      </Stack>
    </>
  );
};

export default PeerChat;
