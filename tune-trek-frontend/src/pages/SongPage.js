import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addSongToPlaylist } from "../utils/playlistStorage";
import "./SongPage.css";

function SongPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Songs passed from Search / Playlist
  const songs = state?.songs || [];
  const startIndex = state?.index || 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // If opened directly without song data
  useEffect(() => {
    if (!songs.length) {
      navigate("/search");
    }
  }, [songs, navigate]);

  const currentSong = songs[currentIndex];

  /* ▶️ Play / Pause */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /* ⏮ Previous */
  const prevSong = () => {
    if (!songs.length) return;
    const prevIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
    setProgress(0);
  };

  /* ⏭ Next */
  const nextSong = () => {
    if (!songs.length) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
    setProgress(0);
  };

  /* Progress bar update */
  const updateProgress = () => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  /* Auto play on song change */
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="song-container">
      {/* 🎵 Album Art */}
      <img
        src={currentSong.artworkUrl100.replace("100x100", "500x500")}
        alt="album"
        className="album-img"
      />

      {/* 🎶 Song Info */}
      <h2 className="song-title">{currentSong.trackName}</h2>
      <p className="artist-name">{currentSong.artistName}</p>

      {/* ➕ Add to Playlist */}
      <button
        className="btn btn-outline-primary mt-3"
        onClick={() => {
          addSongToPlaylist(currentSong);
          alert(`"${currentSong.trackName}" added to My Playlist`);
        }}
      >
        ➕ Add to Playlist
      </button>

      {/* ⏱ Progress Bar */}
      <input
        type="range"
        className="seek-bar"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => {
          const newValue = e.target.value;
          setProgress(newValue);

          if (audioRef.current && audioRef.current.duration) {
            const newTime =
              (newValue / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
          }
        }}
      />

      {/* ▶️ Controls */}
      <div className="player-controls">
        <button className="control-btn" onClick={prevSong}>
          ⏮
        </button>
        <button className="play-btn-big" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button className="control-btn" onClick={nextSong}>
          ⏭
        </button>
      </div>

      {/* 🔊 Audio */}
      <audio
        ref={audioRef}
        src={currentSong.previewUrl}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />
    </div>
  );
}

export default SongPage;
