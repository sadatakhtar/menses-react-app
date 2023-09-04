import { differenceInDays, parseISO, addDays, format } from "date-fns";

export const calculatStringDateDiffInDays = (startDate, endDate) => {
  const startDateParsed = parseISO(startDate);
  const endDateParsed = parseISO(endDate);

  return differenceInDays(startDateParsed, endDateParsed);
};

export const calculateNextCycleStartDate = (previousEndDate, purityDays) => {
  const previousEndDateParsed = parseISO(previousEndDate)
  return addDays(previousEndDateParsed, purityDays)
}

export const convertJsDateObjectToString = (parsedDate) => {
  return format(parsedDate, 'yyyy-MM-dd')
}