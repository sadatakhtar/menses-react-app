import FirebaseFirestoreService from "../FirebaseFirestoreService";

export const handleAddCycleDetails = async (newDetails) => {
  try {
    const response = await FirebaseFirestoreService.createDocument(
      "cycle_details",
      newDetails
    );

    // TODO: fetch new cycle details from firestore

    alert(`Successfully added cycle details with ID = ${response.id}`);
  } catch (error) {
    alert(error.message);
  }
};
