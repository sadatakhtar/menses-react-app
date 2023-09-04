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
  const diffInDaysParsed = Number(diffInDays);

  // NB: calculate next cycle start date
  const purityDaysParsed = Number(purityDaysRedux);
  const nextCycleStartDate = calculateNextCycleStartDate(
    cycleEndDateRedux,
    purityDaysParsed
  );
  console.log("ncsd", nextCycleStartDate);

  const nextCycleStartDateToString = convertJsDateObjectToString(nextCycleStartDate)

  return (
    <>
      <HeaderWithoutInputs />
      <div className="results-container">
        <h4>Results</h4>

        <form>
          <h2>Next Cycle Information</h2>
          <p>Results are calculated based on previously submitted data</p>
          <label>Next estimated cycle start date: {nextCycleStartDateToString }</label>
          <label>Next estimated cycle end date:</label>

          <label>Previous cycle duration: {diffInDaysParsed}</label>
          <label>Next cycle duration:</label>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OutputInitialResultsPage;
