import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from './pages/RegisterPage'
import FirebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import FirstPage from "./pages/FirstPage";
import SigninPage from "./pages/SigninPage";
import ContactPage from "./pages/ContactPage";
import NewCyclePage from "./pages/NewCyclePage";
import EstablishedCyclePage from "./pages/EstablishedCyclePage";
import ConfusedCyclePage from "./pages/ConfusedCyclePage";
import ElderlyCyclePage from "./pages/ElderlyCyclePage";
import ConfirmationPage from "./pages/ConfirmationPage";


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
      <Route path="/established-entry" element={<EstablishedCyclePage />} />
      <Route path="/new-entry" element={<NewCyclePage />} />
      <Route path="/confused-entry" element={<ConfusedCyclePage />} />
      <Route path="/elderly-entry" element={<ElderlyCyclePage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
};

export default App;
