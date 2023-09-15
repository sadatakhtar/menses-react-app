import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getNextCycleStartDate,
  getNextCycleEndDate,
  getIsLoggedInFirstTime,
  setCycleDuration,
} from "../../features/usersJourney/UserSlice";
import { calculatStringDateDiffInDays } from "../../utils/CalculateDateDiffInDays";

const ResultsForm = ({ title }) => {
  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const nextCycleStartDateRedux = useSelector(getNextCycleStartDate);
  const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);

  const isLoggedInFirstTimeRedux = useSelector(getIsLoggedInFirstTime);
  console.log("in resultsForm -> isLoggedIn:", isLoggedInFirstTimeRedux);
  const dispatch = useDispatch();

  let cycleDuration;

  // Calculate cycleDuration in an effect
  useEffect(() => {
    try {
      const diffInDays = calculatStringDateDiffInDays(
        cycleEndDateRedux,
        cycleStartDateRedux
      );
      console.log("DDDDDDDFFFFFF", diffInDays);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cycleDuration = Number(diffInDays);
      dispatch(setCycleDuration(cycleDuration));
    } catch (error) {
      console.error(error);
    }
  }, [cycleStartDateRedux, cycleEndDateRedux, dispatch]);

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
            <span style={{ color: "grey" }}>{cycleStartDateRedux}</span>
          </div>
          <div className="label-div">
            <label>Previous cycle end date: </label>
            <span style={{ color: "grey" }}>{cycleEndDateRedux}</span>
          </div>
          <div className="label-div">
            <label>Next estimated cycle start date: </label>
            <span style={{ color: "green" }}>{nextCycleStartDateRedux}</span>
          </div>

          <div className="label-div">
            <label>Next estimated cycle end date:</label>
            <span style={{ color: "green" }}>{nextCycleEndDateRedux}</span>
          </div>

          <div className="label-div">
            <label>Previous cycle duration:</label>
            <span style={{ color: "green" }}>{cycleDuration}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultsForm;
