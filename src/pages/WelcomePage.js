import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/general/Footer";
import "../styles/WelcomePage.css";
// import { getUserEmail } from "../features/usersJourney/UserSlice";
// import { useSelector } from "react-redux";
import firebase from "../FirebaseConfig";

const WelcomePage = ({user}) => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  // const userEmailRedux = useSelector(getUserEmail);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const db = firebase.firestore();
        const snapshot = await db
          .collection("users")
          .where("email", "==", user?.email)
          .get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("data ====>", data);
        setIsFirstTime(data[0].firstTimeLoggedIn);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [user]);

  const handleNextBtn = () => {
    if(isFirstTime){
      navigate("/first-time")
    } else {
      navigate("/second-page")
    }
    
  }
  console.log("db value of isfirstTime ===>", isFirstTime);
  return (
    <>
      <div className="confirmation-container">
        <h1>Welcome</h1>
        <p style={{ textAlign: "center" }}>
          Navigating Islamic Rulings for Menstrual Cycles, One Phase at a Time.
        </p>
        <button
          className="btn btn-primary mt-5"
          onClick={handleNextBtn}
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
