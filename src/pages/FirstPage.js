import React from "react";
import Header from "../components/general/Header";
import MainPage from "./MainPage";
import WelcomePage from "./WelcomePage";

const FirstPage = ({ user }) => {
  return (
    <>
      <div>
        <Header existingUser={user} />
      </div>
      <div className="first-page-container">
        {user ? (
          <div>
            <WelcomePage user={user}/>
          </div>
        ) : (
          <MainPage />
        )}
      </div>
    </>
  );
};

export default FirstPage;
