import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/OutputInitialResultsPage.css";
import Footer from "../components/general/Footer";
// import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
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
import Menu from "../components/general/Menu";
import { format } from "date-fns";

const OutputInitialResultsPage = () => {
  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const purityDaysRedux = useSelector(getPurityCycleDays);

  // State to store the calculated values
  const [cycleDurationParsed, setCycleDurationParsed] = useState(0);
  const [nextCycleStartDateToString, setNextCycleStartDateToString] =
    useState("");
  const [nextCycleEndDateToString, setNextCycleEndDateToString] = useState("");

  useEffect(() => {
    try {
      // NB: calculate duration of cycle
      const diffInDays = calculatStringDateDiffInDays(
        cycleEndDateRedux,
        cycleStartDateRedux
      );
      setCycleDurationParsed(Number(diffInDays));

      // NB: calculate next cycle start date
      const purityDaysParsed = Number(purityDaysRedux);
      const nextStartDate = calculateNextCycleStartDate(
        cycleEndDateRedux,
        purityDaysParsed
      );
      setNextCycleStartDateToString(convertJsDateObjectToString(nextStartDate));

      // NB: calculate next cycle end date
      const nextEndDate = calculateNextCycleStartDate(
        nextCycleStartDateToString,
        cycleDurationParsed
      );
      // setNextCycleEndDateToString(convertJsDateObjectToString(nextEndDate));
      setNextCycleEndDateToString(format(nextEndDate, "yyyy-MM-dd"));
    } catch (error) {
      console.error(error);
    }
  }, [
    cycleStartDateRedux,
    cycleEndDateRedux,
    purityDaysRedux,
    cycleDurationParsed,
    nextCycleStartDateToString,
  ]);

  return (
    <>
      {/* <HeaderWithoutInputs /> */}
      <div className="results-container">
        <form>
          <h2>Results</h2>
          <p className="mb-2">
            Results are calculated based on previously submitted data
          </p>
          <div className="label-container">
            <div className="label-div">
              <label>Previous cycle start date: </label>
              <span style={{ color: "grey" }}>{cycleStartDateRedux}</span>
            </div>
            <div className="label-div">
              <label>Previous cycle end date: </label>
              <span style={{ color: "grey" }}>{cycleEndDateRedux}</span>
            </div>
            <div className="label-div">
              <label>Next estimated cycle start date: </label>
              <span style={{ color: "green" }}>
                {nextCycleStartDateToString}
              </span>
            </div>

            <div className="label-div">
              <label>Next estimated cycle end date:</label>
              <span style={{ color: "green" }}>{nextCycleEndDateToString}</span>
            </div>

            <div className="label-div">
              <label>Previous cycle duration:</label>
              <span style={{ color: "green" }}>{cycleDurationParsed} days</span>
            </div>
          </div>
        </form>
      </div>
      <Menu />
      <Footer />
    </>
  );
};

export default OutputInitialResultsPage;
