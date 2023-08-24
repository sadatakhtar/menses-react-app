import React from "react";
import AddCycleDetailsForm from "../components/general/AddCycleDetailsForm";
import Header from "../components/general/Header";
import MainPage from "./MainPage";

const FirstPage = ({ user, handleAddCycleDetails }) => {
  
  return (
    <>
      <div>
        <Header existingUser={user} />
      </div>
      <div>
        {user ? (
          <AddCycleDetailsForm handleAddCycleDetails={handleAddCycleDetails} />
        ) : (
            <MainPage />
        )}
      </div>
    </>
  );
};

export default FirstPage;
