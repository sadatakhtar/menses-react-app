import React from "react";
import "../styles/StartedBleedingPage.css";
import { useSelector } from "react-redux";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getCycleDataFromFirestore,
} from "../features/usersJourney/UserSlice";
import Footer from "../components/general/Footer";

const StartedBleedingPage = () => {
  const lastCycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const presumedLastCycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const cycleDataFromFsRedux = useSelector(getCycleDataFromFirestore);

  console.log("---------------->>> db data:", cycleDataFromFsRedux);
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
              <input type="date" required />
            </label>
          </div>

          <div className="label-div">
            <p>New bleed end date: </p>
            <label>
              <input type="date" required />
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StartedBleedingPage;
