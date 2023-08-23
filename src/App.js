import React, { useState } from "react";
// eslint-disable-next-line
import Signin from "./components/auth/Signin";
import AddCycleDetailsForm from "./components/general/AddCycleDetailsForm";
import Header from "./components/general/Header";
import FirebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

const App = () => {
  const [user, setUser] = useState(null);

  FirebaseAuthService.checkAuthChanges(setUser);

  const handleAddCycleDetails = async (newDetails) => {
    try {
      const response = await FirebaseFirestoreService.createDocument('cycle_details', newDetails);

      // TODO: fetch new cycle details from firestore

      alert(`Successfully added cycle details with ID = ${response.id}`)
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <>
      <div>
        {/* <Signin existingUser={user} /> */}
        <Header existingUser={user}/>
      </div>
      <div>
        <AddCycleDetailsForm handleAddCycleDetails={handleAddCycleDetails}/>
      </div>
    </>
  );
};

export default App;
