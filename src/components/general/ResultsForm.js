import React from "react";
import { useSelector } from "react-redux";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getNextCycleStartDate,
  getNextCycleEndDate,
} from "../../features/usersJourney/UserSlice";
import { calculatStringDateDiffInDays } from "../../utils/CalculateDateDiffInDays";

const ResultsForm = ({ title }) => {
  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const nextCycleStartDateRedux = useSelector(getNextCycleStartDate);
  const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);

  let cycleDuration;

  try {
    // NB: calculate duration of cycle
    const diffInDays = calculatStringDateDiffInDays(
      cycleEndDateRedux,
      cycleStartDateRedux
    );
    console.log("DDDDDDDFFFFFF", diffInDays);
    cycleDuration = Number(diffInDays);
  } catch (error) {
    console.error(error);
  }
  console.log("cycleDuration:", cycleDuration);
  return (
    <div className="results-container">
      <form>
        <h2>{title}</h2>
        <p className="mb-2">
          Results are calculated based on previously submitted data
        </p>
        <div className="label-container">
          <div className="label-div">
            <label>Previous cycle start date: </label>
            <span style={{ color: "grey" }}>
              {cycleStartDateRedux ? cycleStartDateRedux : "...calculating"}
            </span>
          </div>
          <div className="label-div">
            <label>Previous cycle end date: </label>
            <span style={{ color: "grey" }}>
              {cycleEndDateRedux ? cycleEndDateRedux : "...calculating"}
            </span>
          </div>
          <div className="label-div">
            <label>Next estimated cycle start date: </label>
            <span style={{ color: "green" }}>
              {nextCycleStartDateRedux
                ? nextCycleStartDateRedux
                : "...calculating"}
            </span>
          </div>

          <div className="label-div">
            <label>Next estimated cycle end date:</label>
            <span style={{ color: "green" }}>
              {nextCycleEndDateRedux ? nextCycleEndDateRedux : "...calculating"}
            </span>
          </div>

          <div className="label-div">
            <label>Previous cycle duration:</label>
            <span style={{ color: "green" }}>
              {cycleDuration ? cycleDuration : "...calculating"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultsForm;
