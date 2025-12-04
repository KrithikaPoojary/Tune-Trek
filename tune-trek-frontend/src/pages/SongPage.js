import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./SongPage.css";

function SongPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const song = location.state?.song;

  if (!song) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Song not found</h2>;
  }

  return (
    <div className="song-page">
      <span className="back-btn" onClick={() => navigate(-1)}>← Back</span>

      <img className="cover-img" src={song.artworkUrl100.replace("100x100", "600x600")} alt="cover" />

      <h2 className="song-title">{song.trackName}</h2>
      <p className="song-artist">{song.artistName}</p>

      <progress className="progress-bar" value="30" max="100"></progress>

      <button className="play-btn">
        ⏸ Pause
      </button>

      <div className="player-wrapper">
        <audio controls autoPlay src={song.previewUrl} />
      </div>
    </div>
  );
}

export default SongPage;
