import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/general/Footer";
import { useSelector } from "react-redux";
import { convertStringDateToFirebaseTimestamp } from "../utils/convertStringDateToFirebaseTimestamp";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import {
  getPurityCycleDays,
  getUserName,
  getUserAge,
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getUserEmail,
} from "../features/usersJourney/UserSlice";
import firebase from "../FirebaseConfig";

const ConfirmEstablishedDetailsPage = () => {
  const purityDaysRedux = useSelector(getPurityCycleDays);
  const userNameRedux = useSelector(getUserName);
  const userAgeRedux = useSelector(getUserAge);
  const estCycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const estCycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const userEmailRedux = useSelector(getUserEmail);

  // NB: convert string date to timestamp before submission to DB
  const timeStampedCycleStartDate = convertStringDateToFirebaseTimestamp(
    estCycleStartDateRedux
  );
  const timestampedCycleEndDate =
    convertStringDateToFirebaseTimestamp(estCycleEndDateRedux);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    try {
      const cycleDetailsRef = await db
        .collection("cycle_details")
        .doc(user.uid);
      cycleDetailsRef.set({
        name: userNameRedux,
        age: userAgeRedux,
        cycle_start_date: timeStampedCycleStartDate,
        cycle_end_date: timestampedCycleEndDate,
        purity_days_between_cycles: purityDaysRedux,
        document_id: user.uid,
        account_email: userEmailRedux,
        details_submitted_date: new Date(),
      });

      // TODO: make DB call and change 'firstTimeLoggedIn to false
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
          <h3 className="mt-5">Confirm established cycle details</h3>
          <label htmlFor="floatingInput">Name: {userNameRedux}</label>
          <label htmlFor="floatingAge">Age: {userAgeRedux}</label>

          <h5 className="mt-5">Cycle Information</h5>
          <label htmlFor="floatCycleStartDate">
            Start date: {estCycleStartDateRedux}
          </label>
          <label htmlFor="floatCycleEndDate">
            End date: {estCycleEndDateRedux}
          </label>

          <label htmlFor="floatPurityDays">
            Purity days between cycles: {purityDaysRedux}
          </label>
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
