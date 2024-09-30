import React from "react";
import { Stack } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const { theme: nextTheme } = useNextTheme(); // Correctly use the hook
  
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory ? "rgb(97, 218, 251)" : "transparent",
            color: nextTheme === 'dark' ? '#f9f9f9' : '#1E1E1E', // Word color based on theme
          }}
          key={category.name}
        >
          <span 
            style={{ 
              color: category.name === selectedCategory ? "white" : nextTheme === 'dark' ? '#f9f9f9' : '#1E1E1E', 
              marginRight: "15px" 
            }}
          >
            {category.icon}
          </span>
          <span 
            style={{ 
              opacity: category.name === selectedCategory ? "1" : "0.8", 
              color: category.name === selectedCategory ? "white" : nextTheme === 'dark' ? '#f9f9f9' : '#1E1E1E' 
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Categories;
