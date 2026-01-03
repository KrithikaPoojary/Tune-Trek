import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSongs } from "../api/axios"; // adjust path if needed

function Home() {
  const navigate = useNavigate();

  // Category states
  const [chillSongs, setChillSongs] = useState([]);
  const [romanticSongs, setRomanticSongs] = useState([]);
  const [partySongs, setPartySongs] = useState([]);
  const [workoutSongs, setWorkoutSongs] = useState([]);
  const [sadSongs, setSadSongs] = useState([]);
  const [happySongs, setHappySongs] = useState([]);
  const [focusSongs, setFocusSongs] = useState([]);
  const [sleepSongs, setSleepSongs] = useState([]);

  useEffect(() => {
    loadHomeSongs();
  }, []);

  const loadHomeSongs = async () => {
    try {
      const chill = await searchSongs("lofi");
      const romantic = await searchSongs("love");
      const party = await searchSongs("party");
      const workout = await searchSongs("workout");
      const sad = await searchSongs("sad");
      const happy = await searchSongs("happy");
      const focus = await searchSongs("study");
      const sleep = await searchSongs("sleep");

      setChillSongs(chill.slice(0, 8));
      setRomanticSongs(romantic.slice(0, 8));
      setPartySongs(party.slice(0, 8));
      setWorkoutSongs(workout.slice(0, 8));
      setSadSongs(sad.slice(0, 8));
      setHappySongs(happy.slice(0, 8));
      setFocusSongs(focus.slice(0, 8));
      setSleepSongs(sleep.slice(0, 8));
    } catch (error) {
      console.error("Error loading home page songs", error);
    }
  };

  const openSongPage = (songs, index) => {
    navigate("/song", {
      state: { songs, index },
    });
  };

  const renderCategory = (title, songs) => (
    <>
      <h4 className="mt-5 mb-3">{title}</h4>
      <div className="row">
        {songs.map((song, index) => (
          <div
            key={song.trackId}
            className="col-md-3 mb-4"
            style={{ cursor: "pointer" }}
            onClick={() => openSongPage(songs, index)}
          >
            <div className="card h-100 text-center shadow-sm">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="card-img-top"
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
    </>
  );

  return (
    <div className="container mt-5">
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1>🎧 Welcome to TuneTrek</h1>
        <p className="lead">
          Discover music by mood, search tracks, and create playlists!
        </p>
      </div>

      {/* CATEGORIES */}
      {renderCategory("😌 Chill Songs", chillSongs)}
      {renderCategory("❤️ Romantic Songs", romanticSongs)}
      {renderCategory("🎉 Party Songs", partySongs)}
      {renderCategory("💪 Workout Songs", workoutSongs)}
      {renderCategory("😔 Sad Songs", sadSongs)}
      {renderCategory("😊 Happy Songs", happySongs)}
      {renderCategory("📚 Focus / Study", focusSongs)}
      {renderCategory("🌙 Sleep & Relax", sleepSongs)}
    </div>
  );
}

export default Home;
