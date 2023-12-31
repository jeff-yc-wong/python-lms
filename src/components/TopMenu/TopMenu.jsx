import React, { useState, useEffect, useRef } from "react";
import PropType from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./TopMenu.css";

function TopMenu({ lessonTitle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const wrapperRef = useRef(null);
  const url = useLocation();

  let currentLink = url["pathname"].slice(1);
  const toggleMenu = (name) => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        wrapperRef.current.contains(event.target) &&
        event.target.tagName === "A"
      ) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }

    setMenuOpen(!menuOpen);
    if (name === "logout") {
      handleSignOut();
    } else if (name === "toggle") {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
    }
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  useEffect(() => {
    const auth = getAuth();

    let unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <nav id="topmenu" className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid align-items-center">
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
          {lessonTitle !== undefined ? (
            <h5 style={{ color: "white" }}>This is Module 1</h5>
          ) : (
            ""
          )}
          {user != null ? (
            <button
              type="button"
              className="p-0 btn"
              onClick={handleSignOut}
              style={{ color: "white", fontSize: "1.8em" }}
            >
              <span className="bi bi-box-arrow-right" />
            </button>
          ) : (
            ""
          )}
          <div
            ref={wrapperRef}
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
                {/* <li className="nav-item">
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
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/lessons"
                    className={`nav-link ${
                      currentLink === "lessons" ? "active" : ""
                    }`}
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("lessons")}
                  >
                    Lessons
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    to="/modules"
                    className={`nav-link ${
                      currentLink === "modules" ? "active" : ""
                    }`}
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("modules")}
                  >
                    Modules
                  </Link>
                </li> */}
                {/* <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Schedule</a>
            </li> */}
                {/* <li className="nav-item">
                  <Link
                    className={`nav-link ${ currentLink === "settings" ? "active" : "" }`}
                    to="/"
                    style={{ fontSize: "20px", margin: "10px" }}
                    onClick={() => toggleMenu("settings")}
                  >
                    Settings
                  </Link>
                </li> */}
                {/* <li className="nav-item">
              <a className="nav-link" href="#" style={{ fontSize: '20px', margin: '20px' }}>Notification</a>
            </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      currentLink === "profile" ? "active" : ""
                    }`}
                    state={null}
                    to="/editor"
                    style={{ fontSize: "20px", margin: "10px" }}
                    reload="true"
                    onClick={() => toggleMenu("profile")}
                  >
                    Sandbox
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      currentLink === "logout" ? "active" : ""
                    }`}
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
};

export default TopMenu;
