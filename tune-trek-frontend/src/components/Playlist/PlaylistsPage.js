import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../api/playlistApi";
import PlaylistSongs from "./PlaylistSongs";

function PlaylistsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaylist = async () => {
    try {
      const data = await getPlaylists(); // ✅ already res.data

      console.log("PLAYLIST DATA:", data); // 🔍 debug

      if (data.length > 0) {
        setSongs(data[0].songs || []); // ✅ CORRECT FIX
      } else {
        setSongs([]);
      }
    } catch (error) {
      console.error("Failed to load playlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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