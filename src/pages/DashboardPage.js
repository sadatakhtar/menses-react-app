import React, { useEffect, useState } from "react";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getNextCycleStartDate,
  getNextCycleEndDate,
  getCycleDuration,
} from "../features/usersJourney/UserSlice";
import { useSelector } from "react-redux";
// import ResultsForm from '../components/general/ResultsForm';
import Menu from "../components/general/Menu";
import firebase from "../FirebaseConfig";
import { calculateDateDifferenceInDays } from "../utils/CalculateDateDiffInDays";

const DashboardPage = ({ user }) => {
  const [cycleData, setCycleData] = useState([]);

  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const nextCycleStartDateRedux = useSelector(getNextCycleStartDate);
  const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);
  const cycleDurationRedux = useSelector(getCycleDuration)

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

  let cycleDataNonState;
  cycleDataNonState = cycleData;

  console.log('in dashboard getCycleDuration:', cycleDurationRedux)

  let firstDate = cycleDataNonState[0]?.previous_cycle_start_date;
  let secondDate = cycleDataNonState[0]?.previous_cycle_end_date;
  const calculatedDuration = calculateDateDifferenceInDays(firstDate, secondDate);

  const pageModel = (
    <div>
      {/* <ResultsForm title="Dashboard" user={user}/> */}
      <div className="results-container">
        <form>
          <h2>Dashboard</h2>
          <p className="mb-2">
            Results are calculated based on previously submitted data
          </p>
          <div className="label-container">
            <div className="label-div">
              <label>Previous cycle start date: </label>
              <span style={{ color: "grey" }}>
                {cycleDataNonState.length > 0
                  ? cycleDataNonState[0]?.previous_cycle_start_date
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
                {calculatedDuration ? calculatedDuration : cycleDurationRedux}
              </span>
            </div>
          </div>
        </form>
      </div>
      <Menu />
    </div>
  );
  return pageModel;
};

export default DashboardPage;
