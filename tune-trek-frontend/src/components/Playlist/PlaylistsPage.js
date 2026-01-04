import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../api/playlistApi";
import PlaylistSongs from "./PlaylistSongs";

function PlaylistsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await getPlaylists();

        // Default playlist (first one)
        if (res.data.length > 0) {
          setSongs(res.data[0].songs);
        }
      } catch (error) {
        console.error("Failed to load playlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Playlist</h2>

      {loading ? (
        <p className="mt-3">Loading playlist...</p>
      ) : songs.length === 0 ? (
        <p className="text-muted mt-3">
          🎵 No songs yet. Add some from Search.
        </p>
      ) : (
        <PlaylistSongs songs={songs} />
      )}
    </div>
  );
}

export default PlaylistsPage;
