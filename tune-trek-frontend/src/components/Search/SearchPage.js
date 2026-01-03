import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSongs } from "../../api/axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ Read query from URL (category click)
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

  // ✅ AUTO SEARCH when coming from Home category
  useEffect(() => {
    if (defaultQuery) {
      setQuery(defaultQuery);
      handleSearch(defaultQuery);
    }
  }, [defaultQuery]);

  const openSongPage = (index) => {
    navigate("/song", {
      state: {
        songs,
        index,
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Search Songs</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={() => handleSearch()}>
        Search
      </button>

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
            <div className="card h-100 text-center">
              <img
                src={song.artworkUrl100}
                className="card-img-top"
                alt={song.trackName}
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
