import React, { useState } from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MytubeMeetForm = () => {
  const [roomId, setRoomId] = useState(""); // Renamed from 'name' to 'roomId'
  const { theme: nextTheme } = useNextTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    
      navigate(`/room/${roomId}`); // Redirect to the room path
   
  };

  return (
    <>
      <Typography id="form__container__header" variant="h5" sx={{ py: 2, borderRadius: "10px 10px 0 0", textAlign: "center", padding: "10px", color: nextTheme === 'light' ? '#000000' : '#ffffff' }}>
        Watching Mytube Videos with Your Bros
      </Typography>
      
      <Box id="form__content__wrapper" component="form" onSubmit={handleSubmit} sx={{ mt: 2, textAlign: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          sx={{ bgcolor: "#3f434a", borderRadius: 1, mt: 4, input: { color: "#fff" }, width: "60%"}}
          InputLabelProps={{
            style: { color: "#fff" }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4, bgcolor: "rgb(97, 218, 251)", width: "60%", py: 2, borderRadius: 1}}
        >
          JOIN
        </Button>
      </Box>
    </>
  );
};

export default MytubeMeetForm;
