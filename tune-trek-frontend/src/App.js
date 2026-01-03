import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SongPage from "./pages/SongPage";

import SearchPage from "./components/Search/SearchPage";
import ExplorePage from "./components/Explore/ExplorePage";
import PlaylistsPage from "./components/Playlist/PlaylistsPage";
import PlaylistSongs from "./components/Playlist/PlaylistSongs";
import ProfilePage from "./components/Profile/ProfilePage";

import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Explore */}
        <Route path="/explore" element={<ExplorePage />} />

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* Playlists */}
        <Route path="/playlists" element={<PlaylistsPage />} />

        {/* Playlist Songs */}
        <Route path="/playlist/:name" element={<PlaylistSongs />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Full Screen Player */}
        <Route path="/song" element={<SongPage />} />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
