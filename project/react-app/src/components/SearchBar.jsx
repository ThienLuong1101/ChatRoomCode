import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme as useNextTheme } from "next-themes";
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { theme: nextTheme } = useNextTheme();
  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm('');
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        background: nextTheme === 'dark' ? '#000000' : '#ffffff',
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
    >
      
      <input
        id="search"
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'blue'}} aria-label='search'>
        <SearchIcon  sx={{color:"rgb(97, 218, 251)"}} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
