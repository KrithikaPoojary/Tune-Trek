const PLAYLIST_KEY = "my_playlist";

/* Get all songs */
export const getPlaylistSongs = () => {
  const data = localStorage.getItem(PLAYLIST_KEY);
  return data ? JSON.parse(data) : [];
};

/* Add song */
export const addSongToPlaylist = (song) => {
  const playlist = getPlaylistSongs();

  const exists = playlist.some(
    (s) => s.trackId === song.trackId
  );

  if (!exists) {
    playlist.push(song);
    localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlist));
  }
};

/* Remove song (optional) */
export const removeSongFromPlaylist = (trackId) => {
  const updated = getPlaylistSongs().filter(
    (s) => s.trackId !== trackId
  );
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(updated));
};
