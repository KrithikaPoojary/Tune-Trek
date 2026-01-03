import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const openCategory = (keyword) => {
    navigate(`/search?query=${keyword}`);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">🎧 Welcome to TuneTrek</h1>

      <p className="lead mb-4">
        Discover music by mood, search tracks, and create playlists!
      </p>

      <div className="d-flex justify-content-center gap-3 mb-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/search")}
        >
          🔍 Search Songs
        </button>

        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => navigate("/explore")}
        >
          🎵 Explore Songs
        </button>
      </div>

      <hr />

      {/* MUSIC CATEGORIES */}
      <h4 className="mt-4 mb-3">🎶 Music Categories</h4>

      <div className="d-flex justify-content-center flex-wrap gap-3">
        <button
          className="btn btn-light border"
          onClick={() => openCategory("love")}
        >
          ❤️ Romantic
        </button>

        <button
          className="btn btn-light border"
          onClick={() => openCategory("party")}
        >
          🎉 Party
        </button>

        <button
          className="btn btn-light border"
          onClick={() => openCategory("lofi")}
        >
          😌 Chill
        </button>

        <button
          className="btn btn-light border"
          onClick={() => openCategory("workout")}
        >
          💪 Workout
        </button>
      </div>
    </div>
  );
}

export default Home;
