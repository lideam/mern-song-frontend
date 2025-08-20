import React from "react";
import { Typography, Button } from "@mui/material";
import Box from "../theme/Box";

const Hero: React.FC = () => {
  return (
    <Box
      id="home"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      // inline style for gradient since styled-system bg won’t parse gradients well)
      style={{
        background: "linear-gradient(to right, #000000, #1DB954)",
        color: "white",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={6}
        maxWidth="1200px"
        width="100%"
      >
        {/* Left section */}
        <Box flex="1">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Manage Your <span style={{ color: "#1DB954" }}>Music</span> 🎶
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            Add, edit, and explore your favorite songs with powerful stats and
            filters — all in one place.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "#1DB954",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#1ed760" },
            }}
            onClick={() => {
              const el = document.getElementById("songs");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            GET STARTED
          </Button>
        </Box>

        {/* Right image */}
        <Box flex="1" pl={4}>
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
            alt="Music"
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
