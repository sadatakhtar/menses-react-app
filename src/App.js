import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// eslint-disable-next-line
import AuthDetails from "./components/auth/AuthDetails";
import Register from "./pages/RegisterPage";
import Signin from "./pages/SigninPage";

function App() {
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
