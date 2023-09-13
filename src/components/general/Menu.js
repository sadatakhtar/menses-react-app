import React from "react";
import { useNavigate} from 'react-router-dom'
import "../../styles/Menu.css";

const Menu = () => {
  const navigate = useNavigate();
   
    const handleBleedBtn = () => {
      navigate('/started-bleeding')
    }
  return (
    <div className="button-container">
      <button className="btn btn-secondary">Ask a question</button>
      <button className="btn btn-primary" onClick={handleBleedBtn}>Started bleeding again</button>
   
    </div>
  );
};

export default Menu;
