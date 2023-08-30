import React from "react";
import Footer from "../components/general/Footer";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
// import firebase from "../FirebaseConfig";

const EstablishedCyclePage = () => {
  //const db = firebase.firestore();

  // const handleDb = async () => {
  //   try {
  //     const snapshot = await db
  //       .collection("cycle_details")
  //       .where("account_email", "==", "sadat0akhtar@gmail.com")
  //       .get();
  //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };
  return (
    <>
      <HeaderWithoutInputs />
      <div>
        <h1>Established Cycle Page</h1>
        {/* <button onClick={handleDb}>Db call</button> */}
      </div>
      <Footer />
    </>
  );
};

export default EstablishedCyclePage;
