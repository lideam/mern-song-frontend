import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setFilterGenre, setSearchQuery } from "../features/songs/SongSlice";
import { Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { space, layout } from "styled-system";

//  Styled Components
const Container = styled("div")(space, layout, {
  textAlign: "center",
  margin: "0 auto",
});

const StyledInput = styled("input")({
  width: "100%",
  maxWidth: "900px",
  padding: "14px 20px 14px 50px",
  borderRadius: "30px",
  backgroundColor: "#222",
  border: "none",
  outline: "none",
  color: "white",
  fontSize: "16px",
});

const SearchWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
  width: "100%",
  maxWidth: "900px",
});

const SearchIconWrapper = styled("div")({
  position: "absolute",
  top: "50%",
  left: "15px",
  transform: "translateY(-50%)",
  color: "#1DB954",
});

const GenreChip = styled("div")<{ active?: boolean }>(({ active }) => ({
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  cursor: "pointer",
  margin: "5px",
  backgroundColor: active ? "#1DB954" : "#333",
  color: "white",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: active ? "#1ed760" : "#1DB954aa",
  },
}));

//  Component
const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { list, filterGenre, searchQuery } = useSelector(
    (state: RootState) => state.songs
  );

  const genres = Array.from(
    new Set(list.map((s) => s.genre.trim().toLowerCase()))
  );

  return (
    <Container width="100%" maxWidth="900px" mt={8}>
      {/* Search Input */}
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInput
          type="text"
          placeholder="Search songs, artists, or albums..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </SearchWrapper>

      {/* Genre Chips */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        flexWrap="wrap"
        mt={4}
      >
        <GenreChip
          active={filterGenre === ""}
          onClick={() => dispatch(setFilterGenre(""))}
        >
          All
        </GenreChip>
        {genres.map((genre) => (
          <GenreChip
            key={genre}
            active={filterGenre === genre}
            onClick={() => dispatch(setFilterGenre(genre))}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </GenreChip>
        ))}
      </Stack>
    </Container>
  );
};

export default FilterBar;
