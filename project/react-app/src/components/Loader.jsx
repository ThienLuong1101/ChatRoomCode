import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import { useTheme as useNextTheme } from "next-themes"; 

const Loader = () =>  {
  const { theme: nextTheme } = useNextTheme();
  return (
  <Box minHeight="95vh" sx={{ backgroundColor: nextTheme === 'dark' ? '#000000' : '#f9f9f9'}}>
    <Stack direction='row' justifyContent='center' alignItems='center' height='80vh' >
      <CircularProgress sx={{ color: "rgb(97, 218, 251)" }} />
    </Stack>
  </Box>
);};

export default Loader;
