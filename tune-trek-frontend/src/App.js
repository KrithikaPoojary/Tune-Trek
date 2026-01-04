import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SongPage from "./pages/SongPage";

import SearchPage from "./components/Search/SearchPage";
import ExplorePage from "./components/Explore/ExplorePage";
import PlaylistsPage from "./components/Playlist/PlaylistsPage";
import PlaylistSongs from "./components/Playlist/PlaylistSongs";

import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <Router>
      <div className="app-gradient">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlist/:name" element={<PlaylistSongs />} />
          <Route path="/song" element={<SongPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
