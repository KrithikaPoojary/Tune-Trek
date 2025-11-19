import React, { useState } from "react";
import axios from "../../api/axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const searchSongs = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setSongs(response.data.results);  
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to fetch songs!");
    }
  };

  return (
    <div className="container">
      <h2>Search Songs</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Search songs, artists…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchSongs}>
          Search
        </button>
      </div>

      <ul className="list-group">
        {songs.map((song) => (
          <li className="list-group-item" key={song.trackId}>
            <img src={song.artworkUrl100} alt="" style={{ width: 50, marginRight: 10 }} />
            {song.trackName} — {song.artistName}
            <div>
              <audio controls src={song.previewUrl}></audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
