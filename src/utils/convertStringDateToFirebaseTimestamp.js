import firebase from "../FirebaseConfig";

export const convertStringDateToFirebaseTimestamp = (string) => {
  const dateString = string;
  const dateObject = new Date(dateString);
  return firebase.firestore.Timestamp.fromDate(dateObject);
};
