import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/general/Footer";
import "../styles/WelcomePage.css";
import firebase from "../FirebaseConfig";
import OutputInitialResultsPage from "./OutputInitialResultsPage";

const WelcomePage = ({user}) => {
  const [isFirstTime, setIsFirstTime] = useState(false);
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
        console.error('Failed to fetch data from DB!', error);
      }
    }
    fetchData();
  }, [user]);

  const handleNextBtn = () => {
    if(isFirstTime){
      navigate("/first-time")
    } else {
      navigate("/dashboard")
    }
    
  }
  console.log("db value of isfirstTime ===>", isFirstTime);

  const pageModel = (
    <div>
       {!isFirstTime ? (<OutputInitialResultsPage />) : ( <>
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
    </>)}
    </div>
   
  )
  return pageModel;
};

export default WelcomePage;
