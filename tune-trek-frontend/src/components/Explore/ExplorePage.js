import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSongs } from "../../api/axios";

function ExplorePage() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ SAME categories as Home page
  const categories = [
    { title: "Chill", query: "lofi" },
    { title: "Romantic Songs", query: "love" },
    { title: "Party Songs", query: "party" },
    { title: "Workout Songs", query: "workout" },
    { title: "Sad Songs", query: "sad" },
    { title: "Happy Songs", query: "happy" },
    { title: "Focus / Study", query: "study" },
    { title: "Sleep & Relax", query: "sleep" },
  ];

  const loadCategorySongs = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category.title);
      const results = await searchSongs(category.query);
      setSongs(results.slice(0, 12));
    } catch (error) {
      console.error("Error loading explore songs", error);
    } finally {
      setLoading(false);
    }
  };

  const openSongPage = (index) => {
    navigate("/song", {
      state: { songs, index },
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Explore by Category</h2>

      {/* CATEGORY BUTTONS */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.title}
            className={`btn ${
              selectedCategory === cat.title
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => loadCategorySongs(cat)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && songs.length === 0 && (
        <p className="text-muted">
          Select a category to explore songs 🎶
        </p>
      )}

      {/* LOADING */}
      {loading && <p>Loading songs...</p>}

      {/* SONG LIST */}
      {!loading && songs.length > 0 && (
        <>
          <h4 className="mb-3">{selectedCategory}</h4>
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
                    alt={song.trackName}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      {song.trackName}
                    </h6>
                    <p className="card-text text-muted">
                      {song.artistName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ExplorePage;
