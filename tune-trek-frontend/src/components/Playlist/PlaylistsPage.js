import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylistSongs } from "../../utils/playlistStorage";

function PlaylistsPage() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playlistSongs = getPlaylistSongs();
    setSongs(playlistSongs);
  }, []);

  const openSong = (index) => {
    navigate("/song", {
      state: {
        songs,
        index,
      },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Your Playlist</h2>

      {songs.length === 0 ? (
        <p className="text-muted mt-3">
          🎵 No songs yet. Add some from Search.
        </p>
      ) : (
        <div className="row mt-4">
          {songs.map((song, index) => (
            <div
              key={song.trackId}
              className="col-md-3 mb-4"
              style={{ cursor: "pointer" }}
              onClick={() => openSong(index)}
            >
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={song.artworkUrl100}
                  className="card-img-top"
                  alt={song.trackName}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6>{song.trackName}</h6>
                  <p className="text-muted">{song.artistName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistsPage;
