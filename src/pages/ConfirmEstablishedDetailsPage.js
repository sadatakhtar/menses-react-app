import React from "react";
import "../styles/ConfirmEstablishedDetailsPage.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/general/Footer";
import { useSelector } from "react-redux";
// import { convertStringDateToFirebaseTimestamp } from "../utils/convertStringDateToFirebaseTimestamp";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import {
  getPurityCycleDays,
  getUserName,
  getUserAge,
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getUserEmail,
  // getNextCycleStartDate,
  getNextCycleEndDate,
  getCycleDuration
} from "../features/usersJourney/UserSlice";
import firebase from "../FirebaseConfig";
import { addDaysToStringDate } from "../utils/CalculateDateDiffInDays";

const ConfirmEstablishedDetailsPage = () => {
  const purityDaysRedux = useSelector(getPurityCycleDays);
  const userNameRedux = useSelector(getUserName);
  const userAgeRedux = useSelector(getUserAge);
  const estCycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const estCycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const userEmailRedux = useSelector(getUserEmail);
  const cycleDurationRedux = useSelector(getCycleDuration);
  const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);

  // NB: convert string date to timestamp before submission to DB
  // const timeStampedCycleStartDate = convertStringDateToFirebaseTimestamp(
  //   estCycleStartDateRedux
  // );
  // const timestampedCycleEndDate =
  //   convertStringDateToFirebaseTimestamp(estCycleEndDateRedux);

  // const timeStampedNextCycleStartDate = convertStringDateToFirebaseTimestamp(
  //   nextCycleStartDateRedux
  // );

  // const timeStampedNextCycleEndDate = convertStringDateToFirebaseTimestamp(
  //   nextCycleEndDateRedux
  // );

  // console.log(
  //   "==formatted fb timestamp:",
  //   timeStampedNextCycleStartDate,
  //   timeStampedNextCycleEndDate
  // );
  console.log("confirmEDP => esCycStartDate:", estCycleStartDateRedux);
  const navigate = useNavigate();

  const nextCycleDateCalculated = addDaysToStringDate(
    estCycleEndDateRedux,
    Number(purityDaysRedux)
  );
  console.log("calculated addDays to string date:", nextCycleDateCalculated);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    try {
      const cycleDetailsRef = await db
        .collection("cycle_details")
        .doc(user.uid);
      const userRef = await db.collection("users").doc(user.uid);

      cycleDetailsRef.set({
        name: userNameRedux,
        age: userAgeRedux,
        previous_cycle_start_date: estCycleStartDateRedux,
        previous_cycle_end_date: estCycleEndDateRedux,
        current_cycle_start_date: estCycleStartDateRedux,
        current_cycle_end_date: estCycleEndDateRedux,
        current_cycle_duration: cycleDurationRedux,
        purity_days_between_cycles: Number(purityDaysRedux),
        document_id: user.uid,
        account_email: userEmailRedux,
        details_submitted_date: new Date(),
        cycle_status: "unconfirmed",
        next_cycle_start_date: nextCycleDateCalculated,
        next_cycle_end_date: nextCycleEndDateRedux,
      });

      userRef.update({
        firstTimeLoggedIn: false,
      });
      console.log("Changed firsttimeloggedin to false");
      console.log("Successfully added data to db");
      navigate("/confirmation");

      // TODO: add redirection here
    } catch (error) {
      console.error("DB entry failed", error);
    }
  };
  return (
    <>
      <HeaderWithoutInputs />
      <div className="container-lg">
        <form onSubmit={handleSubmitForm} className="mb-5 detailForm">
          <h3 className="mt-5">Confirm Cycle Details</h3>
          <h5 className="mt-5 sub-heading">Personal details</h5>
          <div className="label-div">
            <label htmlFor="floatingInput">Name:</label>
            <span style={{ color: "green" }}>{userNameRedux}</span>
          </div>

          <div className="label-div">
            <label htmlFor="floatingAge">Age: </label>
            <span style={{ color: "green" }}>{userAgeRedux}</span>
          </div>

          <h5 className="mt-5 sub-heading">Cycle Information</h5>
          <div className="label-div">
            <label htmlFor="floatCycleStartDate">Start date:</label>
            <span style={{ color: "green" }}>{estCycleStartDateRedux}</span>
          </div>

          <div className="label-div">
            <label htmlFor="floatCycleEndDate">End date:</label>
            <span style={{ color: "green" }}>{estCycleEndDateRedux}</span>
          </div>

          <div className="label-div">
            <label htmlFor="floatPurityDays">Purity days between cycles:</label>
            <span style={{ color: "green" }}>{purityDaysRedux}</span>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ConfirmEstablishedDetailsPage;
