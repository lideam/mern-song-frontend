import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, Stats, NewSong } from "../../types/song";

interface SongState {
  list: Song[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
  filterGenre: string;
  searchQuery: string;
}

const initialState: SongState = {
  list: [],
  stats: null,
  loading: false,
  error: null,
  filterGenre: "",
  searchQuery: "",
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchStats: (state) => {
      state.loading = true;
    },
    fetchStatsSuccess: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
      state.loading = false;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    addSong: (state, _action: PayloadAction<NewSong>) => {
      state.loading = true;
    },

    updateSong: (state, _action: PayloadAction<Song>) => {
      state.loading = true;
    },
    deleteSong: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    setFilterGenre: (state, action: PayloadAction<string>) => {
      state.filterGenre = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,
  addSong,
  updateSong,
  deleteSong,
  setFilterGenre,
  setSearchQuery,
} = songSlice.actions;

export const songReducer = songSlice.reducer;
