import React, { useState } from "react";
import PropType from "prop-types"
import { Link } from "react-router-dom";

function TopMenu({ lessonTitle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("home");

  const toggleMenu = (name) => {
    if (name !== "toggle") {
      setCurrentLink(name);
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            id="navbar-toggle"
            onClick={() => toggleMenu("toggle")}
            // data-bs-toggle="offcanvas"
            // data-bs-target="#navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          { lessonTitle !== undefined ? 
            <h5 style={{ color: "white" }}>This is Module 1</h5> : ""
          }
          <button
            type="button"
            className="p-0 btn"
            style={{ color: "white", fontSize: "1.8em" }}
          >
            <span className="bi bi-box-arrow-right" />
          </button>
          <div
            className={`offcanvas offcanvas-start ${
              menuOpen ? "showing" : "hiding"
            } text-bg-dark`}
            id="navbarNav"
            data-bs-backdrop="false"
            data-bs-scroll="true"
          >
            <div className="offcanvas-header">
              <h4 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Python LMS
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => toggleMenu("toggle")}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to="/home"
                    className={`nav-link ${
                      currentLink === "home" ? "active" : ""
                    }`}
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("home")}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link ${
                      currentLink === "dashboard" ? "active" : ""
                    }`}
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("dashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/modules"
                    className={`nav-link ${ currentLink === "modules" ? "active" : "" }`}
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("modules")}
                  >
                    Modules
                  </Link>
                </li>
                {/* <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Schedule</a>
            </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${ currentLink === "settings" ? "active" : "" }`}
                    to="/"
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("settings")}
                  >
                    Settings
                  </Link>
                </li>
                {/* <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Notification</a>
            </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${ currentLink === "profile" ? "active" : "" }`}
                    to="/"
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("profile")}
                  >
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${ currentLink === "logout" ? "active" : "" }`}
                    to="/"
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("logout")}
                  >
                    Log Out
                  </Link>
                </li>
                {/* <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Help & Support</a>
            </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

TopMenu.propTypes = {
  lessonTitle: PropType.string,
}

export default TopMenu;
