import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SongPage.css";

function SongPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // If user opens /song directly without state
  const songs = state?.songs || [];
  const startIndex = state?.index || 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // If no songs passed, go back to search
  useEffect(() => {
    if (!songs.length) {
      navigate("/search");
    }
  }, [songs, navigate]);

  const currentSong = songs[currentIndex];

  // Play / Pause
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

  // Previous song
  const prevSong = () => {
    if (!songs.length) return;
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
    setProgress(0);
  };

  // Next song
  const nextSong = () => {
    if (!songs.length) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
    setProgress(0);
  };

  // Progress bar update
  const updateProgress = () => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  // Auto play when song changes and isPlaying=true
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="song-container">
      {/* Album art */}
      <img
        src={currentSong.artworkUrl100.replace("100x100", "500x500")}
        alt="album"
        className="album-img"
      />

      {/* Title & artist */}
      <h2 className="song-title">{currentSong.trackName}</h2>
      <p className="artist-name">{currentSong.artistName}</p>

      {/* Progress bar */}
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
      const newTime = (newValue / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  }}
/>


      {/* Controls: only Prev / Play / Next */}
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

      {/* Audio element (hidden) */}
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
