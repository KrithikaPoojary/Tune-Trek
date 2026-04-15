import React from "react";
import { useNavigate } from "react-router-dom";

function PlaylistSongs({ songs }) {
  const navigate = useNavigate();

  // ❌ Remove empty + invalid songs
  const validSongs = (songs || []).filter(
    (song) =>
      (song.trackId || song.id) &&
      (song.trackName || song.title) &&
      (song.artistName || song.artist)
  );

  // ❌ Remove duplicates (based on trackId)
  const uniqueMap = new Map();

  validSongs.forEach((song) => {
    const id = song.trackId || song.id;
    if (!uniqueMap.has(id)) {
      uniqueMap.set(id, song);
    }
  });

  const cleanSongs = Array.from(uniqueMap.values());

  // ❗ If nothing valid
  if (cleanSongs.length === 0) {
    return (
      <div className="text-center mt-4">
        <p>No songs added to playlist yet 🎵</p>
      </div>
    );
  }

  // 🎵 Navigate to player
  const openSong = (index) => {
    navigate("/song", {
      state: {
        songs: cleanSongs.map((song) => ({
          id: song.trackId || song.id,
          title: song.trackName || song.title,
          artist: song.artistName || song.artist,
          image: song.artworkUrl100 || song.image,
          audio: song.previewUrl || song.audio,
        })),
        index,
      },
    });
  };

  return (
    <div className="row mt-4">
      {cleanSongs.map((song, index) => {
        const id = song.trackId || song.id;
        const image =
          song.artworkUrl100 || song.image || "https://via.placeholder.com/300";
        const title = song.trackName || song.title;
        const artist = song.artistName || song.artist;

        return (
          <div
            key={id}
            className="col-md-3 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => openSong(index)}
          >
            <div className="card h-100 text-center shadow-sm song-card">
              <img
                src={image}
                className="card-img-top"
                alt={title}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p className="card-text text-muted">{artist}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlaylistSongs;