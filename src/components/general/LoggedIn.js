import React from "react";
import '../../styles/LoggedIn.css'
import { useNavigate } from "react-router-dom";
import firebase from "../../FirebaseConfig";
import FirebaseAuthService from "../../FirebaseAuthService";

const LoggedIn = () => {
  const user = firebase.auth().currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
    navigate("/");
  };
  return (
    <div className="welcome-container">
      <h3 className="text-style">Welcome, {user?.email}</h3>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LoggedIn;
