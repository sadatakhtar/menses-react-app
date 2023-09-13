import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getNextCycleStartDate,
  getNextCycleEndDate,
  getIsLoggedInFirstTime,
  setCycleDuration,
} from "../../features/usersJourney/UserSlice";
import firebase from "../../FirebaseConfig";
import { calculatStringDateDiffInDays, calculateDateDifferenceInDays } from "../../utils/CalculateDateDiffInDays";

const ResultsForm = ({ title, user }) => {
  const [cycleData, setCycleData] = useState([]);

  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const nextCycleStartDateRedux = useSelector(getNextCycleStartDate);
  const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);

  const isLoggedInFirstTimeRedux = useSelector(getIsLoggedInFirstTime);
  console.log("in resultsForm -> isLoggedIn:", isLoggedInFirstTimeRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCycleData() {
      try {
        const db = firebase.firestore();
        const snapshot = await db
          .collection("cycle_details")
          .where("account_email", "==", user?.email)
          .get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("cycle_details data:", data);
        setCycleData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCycleData();
  }, [user]);

  let cycleDuration;
  let cycleDataNonState;
  cycleDataNonState = cycleData;

  let firstDate = cycleDataNonState[0]?.previous_cycle_start_date;
  let secondDate = cycleDataNonState[0]?.previous_cycle_end_date;
  const calculatedDuration = calculateDateDifferenceInDays(firstDate, secondDate);

  console.log("cycleDataNS", cycleDataNonState);

  try {
    // NB: calculate duration of cycle
    const diffInDays = calculatStringDateDiffInDays(
      cycleEndDateRedux,
      cycleStartDateRedux
    );
    console.log("DDDDDDDFFFFFF", diffInDays);
    cycleDuration = Number(diffInDays);
    dispatch(setCycleDuration(cycleDuration));
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
              {cycleDataNonState.length > 0
                ? cycleDataNonState[0].previous_cycle_start_date
                : cycleStartDateRedux}
            </span>
          </div>
          <div className="label-div">
            <label>Previous cycle end date: </label>
            <span style={{ color: "grey" }}>
            {cycleDataNonState.length > 0
                ? cycleDataNonState[0].previous_cycle_end_date
                : cycleEndDateRedux}
            </span>
          </div>
          <div className="label-div">
            <label>Next estimated cycle start date: </label>
            <span style={{ color: "green" }}>
            {cycleDataNonState.length > 0
                ? cycleDataNonState[0].next_cycle_start_date
                : nextCycleStartDateRedux}
            </span>
          </div>

          <div className="label-div">
            <label>Next estimated cycle end date:</label>
            <span style={{ color: "green" }}>
            {cycleDataNonState.length > 0
                ? cycleDataNonState[0].next_cycle_end_date
                : nextCycleEndDateRedux}
            </span>
          </div>

          <div className="label-div">
            <label>Previous cycle duration:</label>
            <span style={{ color: "green" }}>
                {calculatedDuration ? calculatedDuration : cycleDuration}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResultsForm;
