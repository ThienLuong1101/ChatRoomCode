import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'dotenv/config';
import PeerChat from './components/Zoom';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for Navbar
      contrastText: '#ffffff', // White color for text on the black Navbar
    },
    background: {
      default: '#ffffff', // Light background color
    },
    text: {
      primary: '#000000', // Black text color
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // White color for Navbar
      contrastText: '#000000', // Black color for text on the white Navbar
    },
    background: {
      default: '#000000', // Dark background color
    },
    text: {
      primary: '#ffffff', // White text color
    },
  },
});

const App = () => {
  const { theme } = useNextTheme();
  const [muiTheme, setMuiTheme] = useState(darkTheme);

  useEffect(() => {
    if (theme === 'dark') {
      setMuiTheme(darkTheme);
    } else {
      setMuiTheme(lightTheme);
    }
  }, [theme]);

  return (
    <NextThemeProvider>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <Box
            sx={{
              backgroundColor: theme === 'dark' ? muiTheme.palette.background.default : muiTheme.palette.background.default,
              color: theme === 'dark' ? muiTheme.palette.text.primary : muiTheme.palette.text.primary,
              minHeight: '100vh', // Ensure the Box covers the full viewport height
            }}
          >
            <Routes>
              <Route path='/' element={<><Navbar /><Feed /></>} />
              <Route path='/video/:id' element={<><Navbar /><VideoDetail /></>} />
              <Route path='/channel/:id' element={<><Navbar /><ChannelDetail /></>} />
              <Route path='/search/:searchTerm' element={<><Navbar /><SearchFeed /></>} />
              <Route path="/room/:roomId" element={<PeerChat />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </NextThemeProvider>
  );
};

export default App;
