import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../api/axios";

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <p>No playlists yet.</p>
      ) : (
        playlists.map((pl) => (
          <div key={pl._id} className="card mb-3 p-3">
            <h5>{pl.name}</h5>
            <p>{pl.songs.length} songs</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PlaylistsPage;
