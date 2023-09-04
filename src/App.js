import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
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
import SecondPage from "./pages/SecondPage";
import FirstTimeMenuPage from "./pages/FirstTimeMenuPage";
import ConfirmEstablishedDetailsPage from "./pages/ConfirmEstablishedDetailsPage";
import OutputInitialResultsPage from "./pages/OutputInitialResultsPage";

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
      // (test if this is the best place to make this call?)

      alert(`Successfully added cycle details with ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  };
  console.log(`user fron App.js --> ${user?.email}`);
  return (
    <>
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
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/first-time" element={<FirstTimeMenuPage user={user} />} />c
        <Route path="/confirm-details" element={<ConfirmEstablishedDetailsPage />} />
        <Route path="/initial-results" element={<OutputInitialResultsPage />} />
      </Routes>
    </>
  );
};

export default App;
