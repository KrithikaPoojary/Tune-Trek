import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSongs } from "../../api/axios";

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

      // ✅ SAFETY CHECK
      const safeResults = Array.isArray(results) ? results : [];

      setSongs(safeResults);

      if (safeResults.length === 0) {
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
    <div className="container mt-4">
      <h2>Search Songs</h2>

      {/* 🔍 SEARCH BOX */}
      <div className="search-box mb-4">
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

      {/* ⚠ MESSAGE */}
      {message && <div className="text-danger mb-3">{message}</div>}

      {/* 🎵 SONG LIST */}
      <div className="row">
        {songs.map((song, index) => (
          <div
            key={song.id}   // ✅ FIXED
            className="col-md-3 col-sm-6 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => openSongPage(index)}
          >
            <div className="song-card h-100 text-center shadow-sm">
              
              {/* ✅ FIXED IMAGE */}
              <img
                src={song.image}
                alt={song.title}
                style={{
                  height: "180px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                {/* ✅ FIXED TITLE */}
                <h6>{song.title}</h6>

                {/* ✅ FIXED ARTIST */}
                <p className="text-muted">{song.artist}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;