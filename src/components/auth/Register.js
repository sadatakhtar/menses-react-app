import React, { useState } from "react";
import "../../styles/Register.css";
import FirebaseAuthService from "../../FirebaseAuthService";
import firebase from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = ({ existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await FirebaseAuthService.registerUser(email, password);

      // NB: create a document in DB upon user registration
      try {
        const user = firebase.auth().currentUser;
        // console.log('=====>>>>', user)
        if (user) {
          const db = firebase.firestore();
          const userRef = db.collection("users").doc(user.uid);
          const userDoc = await userRef.get();

          if (!userDoc.exists) {
            await userRef.set({
              firstTimeLoggedIn: true,
              email: user.email,
              name: user.displayName,
              document_id: user.uid,
              user_registered_date: new Date(),
            });
            console.log("User document created upon signup");
          } else {
            console.log("User document alreadt exists");
          }
        }
      } catch (error) {
        console.error("Error encountered during signup: ", error);
      }

      setEmail("");
      setPassword("");
      // TODO: redirect to seperate login page when developed ('/login')
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleSignUpWithGoogle = async () => {
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
            navigate("/");
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

  const pageModel = (
    <div>
      {existingUser ? (
        <div>
          <h3>Welcome, {existingUser.email}</h3>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="register-form-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-2 mb-2"
              placeholder="Email"
            />

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-2 mb-2"
              placeholder="Password"
            />

            <div className="register-btn-container">
              <button className="btn btn-primary">Register with email</button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSignUpWithGoogle}
              >
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  return pageModel;
};

export default Register;
