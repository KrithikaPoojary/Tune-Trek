import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPlaylists,
  addSongToPlaylist
} from "../api/playlistApi";
import "./SongPage.css";

function SongPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const songs = state?.songs || [];
  const startIndex = state?.index || 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = songs[currentIndex];

  // ✅ Redirect if no songs
  useEffect(() => {
    if (!songs.length) {
      navigate("/search");
    }
  }, [songs, navigate]);

  // ✅ Auto play when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentIndex, currentSong]);

  // ❗ AFTER hooks (IMPORTANT FIX)
  if (!currentSong) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const prevSong = () => {
    setCurrentIndex(
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1
    );
    setProgress(0);
  };

  const nextSong = () => {
    setCurrentIndex((currentIndex + 1) % songs.length);
    setProgress(0);
  };

  const updateProgress = () => {
    if (!audioRef.current?.duration) return;

    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  };

  const handleAddToPlaylist = async () => {
    try {
      const res = await getPlaylists();
      const playlistId = res.data[0]._id;
      await addSongToPlaylist(playlistId, currentSong);
      alert("Song added to MongoDB playlist");
    } catch (err) {
      console.error(err);
      alert("Failed to add song");
    }
  };

  return (
    <div className="song-container">

      {/* 🎵 IMAGE */}
      <img
        src={currentSong.image?.replace("100x100", "400x400")}
        alt="album"
        className="album-img"
      />

      <div className="song-info">
        <h2 className="song-title">{currentSong.title}</h2>
        <p className="artist-name">{currentSong.artist}</p>

        <button className="add-playlist-btn" onClick={handleAddToPlaylist}>
          ➕ Add to Playlist
        </button>
      </div>

      {/* 🎚 SEEK BAR */}
      <input
        type="range"
        className="seek-bar"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => {
          const value = e.target.value;
          setProgress(value);

          if (audioRef.current?.duration) {
            audioRef.current.currentTime =
              (value / 100) * audioRef.current.duration;
          }
        }}
      />

      {/* 🎮 CONTROLS */}
      <div className="player-controls">
        <button className="control-btn" onClick={prevSong}>⏮</button>
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button className="control-btn" onClick={nextSong}>⏭</button>
      </div>

      {/* 🔊 AUDIO */}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />

    </div>
  );
}

export default SongPage;