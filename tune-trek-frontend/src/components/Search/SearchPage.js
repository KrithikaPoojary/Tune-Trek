import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSongs } from "../../api/axios";
import { addSongToPlaylist } from "../../utils/playlistStorage";
import "./SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultQuery = searchParams.get("query");

  const handleSearch = async (searchText) => {
    const finalQuery = searchText || query;

    setMessage("");
    if (!finalQuery || !finalQuery.trim()) {
      setMessage("Please enter a search term.");
      return;
    }

    try {
      const results = await searchSongs(finalQuery);
      setSongs(results);

      if (results.length === 0) {
        setMessage("No songs found.");
      }
    } catch (err) {
      console.error("Error searching songs:", err);
      setMessage("Failed to fetch songs.");
    }
  };

  useEffect(() => {
    if (defaultQuery) {
      setQuery(defaultQuery);
      handleSearch(defaultQuery);
    }
  }, [defaultQuery]);

  const openSongPage = (index) => {
    navigate("/song", {
      state: { songs, index },
    });
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search Songs</h2>

      {/* 🔍 Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by song name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={() => handleSearch()}>
          Search
        </button>
      </div>

      {message && <div className="search-message">{message}</div>}

      {/* 🎵 Songs Grid */}
      <div className="row">
        {songs.map((song, index) => (
          <div
            key={song.trackId}
            className="col-md-3 col-sm-6 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => openSongPage(index)}
          >
            <div className="song-card h-100 text-center">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="song-card-img"
              />

              <div className="card-body">
                <h6>{song.trackName}</h6>
                <p>{song.artistName}</p>

                {/* ➕ Add to Playlist */}
                <button
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSongToPlaylist(song);
                    alert(`"${song.trackName}" added to playlist`);
                  }}
                >
                  ➕ Add to Playlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
