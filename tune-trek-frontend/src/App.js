import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Layout/Navbar";

// Auth
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Pages
import ExplorePage from "./components/Explore/ExplorePage";
import SearchPage from "./components/Search/SearchPage";
import PlaylistsPage from "./components/Playlist/PlaylistsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
