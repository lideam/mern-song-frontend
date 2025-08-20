import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { deleteSong, fetchSongs } from "./SongSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "../../theme/Box";

interface Props {
  onEdit: (id: string) => void;
}

const SongList: React.FC<Props> = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list, filterGenre, searchQuery, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const filteredSongs = list.filter((song) => {
    const matchesGenre = filterGenre
      ? song.genre.trim().toLowerCase() === filterGenre.trim().toLowerCase()
      : true;

    const matchesSearch = searchQuery
      ? [song.title, song.artist, song.album].some((field) =>
          field.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      : true;

    return matchesGenre && matchesSearch;
  });

  return (
    <Box
      minHeight="100vh"
      py={4}
      px={4}
      bg="#111"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        🎵 Your Songs
      </Typography>

      {loading && <Typography>Loading songs...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && filteredSongs.length === 0 && (
        <Typography>No songs found. Add one!</Typography>
      )}

      {!loading && filteredSongs.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            mt: 4,
            backgroundColor: "#181818",
            borderRadius: "16px",
            maxWidth: "1000px",
            width: "100%",
            overflow: "hidden",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #1DB954, #1ed760)",
                }}
              >
                {["Title", "Artist", "Album", "Genre", "Actions"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs.map((song, index) => (
                <TableRow
                  key={song._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#222" : "#2a2a2a",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  <TableCell sx={{ color: "white" }}>{song.title}</TableCell>
                  <TableCell sx={{ color: "white" }}>{song.artist}</TableCell>
                  <TableCell sx={{ color: "white" }}>{song.album}</TableCell>
                  <TableCell sx={{ color: "white" }}>{song.genre}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        onEdit(song._id);
                        scroller.scrollTo("addsong", {
                          smooth: true,
                          offset: -70,
                          duration: 600,
                        });
                      }}
                      sx={{ color: "#1DB954" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => dispatch(deleteSong(song._id))}
                      sx={{ color: "#e53935" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SongList;
