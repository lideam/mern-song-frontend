import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-scroll";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: scrolled ? "#121212" : "transparent",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#1DB954" }}
        >
          🎵 Song Manager
        </Typography>
        <Stack direction="row" spacing={2}>
          {["Home", "Songs", "Stats", "Add Song"].map((section) => (
            <Button
              key={section}
              component={Link}
              to={section.toLowerCase().replace(" ", "")}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              sx={{ color: "white" }}
            >
              {section}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
