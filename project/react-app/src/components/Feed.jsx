import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { fetchVideo } from "../utils/fetchVideo";
import { useTheme as useNextTheme } from "next-themes";
import { getWatchedVideos } from "../utils/storage";
import { Videos, Sidebar } from "./";
import MytubeMeetForm from "./MytubeMeetForm"; // Import the new component

import './Feed.css'; // Import the CSS file

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const { theme: nextTheme } = useNextTheme();

  useEffect(() => {
    setVideos(null);
    if (selectedCategory === "Mytube Meet") {
      return;
    } else if (selectedCategory === "History") {
      const watchedVideos = getWatchedVideos();
      fetchVideo(watchedVideos)
        .then((data) => {
          if (data) {
            setVideos(data.items);
          } else {
            console.error("Failed to fetch watched videos");
          }
        });
    } else {
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
        setVideos(data.items);
      });
    }
  }, [selectedCategory]);

  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
        justifyContent: "center",
        background: nextTheme === 'dark' ? '#000000' : '#ffffff',
      }}
    >
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        {selectedCategory === "History" && (
          <Typography
            variant="h4"
            sx={{ mb: 2, color: nextTheme === 'light' ? '#000000' : '#ffffff' }}
          >
            Watched Videos
          </Typography>
        )}
        {selectedCategory === "MyTube Meet" ? (
          
         <MytubeMeetForm /> 
        ) : (
          <>
            {selectedCategory !== "History" && (
              <Typography
                variant="h4"
                sx={{ mb: 2, color: nextTheme === 'light' ? '#000000' : '#ffffff' }}
              >
                {selectedCategory}
              </Typography>
            )}
            <Videos videos={videos} />
          </>
         
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
