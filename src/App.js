// import React, { useState } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// // import { signOut } from "firebase/auth";
// // import firebase from './firebase'
// // eslint-disable-next-line
// import AuthDetails from "./components/auth/AuthDetails";
// import Register from "./pages/RegisterPage";
// import Signin from "./pages/SigninPage";
// import FirebaseAuthService from "./FirebaseAuthService";

import React, { useState } from "react";
import Signin from './components/auth/Signin'
import FirebaseAuthService from "./FirebaseAuthService";

const App = () => {
  const [user, setUser] = useState(null);

  FirebaseAuthService.checkAuthChanges(setUser)
  return <div>
    <h1>CycleSync</h1>
    <Signin existingUser={user}/>
  </div>;
};

export default App;
