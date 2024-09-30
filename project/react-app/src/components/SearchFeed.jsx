import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme as useNextTheme } from "next-themes";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const { theme: nextTheme } = useNextTheme();
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh" sx={{backgroundColor:nextTheme === 'dark' ? '#000000' : '#ffffff'}}>
      <Typography variant="h4" fontWeight={700}  mb={3} ml={{ sm: "100px", color:nextTheme === 'light' ? '#000000' : '#ffffff', // Ensure text is readable with a red background
 }}>
        Search Results for <span style={{ color: "rgb(97, 218, 251)", fontWeight:"20px" }}>{searchTerm}</span> videos:
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
