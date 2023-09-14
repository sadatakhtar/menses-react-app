import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/general/Footer";
import "../styles/WelcomePage.css";
import firebase from "../FirebaseConfig";
import DashboardPage from "./DashboardPage";
import {
  setIsLoggedInFirstTime,
  getIsLoggedInFirstTime,
} from "../features/usersJourney/UserSlice";

const WelcomePage = ({ user }) => {
  const [dbData, setDbData] = useState(false);
  const isLoggedInFirstTimeRedux = useSelector(getIsLoggedInFirstTime);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("isLoggedInRedux 1:", isLoggedInFirstTimeRedux);

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
        setDbData(data[0].firstTimeLoggedIn);
      } catch (error) {
        console.error("Failed to fetch data from DB!", error);
      }
    }
    fetchData();
  }, [user]);

  dispatch(setIsLoggedInFirstTime(dbData))
  console.log('isLoggedInRedux 2:', isLoggedInFirstTimeRedux)

  const handleNextBtn = () => {
    if (dbData) {
      navigate("/first-time");
    } else {
      navigate("/dashboard");
    }
  };
  console.log("db value of isfirstTime ===>", dbData);

  const pageModel = (
    <div>
      {!dbData ? (
        <DashboardPage user={user}/>
      ) : (
        <>
          <div className="confirmation-container">
            <h1>Welcome</h1>
            <p style={{ textAlign: "center" }}>
              Navigating Islamic Rulings for Menstrual Cycles, One Phase at a
              Time.
            </p>
            <button className="btn btn-primary mt-5" onClick={handleNextBtn}>
              Next
            </button>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
  return pageModel;
};

export default WelcomePage;
