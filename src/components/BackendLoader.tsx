import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface BackendLoaderProps {
  message?: string;
}

const BackendLoader: React.FC<BackendLoaderProps> = ({ message }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
        color: "#fff",
        gap: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="h6">
        {message || "Waking up backend, please wait..."}
      </Typography>
    </Box>
  );
};

export default BackendLoader;
