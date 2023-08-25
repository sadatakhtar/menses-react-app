import React, { useState } from "react";
import "../../styles/AddCycleDetailsForm.css";
import { useSelector } from "react-redux";
import { getUserEmail } from "../../features/usersJourney/UserSlice";

const AddCycleDetailsForm = ({ handleAddCycleDetails }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cycleStartDate, setCycleStartDate] = useState("");
  const [cycleEndDate, setCycleEndDate] = useState("");

  const userEmailRedux = useSelector(getUserEmail);

  console.log("========> redux value:", userEmailRedux);
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newCycleDetails = {
      name,
      age,
      cycleStartDate,
      cycleEndDate,
      account_email: userEmailRedux,
    };

    handleAddCycleDetails(newCycleDetails);
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
