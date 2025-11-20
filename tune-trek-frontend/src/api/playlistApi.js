import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create a new playlist
export const createPlaylist = async (name) => {
  return await axios.post(`${API_URL}/playlists`, { name });
};

// Add a song to playlist
export const addSongToPlaylist = async (playlistId, song) => {
  return await axios.post(`${API_URL}/playlists/${playlistId}/songs`, song);
};

// Get all playlists
export const getPlaylists = async () => {
  return await axios.get(`${API_URL}/playlists`);
};

// Remove a song
export const removeSong = async (playlistId, songId) => {
  return await axios.delete(`${API_URL}/playlists/${playlistId}/songs/${songId}`);
};
