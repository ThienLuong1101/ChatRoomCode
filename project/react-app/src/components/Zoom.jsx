import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Stack } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import CallIcon from '@mui/icons-material/Call';
import './main.css'; // Ensure you have proper styles here
import { useTheme as useNextTheme } from "next-themes";
import { useParams } from "react-router-dom"; // Import useParams
import AgoraRTC from 'agora-rtc-sdk-ng';
import ReactPlayer from "react-player";

import logo from "./logo512.png";
import { Link, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
const PeerChat = () => {
  const { roomId } = useParams(); // Get roomId from URL params
  const [clickedButton, setClickedButton] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [client, setClient] = useState(null);
  const { theme: nextTheme, setTheme } = useNextTheme();

  const toggleTheme = (theme) => {
    setTheme(theme);
  };
  useEffect(() => {
    if (!roomId) return; // Handle case where roomId is not provided

    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Agora RTC setup
    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(agoraClient);
   
    const joinChannel = async () => {
      await agoraClient.join('f474c8e9e3084240aeccbc21b222ca7e', roomId, null, null);

      // Create and publish audio and video tracks
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      
      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);

      // Attach local video track to local video element
      videoTrack.play('user-1');

      // Publish local tracks
      await agoraClient.publish([audioTrack, videoTrack]);
      console.log('Successfully joined the channel');
    };

    const handleUserJoined = async (user) => {
      console.log('User joined:', user);
      if (user.videoTrack) {
        await agoraClient.subscribe(user, 'video');
        const remoteVideoTrack = user.videoTrack;
        if (remoteVideoTrack) {
          remoteVideoTrack.play('user-2');
        }
      } else {
        console.error('User has not published a video track.');
      }
    };

    const handleUserLeft = (user) => {
      console.log('User left:', user);
      const remoteVideoElement = document.getElementById('user-2');
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = null;
      }
    };

    agoraClient.on('user-joined', handleUserJoined);
    agoraClient.on('user-left', handleUserLeft);

    joinChannel();

    // Cleanup on unmount
    return () => {
      agoraClient.leave();
      localAudioTrack?.close();
      localVideoTrack?.close();
      document.body.style.overflow = 'auto';
    };
  }, [roomId]);



  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const handleCameraToggle = async () => {
    if (isCameraOn) {
      // Stop and close the camera track
      localVideoTrack?.stop();
      localVideoTrack?.close();
      setLocalVideoTrack(null);
      // Unpublish the video track if needed
      // await client.unpublish(localVideoTrack);
    } else {
      // Start the camera
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalVideoTrack(videoTrack);
      videoTrack.play('user-1');
      // Re-publish the video track if needed
      // await client.publish(videoTrack);
    }
    setIsCameraOn(prevState => !prevState);
  };

  const handleMicToggle = async () => {
    if (isMicOn) {
      // Stop and close the audio track
      localAudioTrack?.stop();
      localAudioTrack?.close();
      setLocalAudioTrack(null);
      // Unpublish the audio track if needed
      // await client.unpublish(localAudioTrack);
    } else {
      // Start the microphone
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(audioTrack);
      // Re-publish the audio track if needed
      // await client.publish(audioTrack);
    }
    setIsMicOn(prevState => !prevState);
  };


  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const videoId = params.get('videoId');

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
            <Typography variant="h4" sx={{ mt: 2,  color: nextTheme === 'light' ? '#000000' : 'rgb(97, 218, 251)'}}>
              Room ID: {roomId} {/* Display room ID */}
            </Typography>
          </Box>
        </Box>

        <div>
          <div id="videos">
            <video className="video-player" id="user-1" autoPlay playsInline></video>
            <video className="video-player" id="user-2" autoPlay playsInline></video>
          </div>

          <Box id="controls">
            <Button
              className="control-container"
              id="camera-btn"
              onClick={handleCameraToggle}
              sx={{ 
                color: !isCameraOn ? 'red' : 'inherit', 
                backgroundColor: 'rgb(97, 218, 251)',  
                "&:hover": { backgroundColor: "#FFF" } 
              }}
            >
              <VideocamIcon />
            </Button>

            <Button
              className="control-container"
              id="mic-btn"
              onClick={handleMicToggle}
              sx={{ 
                color: !isMicOn ? 'red' : 'inherit', 
                backgroundColor: 'rgb(97, 218, 251)',  
                "&:hover": { backgroundColor: "#FFF" } 
              }}
            >
              <MicIcon />
            </Button>

            <a href="/">
              <Button
                className="control-container"
                id="leave-btn"
                onClick={() => handleButtonClick('leave-btn')}
                sx={{ 
                  color: clickedButton === 'leave-btn' ? 'red' : 'inherit' 
                }}
              >
                <CallIcon />
              </Button>
            </a>
          </Box>
        </div>
      </Stack>
    </>
  );
};

export default PeerChat;
