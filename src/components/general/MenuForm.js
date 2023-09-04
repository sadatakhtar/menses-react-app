import React, { useState } from "react";
import "../../styles/MenuForm.css";
import { useNavigate } from "react-router-dom";
// import firebase from '../../FirebaseConfig'

const MenuForm = ({ user }) => {
  const [selectOption, setSelectOption] = useState("");
  // const user = firebase.auth();

  const navigate = useNavigate();

  const handleSelection = (e) => {
    setSelectOption(e.target.value);
    console.log("=========> ", selectOption);
  };

  const handleSubmit = () => {
    console.log("handleSubmit func:", selectOption);

    if (selectOption === "New") {
      navigate("/new-entry");
    } else if (selectOption === "Established") {
      navigate("/established-entry");
    } else if (selectOption === "Confused") {
      navigate("/confused-entry");
    } else if (selectOption === "Elderly") {
      navigate("/elderly-entry");
    }
  };
  //   console.log("== user:", user);
  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <p>
        {user?.displayName ? (
          <p>
            Hi{" "}
            <span style={{ fontWeight: "400", color: "black" }}>
              {user?.displayName}
            </span>
            ,
          </p>
        ) : (
          <p>
            Hi <span style={{ fontWeight: "400", color: "black" }}>User</span>
          </p>
        )}
      </p>
      <h5>Please select from the following options:</h5>

      <hr />
      <div className="cycle-form-container">
        <div className="title-container">
          <h4>Select Cycle Type</h4>
        </div>
        <div className="buttons-container">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="radio"
                value="New"
                onChange={handleSelection}
                checked={selectOption === "New"}
              />{" "}
              New
            </label>
            <label>
              <input
                type="radio"
                value="Established"
                onChange={handleSelection}
                checked={selectOption === "Established"}
              />{" "}
              Established
            </label>
            <label>
              <input
                type="radio"
                value="Confused"
                onChange={handleSelection}
                checked={selectOption === "Confused"}
              />{" "}
              Confused
            </label>
            <label>
              <input
                type="radio"
                value="Elderly"
                onChange={handleSelection}
                checked={selectOption === "Elderly"}
              />{" "}
              Elderly
            </label>
            <button id="ctn-btn" type="submit" className="btn btn-primary">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;
