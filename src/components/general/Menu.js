import React from "react";
import "../../styles/Menu.css";

const Menu = () => {

    // TODO: redirecting of buttons not complete
  return (
    <div className="button-container">
      <button className="btn btn-secondary">Profile</button>
      <button className="btn btn-secondary">History</button>
      <button className="btn btn-secondary">Ask a question</button>
      <button className="btn btn-primary">Started Bleeding</button>
    </div>
  );
};

export default Menu;
