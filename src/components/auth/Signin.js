import React, { useState } from "react";
import '../../styles/Signin.css'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(`User Credential: ${userCredential}`)
    })
    .catch((error) => {
        console.error(error.message)
    })

  }
  console.log(`Email: ${email}`);
  console.log(`Pass: ${password}`);
  return (
    <div className="signin_container">
      <form onSubmit={handleSignIn}>
        <h1>Log in to your Account</h1>
        <div className="inputs_container">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        </div>
       
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Signin;
