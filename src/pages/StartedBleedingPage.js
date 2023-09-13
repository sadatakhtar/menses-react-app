import React from "react";
import "../styles/StartedBleedingPage.css";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import Footer from "../components/general/Footer";

const StartedBleedingPage = () => {
  return (
    <>
      <HeaderWithoutInputs />
      <div className="started-container">
        <div className="last-cycle">
          <h3>Last cycle information</h3>
          <div className="label-div">
            <p>start date: </p>
            <span>fetch date from db/redux</span>
          </div>

          <div className="label-div">
            <p>presumed end date: </p>
            <span>fetch date from db/redux</span>
          </div>
        </div>
        <div className="additional-details">
          <h3>Enter additional details</h3>
          <div className="label-div">
            <p>New bleed start date: </p>
            <span>fetch date from db/redux</span>
          </div>

          <div className="label-div">
            <p>New bleed end date: </p>
            <span>fetch date from db/redux</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StartedBleedingPage;
