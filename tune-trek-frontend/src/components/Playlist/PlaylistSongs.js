import React from "react";
import { useNavigate } from "react-router-dom";

function PlaylistSongs({ songs }) {
  const navigate = useNavigate();

  // If no songs in playlist
  if (!songs || songs.length === 0) {
    return (
      <div className="text-center mt-4">
        <p>No songs added to playlist yet 🎵</p>
      </div>
    );
  }

  const openSong = (index) => {
    navigate("/song", {
      state: {
        songs,
        index,
      },
    });
  };

  return (
    <div className="row mt-4">
      {songs.map((song, index) => (
        <div
          key={song.trackId}
          className="col-md-3 mb-4"
          style={{ cursor: "pointer" }}
          onClick={() => openSong(index)}
        >
          <div className="card h-100 text-center shadow-sm song-card">
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
  );
}

export default PlaylistSongs;
