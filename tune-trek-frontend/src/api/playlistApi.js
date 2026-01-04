import axios from "axios";

const API_URL = "http://localhost:5000/api/playlist";

// ✅ Create a new playlist
export const createPlaylist = async (name) => {
  return await axios.post(API_URL, { name });
};

// ✅ Get all playlists
export const getPlaylists = async () => {
  return await axios.get(API_URL);
};

// ✅ Add song to playlist
export const addSongToPlaylist = async (playlistId, song) => {
  return await axios.post(`${API_URL}/${playlistId}/add`, {
    song,
  });
};

// ✅ Remove song from playlist
export const removeSongFromPlaylist = async (playlistId, songId) => {
  return await axios.delete(`${API_URL}/${playlistId}/remove`, {
    data: { songId },
  });
};
