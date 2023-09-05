import React from "react";
import { Link } from "react-router-dom";
import "../../styles/HeaderWithoutInputs.css";
import LoggedIn from "./LoggedIn";
import firebase from "../../FirebaseConfig";
import { RingLoader } from "react-spinners";

const HeaderWithoutInputs = () => {
  const user = firebase.auth().currentUser;
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <h1>
            <span style={{ color: '#c5b9ad'}}>C</span>ycle<span>S</span>ync
          </h1>

          <RingLoader color="#fafefe" size={60} />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item custom-nav-item">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "300",
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "300",
                  }}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "300",
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <span className="navbar-text">{user ? <LoggedIn /> : ""}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderWithoutInputs;
