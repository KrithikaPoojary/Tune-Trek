import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./components/Search/SearchPage";
import PlaylistsPage from "./components/Playlist/PlaylistsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import SongPage from "./pages/SongPage";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* 🔥 new route for full-screen player */}
        <Route path="/song" element={<SongPage />} />
        {/* any unknown route -> home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
