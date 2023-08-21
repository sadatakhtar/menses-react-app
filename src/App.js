import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// eslint-disable-next-line
import AuthDetails from "./components/auth/AuthDetails";
import Register from "./pages/RegisterPage";
import Signin from "./pages/SigninPage";

import { useSelector } from 'react-redux'
import { getUserStatus, getValue } from './features/usersJourney/UserSlice'

function App() {
  // TODO: both cstates below are for testing purposes only and can be removed.
  const userStatusRedux = useSelector(getUserStatus);
  const valueRedux = useSelector(getValue)

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Create an Account</Link>
          </li>
          <li>
            <Link>
              <AuthDetails />
            </Link>
          </li>
          <li>
            {userStatusRedux}
          </li>
          <li>{valueRedux}</li>
        </ul>
      </nav>
      <Routes>
        {/* <Route path="/" exact component={} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
