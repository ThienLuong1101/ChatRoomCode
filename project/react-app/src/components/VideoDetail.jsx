import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTheme as useNextTheme } from "next-themes";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { v4 as uuidv4 } from 'uuid';
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { storeWatchedVideo } from "../utils/storage";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate

  const { theme: nextTheme } = useNextTheme();

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const data = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
        setVideoDetail(data.items[0]);
        storeWatchedVideo(id);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      }
    };

    fetchVideoDetail();
    fetchRelatedVideos();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  // Handle navigation
  const handleTheaterZoomClick = () => {
    const uniqueRoomId = uuidv4();
    navigate(`/room/${uniqueRoomId}?videoId=${id}`);  // Pass video ID as a URL parameter
  };

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: nextTheme === 'dark' ? '#000000' : '#f9f9f9'}}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
              <Typography sx={{ color: nextTheme === 'light' ? '#000000' : '#f9f9f9'}} variant="h5" fontWeight="bold" p={2}>
                {title}
              </Typography>
              <Button 
                variant="contained"  
                sx={{ 
                  color: "black", 
                  fontWeight: "bold",
                  backgroundColor: "rgb(97, 218, 251)",
                  "&:hover": {
                    color: "white", 
                    backgroundColor: "rgb(97, 218, 251)" 
                  }
                }}
                onClick={handleTheaterZoomClick}  // Use the handler
              >
                Theater Zoom
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
