import React, { useState } from "react";
import "../../styles/AddCycleDetailsForm.css";
import { useSelector } from "react-redux";
import { getUserEmail } from "../../features/usersJourney/UserSlice";
import firebase from "../../FirebaseConfig";

const AddCycleDetailsForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [cycleEndDate, setCycleEndDate] = useState("");

  const userEmailRedux = useSelector(getUserEmail);

  console.log("========> redux value:", userEmailRedux);
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    try {
      const cycleDetailsRef = await db
        .collection("cycle_details")
        .doc(user.uid);
      cycleDetailsRef.set({
        name: name,
        age: age,
        cycle_start_date: cycleStartDate,
        cycle_end_date: cycleEndDate,
        // userRef: db.collection('users').doc('user_id'),
        document_id: user.uid,
        account_email: userEmailRedux,
      });
      console.log("Successfully added data to db");
      alert(`Details added to DB successfully`);

      // TODO: add redirection here
    } catch (error) {
      console.error("DB entry failed", error);
    }
  };

  const pageModel = (
    <div className="container-lg">
      <form onSubmit={handleSubmitForm} className="mb-5 detailForm">
        <h3 className="mt-5">Details</h3>
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
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );

  return pageModel;
};

export default AddCycleDetailsForm;
