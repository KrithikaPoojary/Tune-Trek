import axios from "axios";

const API = "http://localhost:5000";


// SEARCH SONGS
export async function searchSongs(query) {
  return axios
    .get(`${API}/api/music/search?q=${query}`)
    .then((res) => res.data);
}

// CREATE PLAYLIST
export async function createPlaylist(name) {
  return axios
    .post(`${API}/api/playlist`, { name })
    .then((res) => res.data);
}

export async function addSongToPlaylist(id, song) {
  return axios.post(`${API}/api/playlist/${id}/add`, { song })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding song:", err.response?.data || err);
      throw err;
    });
}


// REMOVE SONG
export async function removeSong(id, songId) {
  return axios
    .delete(`${API}/api/playlist/${id}/remove`, { data: { songId } })
    .then((res) => res.data);
}

// GET PLAYLISTS
export async function getPlaylists() {
  return axios.get(`${API}/api/playlist`).then((res) => res.data);
}
