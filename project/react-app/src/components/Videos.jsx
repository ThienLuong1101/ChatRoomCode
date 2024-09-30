import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if (!videos) {
    return (
        <Loader />
    );
  }

  if (!videos.length) return <Loader />;

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => {
        console.log("Video item:", item.id); // Log the item object
        return (
          <Box key={idx}>
            {item.id && <VideoCard video={item} />}
            {/* {item.id && <ChannelCard channelDetail={item} />} */}
          </Box>
        );
      })}
    </Stack>
  );
}

export default Videos;
