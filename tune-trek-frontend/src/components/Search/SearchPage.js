import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADD THIS
import { searchSongs } from "../../api/axios";
import "./SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();   // ⭐ ADD THIS

  const handleSearch = async () => {
    setMessage("");

    if (!query.trim()) {
      setMessage("Please enter a search term.");
      return;
    }

    try {
      const results = await searchSongs(query);
      setSongs(results);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch songs.");
    }
  };

  // ⭐ WHEN USER CLICKS A SONG -> OPEN SongPage.js
  const openSongPage = (song) => {
    navigate(`/song/${song.trackId}`, { state: { song } });
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search Songs</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {message && <p className="search-message">{message}</p>}

      <div className="song-list">
        {songs.map((song) => (
          <div
            key={song.trackId}
            className="song-item"
            onClick={() => openSongPage(song)}   // ⭐ CLICK SONG TO OPEN Player Page
            style={{ cursor: "pointer" }}
          >
            <img
              src={song.artworkUrl100}
              alt="album cover"
              className="song-image"
            />

            <div className="song-info">
              <h4>{song.trackName}</h4>
              <p>{song.artistName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
