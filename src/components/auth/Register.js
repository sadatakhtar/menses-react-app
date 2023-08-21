import React, { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userDetails) => {
        console.log(userDetails);
        navigate('/signin')
        
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="signin_container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="inputs_container">
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
       
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
