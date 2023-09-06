import { differenceInDays, parseISO, addDays, format, isValid } from "date-fns";

export const calculatStringDateDiffInDays = (startDate, endDate) => {
  const startDateParsed = parseISO(startDate);
  const endDateParsed = parseISO(endDate);

  if (isValid(startDateParsed) && isValid(endDateParsed)) {
    return differenceInDays(startDateParsed, endDateParsed);
  } else {
    console.error("Invalid dates: ", startDateParsed, endDateParsed);
  }
};

export const calculateNextCycleStartDate = (previousEndDate, purityDays) => {
  const previousEndDateParsed = parseISO(previousEndDate);

  if (isValid(previousEndDateParsed)) {
    return addDays(previousEndDateParsed, purityDays);
  } else {
    console.error("Invalid date:", previousEndDateParsed);
  }
};

export const convertJsDateObjectToString = (parsedDate) => {
  if(parsedDate){
    return format(parsedDate, "yyyy-MM-dd");
  }else {
    console.error('Invalid date:', parsedDate)
  }
 
};
