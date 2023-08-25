import React, { useState } from "react";
import "../../styles/Header.css";
import FirebaseAuthService from "../../FirebaseAuthService";
import { Link } from "react-router-dom";

const Header = ({ existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await FirebaseAuthService.loginUser(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSendResetPasswordEmail = async () => {
    if (!email) {
      alert("Missing user email!");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(email);
      alert(`Sent the password reset email to ${email}`);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <h1><span>C</span>ycle<span>S</span>ync</h1>
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
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: "none", color: "black", fontWeight: '300' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black", fontWeight: '300' }}
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "black", fontWeight: '300' }}
              >
                Contact
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            <div className="signin-container">
              {existingUser ? (
                <div className="welcome-container">
                  <h3 className="text-style">Welcome, {existingUser.email}</h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Username (email)"
                  />

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mt-2 mb-2"
                    placeholder="Password"
                  />

                  <div className="btn-container">
                    <button className="btn btn-primary">Login</button>
                    <button
                      type="button"
                      onClick={handleSendResetPasswordEmail}
                      className="btn btn-primary"
                    >
                      Reset Password
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleLoginWithGoogle}
                    >
                      Login with Google
                    </button>
                  </div>
                </form>
              )}
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
