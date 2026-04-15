import React, { useRef, useState, useEffect, useMemo } from "react";
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

  // ✅ FIX: stable songs reference
  const songs = useMemo(() => state?.songs || [], [state]);

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

  // ❗ Safety check AFTER hooks
  if (!currentSong) return null;

  // 🎮 PLAY / PAUSE
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  // ⏮ PREVIOUS
  const prevSong = () => {
    setCurrentIndex(
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1
    );
    setProgress(0);
  };

  // ⏭ NEXT
  const nextSong = () => {
    setCurrentIndex((currentIndex + 1) % songs.length);
    setProgress(0);
  };

  // 🎚 PROGRESS UPDATE
  const updateProgress = () => {
    if (!audioRef.current?.duration) return;

    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  };

const handleAddToPlaylist = async () => {
  try {
    const playlists = await getPlaylists(); // ✅ FIX

    if (!playlists || playlists.length === 0) {
      alert("No playlist found ❌");
      return;
    }

    const playlistId = playlists[0]._id; // ✅ FIX

    const songData = {
      trackId: currentSong.id,
      trackName: currentSong.title,
      artistName: currentSong.artist,
      artworkUrl100: currentSong.image,
      previewUrl: currentSong.audio
    };

    console.log("Sending:", songData); // 🔍 debug

    await addSongToPlaylist(playlistId, songData);

    alert("Song added to playlist ✅");

  } catch (err) {
    console.error("Add playlist error:", err);
    alert("Failed to add song ❌");
  }
};

  return (
    <div className="song-container">

      {/* 🎵 IMAGE */}
      <img
        src={currentSong.image}
        alt="album"
        className="album-img"
      />

      {/* 🎵 INFO */}
      <div className="song-info">
        <h2 className="song-title">{currentSong.title}</h2>
        <p className="artist-name">{currentSong.artist}</p>

        <button
          className="add-playlist-btn"
          onClick={handleAddToPlaylist}
        >
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