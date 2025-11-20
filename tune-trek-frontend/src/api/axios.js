import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create a playlist
export const createPlaylist = async (name) => {
  return await axios.post(`${API_URL}/playlist/create`, { name });
};

// Get all playlists
export const getPlaylists = async () => {
  return await axios.get(`${API_URL}/playlists`);
};

// Add a song to playlist
export const addSongToPlaylist = async (playlistId, song) => {
  return await axios.post(`${API_URL}/playlist/add/${playlistId}`, song);
};

// Remove a song from playlist
export const removeSong = async (playlistId, songId) => {
  return await axios.delete(
    `${API_URL}/playlist/remove/${playlistId}/${songId}`
  );
};
