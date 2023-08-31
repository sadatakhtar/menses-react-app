import React from "react";
// import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
// import MenuForm from "../components/general/MenuForm";
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
            <WelcomePage />
            {/* <MenuForm user={user} />
            <Footer /> */}
          </div>
        ) : (
          <MainPage />
        )}
      </div>
    </>
  );
};

export default FirstPage;
