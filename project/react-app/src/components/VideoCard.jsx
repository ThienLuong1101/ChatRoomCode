import React from 'react';
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  const { theme: nextTheme } = useNextTheme();

  return (
    <Card 
      sx={{
        justifyContent: 'center',
        width: { xs: '100%', sm: '350px', md: "340px" },
        boxShadow: "none",
        borderRadius: 0,
        backgroundColor: nextTheme === 'dark' ? '#000000' : '#ffffff'
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia 
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} 
          alt={snippet?.title} 
          sx={{ width: { xs: '100%', sm: '358px' }, height: 180  }} 
        />
      </Link>
      <CardContent 
        sx={{ 
          backgroundColor: nextTheme === 'dark' ? '#1E1E1E' : '#f9f9f9', 
          height: '106px' 
        }}
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color={nextTheme === 'dark' ? '#FFF' : '#000'}>
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" color={nextTheme === 'dark' ? 'gray' : 'black'}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
