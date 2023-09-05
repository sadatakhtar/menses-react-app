import { isValid } from "date-fns";
import firebase from "../FirebaseConfig";

export const convertStringDateToFirebaseTimestamp = (string) => {
  const dateString = string;
  const dateObject = new Date(dateString);
  if(isValid(dateObject)){
    return firebase.firestore.Timestamp.fromDate(dateObject);
  } else {
    console.error('Invalid date object:', dateObject)
  }

};
