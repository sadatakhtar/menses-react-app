import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ResultsMenu.css";

const Menu = () => {
  const navigate = useNavigate();
  const handleBtn = () => {
    navigate("/");
  };

  return (
    <div className="button-container">
      <button className="btn btn-primary" onClick={handleBtn}>
        Continue to dashboard
      </button>
    </div>
  );
};

export default Menu;
