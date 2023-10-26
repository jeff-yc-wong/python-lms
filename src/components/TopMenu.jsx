import React from 'react';
import { Link } from 'react-router-dom';

const TopMenu = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/modules" className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Modules</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Schedule</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Notification</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>My Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Log Out</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Help & Support</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopMenu;