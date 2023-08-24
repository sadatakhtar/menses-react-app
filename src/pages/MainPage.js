import React from "react";
import "../styles/MainPage.css";
import { useNavigate } from 'react-router-dom'
// import { imageOne, imageTwo, imageThree } from "../utils/imgUrls";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignUpBtn = () => {
    navigate('/register')
  }
  const pageModel = (
    <div className="main-container">
      <div className="intro">
        <h4>Welcome to CycleSync</h4>
        <h5>Introducing CycleSync: Your Islamic Menstrual Cycle Companion</h5>
        <p>
          Welcome to CycleSync, a revolutionary online tool designed to empower
          Muslim women on their journey through the sacred phases of their
          menstrual cycles. Grounded in Islamic teachings and modern technology,
          CycleSync offers a comprehensive and compassionate approach to
          tracking and understanding your menses while providing you with
          valuable insights into your physical, emotional, and spiritual
          well-being.
        </p>
      </div>
      <div className="get-started">
        <p>
          CycleSync is more than just a menstrual cycle tracker – it's a
          companion that helps you embrace your journey with empowerment and
          spiritual awareness. Join us in creating a space where Islamic values,
          technology, and women's health converge to uplift and support one
          another.
        </p>
        <p>
          Embark on your CycleSync journey now and experience the
          transformational power of aligning your faith with your body's natural
          rhythms. Your menstrual cycle is a sacred gift, and CycleSync is here
          to honor and celebrate it with you.
        </p>
        <button type="button" className="btn btn-primary" onClick={handleSignUpBtn} >Sign Up</button>
      </div>
    </div>
  );
  return pageModel;
};

export default MainPage;
