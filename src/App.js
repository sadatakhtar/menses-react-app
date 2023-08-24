import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
// eslint-disable-next-line
import Signin from "./components/auth/Signin";
// import AddCycleDetailsForm from "./components/general/AddCycleDetailsForm";
// import Header from "./components/general/Header";
import FirebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import FirstPage from "./pages/FirstPage";
import SigninPage from "./pages/SigninPage";
// import MainPage from './pages/MainPage'

const App = () => {
  const [user, setUser] = useState(null);

  FirebaseAuthService.checkAuthChanges(setUser);

  const handleAddCycleDetails = async (newDetails) => {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "cycle_details",
        newDetails
      );

      // TODO: fetch new cycle details from firestore

      alert(`Successfully added cycle details with ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FirstPage
            user={user}
            handleAddCycleDetails={handleAddCycleDetails}
          />
        }
      />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
