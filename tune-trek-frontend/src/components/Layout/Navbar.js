import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg px-4 gradient-navbar">
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        🎧 TuneTrek
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto gap-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/explore">
              Explore
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/playlists">
              Playlists
            </NavLink>
          </li>
        </ul>

        {/* Login & Register buttons removed */}
      </div>
    </nav>
  );
}

export default Navbar;
