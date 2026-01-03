import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSongs } from "../../api/axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read query from URL
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

  // Auto search when coming from Home / Explore
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
    <div className="container mt-4">
      <h2>Search Songs</h2>

      {/* 🔍 SEARCH BAR + BUTTON INLINE */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by song name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() => handleSearch()}
          style={{ whiteSpace: "nowrap" }}
        >
          Search
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* SONG LIST */}
      <div className="row">
        {songs.map((song, index) => (
          <div
            key={song.trackId}
            className="col-md-3 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => openSongPage(index)}
          >
            <div className="card h-100 text-center shadow-sm">
              <img
                src={song.artworkUrl100}
                className="card-img-top"
                alt={song.trackName}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6 className="card-title">{song.trackName}</h6>
                <p className="card-text text-muted">
                  {song.artistName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
