import React, { useState } from "react";
import "../../styles/AddCycleDetailsForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserEmail,
  setPurityCycleDays,
  setUserName,
  setUserAge,
  setEstablishedCycleStartDate,
  setEstablishedCycleEndDate,
} from "../../features/usersJourney/UserSlice";
// import firebase from "../../FirebaseConfig";

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
  console.log('CS-date:', cycleStartDate)
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // NB: Store in redux
    dispatch(setPurityCycleDays(purityDays));
    dispatch(setUserName(name));
    dispatch(setUserAge(age));
    dispatch(setEstablishedCycleStartDate(cycleStartDate));
    dispatch(setEstablishedCycleEndDate(cycleEndDate))

    navigate("/confirm-details");

   
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
          Next
        </button>
      </form>
    </div>
  );

  return pageModel;
};

export default AddCycleDetailsForm;
