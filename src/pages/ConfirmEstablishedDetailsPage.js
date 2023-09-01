import React from "react";
import Footer from "../components/general/Footer";
import { useSelector } from "react-redux";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import { getPurityCycleDays } from "../features/usersJourney/UserSlice";

const ConfirmEstablishedDetailsPage = () => {
  const purityDaysRedux = useSelector(getPurityCycleDays);
  return (
    <>
      <HeaderWithoutInputs />

      <div className="container-lg">
        <form onSubmit="" className="mb-5 detailForm">
          <h3 className="mt-5">Confirm established cycle details</h3>
          <label htmlFor="floatingInput">Name:</label>
          <label htmlFor="floatingAge">Age:</label>

          <h5 className="mt-5">Cycle Information</h5>
          <label htmlFor="floatCycleStartDate">Start date:</label>
          <label htmlFor="floatCycleEndDate">End date:</label>

          <label htmlFor="floatPurityDays">
            Purity days between cycles: {purityDaysRedux}
          </label>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ConfirmEstablishedDetailsPage;
