import React from "react";
import "../../styles/Menu.css";

const Menu = () => {

    // TODO: redirecting of buttons not complete
  return (
    <div className="button-container">
      <button className="btn btn-secondary">Ask a question</button>
      <button className="btn btn-primary">Unexpected bleeding started</button>
      <button className="btn btn-primary">Unexpected bleeding ended</button>
    </div>
  );
};

export default Menu;
