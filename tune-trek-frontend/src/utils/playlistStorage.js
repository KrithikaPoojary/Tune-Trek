const PLAYLIST_KEY = "my_playlist";

/* 🔹 Get songs of default playlist */
export const getPlaylistSongs = () => {
  const data = localStorage.getItem(PLAYLIST_KEY);
  return data ? JSON.parse(data) : [];
};

/* 🔹 Save songs */
export const savePlaylists = (songs) => {
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(songs));
};

/* 🔹 Add song */
export const addSongToPlaylist = (song) => {
  const playlist = getPlaylistSongs();

  const exists = playlist.some(
    (s) => s.trackId === song.trackId
  );

  if (!exists) {
    playlist.push(song);
    savePlaylists(playlist);
  }
};

/* 🔹 (Optional) for future */
export const getPlaylists = () => {
  return [
    {
      name: "My Playlist",
      songs: getPlaylistSongs(),
    },
  ];
};
