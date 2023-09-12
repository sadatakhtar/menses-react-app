import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/OutputInitialResultsPage.css";
import Footer from "../components/general/Footer";
import {
  getEstablishedCycleStartDate,
  getEstablishedCycleEndDate,
  getPurityCycleDays,
  setNextCycleStartDate,
  //getNextCycleStartDate,
  setNextCycleEndDate,
  //getNextCycleEndDate,
} from "../features/usersJourney/UserSlice";
import {
  calculatStringDateDiffInDays,
  calculateNextCycleStartDate,
  convertJsDateObjectToString,
} from "../utils/CalculateDateDiffInDays";
import ResultsMenu from "../components/general/ResultsMenu";
import { format } from "date-fns";
import HeaderWithoutInputs from "../components/general/HeaderWithoutInputs";
import ResultsForm from "../components/general/ResultsForm";

const OutputInitialResultsPage = () => {
  const cycleStartDateRedux = useSelector(getEstablishedCycleStartDate);
  const cycleEndDateRedux = useSelector(getEstablishedCycleEndDate);
  const purityDaysRedux = useSelector(getPurityCycleDays);
  //const nextCycleStartDateRedux = useSelector(getNextCycleStartDate);
  //const nextCycleEndDateRedux = useSelector(getNextCycleEndDate);

  const dispatch = useDispatch();

  // State to store the calculated values
  const [cycleDurationParsed, setCycleDurationParsed] = useState(0);
  const [nextCycleStartDateToString, setNextCycleStartDateToString] =
    useState("");
  const [nextCycleEndDateToString, setNextCycleEndDateToString] = useState("");

  useEffect(() => {
    try {
      // NB: calculate duration of cycle
      const diffInDays = calculatStringDateDiffInDays(
        cycleEndDateRedux,
        cycleStartDateRedux
      );
      setCycleDurationParsed(Number(diffInDays));

      // NB: calculate next cycle start date
      const purityDaysParsed = Number(purityDaysRedux);
      const nextStartDate = calculateNextCycleStartDate(
        cycleEndDateRedux,
        purityDaysParsed
      );
      setNextCycleStartDateToString(convertJsDateObjectToString(nextStartDate));

      // NB: calculate next cycle end date
      const nextEndDate = calculateNextCycleStartDate(
        nextCycleStartDateToString,
        cycleDurationParsed
      );
      // setNextCycleEndDateToString(convertJsDateObjectToString(nextEndDate));
      setNextCycleEndDateToString(format(nextEndDate, "yyyy-MM-dd"));
    } catch (error) {
      console.error(error);
    }
  }, [
    cycleStartDateRedux,
    cycleEndDateRedux,
    purityDaysRedux,
    cycleDurationParsed,
    nextCycleStartDateToString,
  ]);

  // dispatch to redux store
  dispatch(setNextCycleStartDate(nextCycleStartDateToString));
  dispatch(setNextCycleEndDate(nextCycleEndDateToString));

  console.log("cycleStartDateRedux,", cycleStartDateRedux);
  return (
    <>
      <HeaderWithoutInputs />
      <ResultsForm title="Result" />
      <ResultsMenu />
      <Footer />
    </>
  );
};

export default OutputInitialResultsPage;
