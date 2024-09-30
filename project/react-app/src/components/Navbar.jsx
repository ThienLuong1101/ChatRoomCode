import React from 'react';
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme as useNextTheme } from "next-themes";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

import logo from "./logo512.png";
import { SearchBar } from "./";

const Navbar = () => {
  const { theme: nextTheme, setTheme } = useNextTheme();
  // const muiTheme = useMuiTheme();

  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  return (
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
      <Link  to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={50} />
        <Typography  variant="h5" sx = {{ mb: 2, color: nextTheme === 'light' ? '#000000' : 'rgb(97, 218, 251)' }}  fontWeight="bold"  >MyTube</Typography>
      </Link>
     
      <SearchBar sx = {{backgroundColor: "#ffffff" }}/>
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
  );
};

export default Navbar;
