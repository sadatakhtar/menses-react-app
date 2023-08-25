import React from "react";
import '../styles/RegisterPage.css'
import Register from "../components/auth/Register";
import Footer from "../components/general/Footer";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";

const RegisterPage = () => {
  return (
    <>
      <HeaderWithoutInputs />
      <div className="register-page-container">
        <h3>Create an Account</h3>
        <Register />
      </div>
     
      <Footer />
    </>
  );
};

export default RegisterPage;
