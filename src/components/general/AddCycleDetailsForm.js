import React, { useState } from "react";
import "../../styles/AddCycleDetailsForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserEmail, setPurityCycleDays } from "../../features/usersJourney/UserSlice";
import firebase from "../../FirebaseConfig";

const AddCycleDetailsForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [cycleEndDate, setCycleEndDate] = useState("");
  const [purityDays, setPurityDays] = useState(0);

  const userEmailRedux = useSelector(getUserEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("========> redux value:", userEmailRedux);
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    dispatch(setPurityCycleDays(purityDays));
    navigate('/confirm-details')

    // const user = firebase.auth().currentUser;
    // const db = firebase.firestore();

    // try {
    //   const cycleDetailsRef = await db
    //     .collection("cycle_details")
    //     .doc(user.uid);
    //   cycleDetailsRef.set({
    //     name: name,
    //     age: age,
    //     cycle_start_date: cycleStartDate,
    //     cycle_end_date: cycleEndDate,
    //     purity_days_between_cycles: purityDays,
    //     document_id: user.uid,
    //     account_email: userEmailRedux,
    //     details_submitted_date: new Date(),
    //   });
    //   console.log("Successfully added data to db");
    //   navigate('/confirm-details')


    //   // TODO: add redirection here
    // } catch (error) {
    //   console.error("DB entry failed", error);
    // }
  };

  const pageModel = (
    <div className="container-lg">
      <form onSubmit={handleSubmitForm} className="mb-5 detailForm">
        <h3 className="mt-5">Established Cycle</h3>
        <label htmlFor="floatingInput">
          Name:
          <input
            type="text"
            className="form-control mt-2"
            id="floatingInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="floatingAge">
          Age:
          <input
            type="number"
            value={age}
            className="form-control mt-2"
            id="floatAge"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>

        <h5 className="mt-5">Cycle Information</h5>
        <label htmlFor="floatCycleStartDate">
          Start date:
          <input
            type="date"
            value={cycleStartDate}
            onChange={(e) => setCycleStartDate(e.target.value)}
            className="form-control mt-2"
            id="floatCycleStartDate"
            required
          />
        </label>
        <label htmlFor="floatCycleEndDate">
          End date:
          <input
            type="date"
            value={cycleEndDate}
            onChange={(e) => setCycleEndDate(e.target.value)}
            className="form-control mt-2"
            id="floatCycleEndDate"
            required
          />
        </label>

        <label htmlFor="floatPurityDays">
          Purity days between cycles:
          <input
            type="number"
            value={purityDays}
            onChange={(e) => setPurityDays(e.target.value)}
            className="form-control mt-2"
            id="floatPurityDays"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );

  return pageModel;
};

export default AddCycleDetailsForm;
