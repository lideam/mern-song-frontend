import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import SongForm from "./features/songs/SongForm";
import SongList from "./features/songs/SongList";
import StatsPanel from "./features/songs/StatsPanel";
import FilterBar from "./components/FilterBar";
import BackendLoader from "./components/BackendLoader";
import { useBackendStatus } from "./hooks/useBackendStatus";

function App() {
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const { isBackendReady, loadingMessage } = useBackendStatus();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#1DB954" },
      background: { default: "#121212", paper: "#181818" },
    },
  });

  if (!isBackendReady) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BackendLoader message={loadingMessage} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Box id="hero" sx={{ minHeight: "100vh" }}>
        <Hero />
      </Box>

      <Box
        id="songs"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
        }}
      >
        <FilterBar />
        <SongList onEdit={(id) => setEditId(id)} />
      </Box>

      <Box
        id="stats"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#181818",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
        }}
      >
        <StatsPanel />
      </Box>

      <Box
        id="addsong"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
        }}
      >
        <SongForm editId={editId} onFinish={() => setEditId(undefined)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
