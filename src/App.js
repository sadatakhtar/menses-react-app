import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from './pages/RegisterPage'
import FirebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import FirstPage from "./pages/FirstPage";
import SigninPage from "./pages/SigninPage";
import ContactPage from "./pages/ContactPage";
import NewCyclePage from "./pages/NewCyclePage";


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
 console.log(`user fron App.js --> ${user}`)
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/established-entry" element={<ContactPage />} />
      <Route path="/new-entry" element={<NewCyclePage />} />
    </Routes>
  );
};

export default App;
