import React, { useState } from "react";
import axios from "axios";
import { addSongToPlaylist } from "../../api/playlistApi";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  // Search for songs
  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${query}&entity=song`
      );

      setResults(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Add song to playlist
  const handleAddToPlaylist = async (song) => {
    try {
      // Hardcoded playlist ID for testing (you will change later)
      const playlistId = "example"; 

      const body = {
        trackId: song.trackId,
        trackName: song.trackName,
        artistName: song.artistName,
        previewUrl: song.previewUrl,
      };

      await addSongToPlaylist(playlistId, body);
      setMessage(`Added "${song.trackName}" to playlist!`);

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error adding to playlist:", error);
      setMessage("Failed to add song.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Music</h2>

      <input
        type="text"
        className="form-control"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="btn btn-primary mt-2" onClick={handleSearch}>
        Search
      </button>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <div className="mt-4">
        {results.map((song) => (
          <div key={song.trackId} className="card mb-2 p-3">
            <h5>{song.trackName}</h5>
            <p>{song.artistName}</p>

            <audio controls src={song.previewUrl}></audio>

            <button
              className="btn btn-success mt-2"
              onClick={() => handleAddToPlaylist(song)}
            >
              ➕ Add to Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
