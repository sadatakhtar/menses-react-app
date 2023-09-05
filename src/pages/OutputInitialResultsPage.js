import React from "react";
import { useSelector } from "react-redux";
import "../styles/OutputInitialResultsPage.css";
import Footer from "../components/general/Footer";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getPurityCycleDays,
} from "../features/usersJourney/UserSlice";
import {
  calculatStringDateDiffInDays,
  calculateNextCycleStartDate,
  convertJsDateObjectToString,
} from "../utils/CalculateDateDiffInDays";

const OutputInitialResultsPage = () => {
  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const purityDaysRedux = useSelector(getPurityCycleDays);

  // NB: calculate duration of cycle
  const diffInDays = calculatStringDateDiffInDays(
    cycleEndDateRedux,
    cycleStartDateRedux
  );
  const cycleDurationParsed = Number(diffInDays);

  // NB: calculate next cycle start date
  const purityDaysParsed = Number(purityDaysRedux);
  const nextCycleStartDate = calculateNextCycleStartDate(
    cycleEndDateRedux,
    purityDaysParsed
  );
  console.log("ncsd", nextCycleStartDate);

  const nextCycleStartDateToString =
    convertJsDateObjectToString(nextCycleStartDate);

  // NB: calculate next cycle end date (new date + menses duration)
  const nextCycleEndDate = calculateNextCycleStartDate(
    nextCycleStartDateToString,
    cycleDurationParsed
  );
  console.log("ncENDDate:", nextCycleEndDate);

  const nextCycleEndDateToString =
    convertJsDateObjectToString(nextCycleEndDate);

  return (
    <>
      <HeaderWithoutInputs />
      <div className="results-container">
        <form>
          <h2>Result</h2>
          <p className="mb-2">Results are calculated based on previously submitted data</p>
          <div className="label-container">
            <div className="label-div">
              <label>
                Next estimated cycle start date:{" "}
              </label>
              <span>{nextCycleStartDateToString}</span>
            </div>

            <div className="label-div">
              <label>Next estimated cycle end date:</label>
              <span>{nextCycleEndDateToString}</span>
            </div>

            <div className="label-div">
              <label>
                Previous cycle duration:
              </label>
              <span>{cycleDurationParsed} days</span>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OutputInitialResultsPage;
