import { differenceInDays, parseISO, addDays, format } from "date-fns";

export const calculatStringDateDiffInDays = (startDate, endDate) => {
  const startDateIso = convertStringDateToISODate(startDate);
  const endDateIso = convertStringDateToISODate(endDate);

  const startDateParsed = parseISO(startDateIso);
  const endDateParsed = parseISO(endDateIso);

  // NB: 'Wed Sep 13 2023 01:00:00 GMT+0100 (British Summer Time)'
  console.log("st&endParsed", startDateParsed);

  // NB: confirm isoDate format
  const isoStart = isISODate(startDateIso);
  const isoEnd = isISODate(endDateIso);

  console.log("iso st&end", isoStart, isoEnd);

  // NB: convert dateString to JS date object
  const jsObjStart = convertDateStringToJsObject(startDateParsed);
  const jsObjEnd = convertDateStringToJsObject(endDateParsed);

  if (jsObjStart instanceof Date) {
    return differenceInDays(jsObjStart, jsObjEnd);
  } else {
    console.error("Dates are not JS Date objects", jsObjStart, jsObjEnd);
  }
};

export const calculateNextCycleStartDate = (previousEndDate, purityDays) => {
  console.log("date param:", previousEndDate);
  const prevEndIso = convertStringDateToISODate(previousEndDate);
  console.log("date param iso:", prevEndIso);
  const previousEndDateParsed = parseISO(prevEndIso);
  console.log("date param iso parsed:", previousEndDateParsed);

  // NB: convert dateString to JS date object
  const jsObjPreviousEnd = convertDateStringToJsObject(previousEndDateParsed);
  console.log('date param js obj:', jsObjPreviousEnd)

  if (jsObjPreviousEnd instanceof Date) {
    return addDays(previousEndDateParsed, purityDays);
  } else {
    console.error("Invalid date:", previousEndDateParsed);
  }
};

export const convertJsDateObjectToString = (parsedDate) => {
  if (parsedDate) {
    return format(parsedDate, "yyyy-MM-dd");
  } else {
    console.error("Invalid date:", parsedDate);
  }
};

export const convertStringDateToISODate = (stringDate) => {
  return `${stringDate}T00:00:00.000Z`;
};

export const isISODate = (dateString) => {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  return isoDatePattern.test(dateString);
};

export const convertDateStringToJsObject = (dateString) => {
  return new Date(dateString);
};
