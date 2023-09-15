import React, { useState } from "react";
import "../styles/StartedBleedingPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getCycleDataFromFirestore,
} from "../features/usersJourney/UserSlice";
import Footer from "../components/general/Footer";

const StartedBleedingPage = () => {
  const [bleedStartInput, setBleedStartInput] = useState("");
  const [bleedEndInput, setBleedEndInput] = useState("");

  const lastCycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const presumedLastCycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const cycleDataFromFsRedux = useSelector(getCycleDataFromFirestore);

  const navigate = useNavigate();

  console.log("---------------->>> db data:", cycleDataFromFsRedux);
  console.log("Bleed start input: ", bleedStartInput);
  console.log("Bleed end input: ", bleedEndInput);

  const handleContinueBtn = () => {
    navigate('/confirm-new-bleed-details')
  }

  return (
    <>
      <HeaderWithoutInputs />
      <div className="started-container">
        <div className="last-cycle">
          <h3>Last cycle information</h3>
          <div className="label-div">
            <p>start date: </p>
            <span style={{ color: "green" }}>
              {cycleDataFromFsRedux.length > 0
                ? cycleDataFromFsRedux[0].previous_cycle_start_date
                : lastCycleStartDateRedux}
            </span>
          </div>

          <div className="label-div">
            <p>presumed end date: </p>
            <span style={{ color: "orange" }}>
              {cycleDataFromFsRedux.length > 0
                ? cycleDataFromFsRedux[0].previous_cycle_end_date
                : presumedLastCycleEndDateRedux}
            </span>
          </div>
        </div>
        <div className="additional-details">
          <h3>Enter additional details</h3>
          <div className="label-div">
            <p>New bleed start date: </p>
            <label>
              <input
                type="date"
                required
                value={bleedStartInput}
                onChange={(e) => setBleedStartInput(e.target.value)}
              />
            </label>
          </div>

          <div className="label-div">
            <p>New bleed end date: </p>
            <label>
              <input
                type="date"
                required
                value={bleedEndInput}
                onChange={(e) => setBleedEndInput(e.target.value)}
              />
            </label>
          </div>
          <div className="bleed-btn">
            <button className="btn btn-primary" onClick={handleContinueBtn}>Continue</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StartedBleedingPage;
