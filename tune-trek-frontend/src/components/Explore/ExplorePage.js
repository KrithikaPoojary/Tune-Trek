import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSongs } from "../../api/axios";

function ExplorePage() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW STATE for Load More
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = [
    { title: "Chill", query: "chill" },
    { title: "Romantic Songs", query: "romantic" },
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

      // 🔥 RESET visible count when new category selected
      setVisibleCount(12);

      const results = await searchSongs(category.query);

      setSongs(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Error loading explore songs", error);
      setSongs([]);
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

      {/* LOADING */}
      {loading && <p>Loading songs...</p>}

      {/* EMPTY */}
      {!loading && songs.length === 0 && selectedCategory && (
        <p className="text-muted">No songs found 😢</p>
      )}

      {/* SONG LIST */}
      {!loading && songs.length > 0 && (
        <>
          <h4 className="mb-3">{selectedCategory}</h4>

          <div className="row">
            {songs.slice(0, visibleCount).map((song, index) => (
              <div
                key={song.id}
                className="col-md-3 mb-4"
                style={{ cursor: "pointer" }}
                onClick={() => openSongPage(index)}
              >
                <div className="card h-100 text-center shadow-sm">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{song.title}</h6>
                    <p className="card-text text-muted">
                      {song.artist}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 LOAD MORE BUTTON */}
          {visibleCount < songs.length && (
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => setVisibleCount(prev => prev + 12)}
              >
                Load More 🎵
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExplorePage;