import React, { useState } from "react";
import FirebaseAuthService from "../../FirebaseAuthService";

const Signin = ({ existingUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
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

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message)
    }

  }

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
        <form onSubmit={handleSubmit}>
          <label>
            Username (email):
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button>Login</button>
            <button type="button" onClick={handleSendResetPasswordEmail}>
              Reset Password
            </button>
            <button type="button" onClick={handleLoginWithGoogle}>
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return pageModel;
};

export default Signin;
