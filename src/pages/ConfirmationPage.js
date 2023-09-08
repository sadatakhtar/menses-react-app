import React from "react";
import "../styles/ConfirmationPage.css";
import Footer from "../components/general/Footer";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWithoutInputs />
      <div className="confirmation-container">
        <h1>Thank you!</h1>
        <p>Your details have been successfully submitted.</p>
        <button className="btn btn-primary mt-5" onClick={() => navigate("/")}>
          Show Result
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmationPage;
