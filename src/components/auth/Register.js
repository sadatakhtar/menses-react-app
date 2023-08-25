import React, { useState } from "react";
import "../../styles/Register.css";
import FirebaseAuthService from "../../FirebaseAuthService";
import { useNavigate } from "react-router-dom";

const Register = ({ existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await FirebaseAuthService.registerUser(email, password);
      setEmail("");
      setPassword("");
      navigate("/login");
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
      alert("Successfully created an account.");
      navigate("/login");
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
              <button className="btn btn-primary">
                Register with email & password
              </button>
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
