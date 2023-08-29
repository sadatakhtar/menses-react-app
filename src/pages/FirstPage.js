import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import MenuForm from "../components/general/MenuForm";
import MainPage from "./MainPage";

const FirstPage = ({ user }) => {
  return (
    <>
      <div>
        <Header existingUser={user} />
      </div>
      <div className="first-page-container">
        {user ? (
          <>
            <MenuForm user={user} />
            <Footer />
          </>
        ) : (
          <MainPage />
        )}
      </div>
    </>
  );
};

export default FirstPage;
