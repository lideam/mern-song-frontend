export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// For creating a new song (no _id yet)
export type NewSong = Omit<Song, "_id">;

export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;

  // extra fields from backend
  songsByGenre: { _id: string; count: number }[];
  songsByArtist: { _id: string; count: number; albums: string[] }[];
  songsByAlbum: { _id: string; count: number }[];
  topGenre: string;
  topArtist: string;
  avgSongsPerArtist: string;
}
