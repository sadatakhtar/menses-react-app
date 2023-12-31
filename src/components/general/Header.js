import React, { useState, useEffect } from "react";
import "../../styles/Header.css";
import FirebaseAuthService from "../../FirebaseAuthService";
import firebase from "../../FirebaseConfig";
import {
  setUserEmail,
  getUserEmail,
} from "../../features/usersJourney/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

const Header = ({ existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userEmailRedux = useSelector(getUserEmail);

  useEffect(() => {
    dispatch(setUserEmail(existingUser?.email));
    console.log("============> inside useEffect:", userEmailRedux);
  }, [existingUser, dispatch, userEmailRedux]);

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const db = firebase.firestore();
          const userRef = db.collection("users").doc(user.uid);

          // NB: Check if user doc already exists
          const userDoc = await userRef.get();
          if (!userDoc.exists) {
            // NB: set data only on first login
            await userRef.set({
              firstTimeLoggedIn: true,
              email: user.email,
              name: user.displayName,
              document_id: user.uid,
              user_registered_date: new Date(),
            });
            console.log("User document created upon Google signup");
            // navigate("/");
          } else {
            console.log("User document already exists");
          }
        }
      } catch (error) {
        console.error("Error encountered during Google signup: ", error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const user = firebase.auth().currentUser;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await FirebaseAuthService.loginUser(email, password);
      setEmail("");
      setPassword("");
      // navigate('/contact')
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
        <h1>
          <span style={{ color: "#c5b9ad" }}>C</span>ycle
          <span style={{ color: "#c5b9ad" }}>S</span>ync
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
            {user && (<li className="nav-item">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "300",
                }}
              >
                Dashboard
              </Link>
            </li>)}
            
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
