import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../api/playlistApi";

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch playlists on page load
  const fetchData = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Playlists</h2>

      {loading ? (
        <p>Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <p>No playlists created yet.</p>
      ) : (
        <div className="mt-3">
          {playlists.map((pl) => (
            <div key={pl._id} className="card mb-3 p-3">
              <h5>{pl.name}</h5>
              <p>{pl.songs.length} songs</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistsPage;
