import axios from "axios";

const API_URL = "http://localhost:5000/api/playlist";

// ✅ Create Playlist
export const createPlaylist = async (name) => {
  try {
    const res = await axios.post(API_URL, { name });
    return res.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

// ✅ Get All Playlists
export const getPlaylists = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

// ✅ Add Song to Playlist
export const addSongToPlaylist = async (playlistId, song) => {
  try {
    const res = await axios.post(`${API_URL}/${playlistId}/add`, {
      song,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    throw error;
  }
};

// ✅ Remove Song from Playlist
export const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    const res = await axios.delete(`${API_URL}/${playlistId}/remove`, {
      data: { songId },
    });
    return res.data;
  } catch (error) {
    console.error("Error removing song:", error);
    throw error;
  }
};