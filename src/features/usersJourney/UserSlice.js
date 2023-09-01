import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Add new states here

  userStatus: "Admin",
  loggedInUser: "",
  userEmail: "",
  purityCycleDays: 0,
};

export const userSlice = createSlice({
  name: "userJourney",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setPurityCycleDays: (state, action) => {
      state.purityCycleDays = action.payload;
    },
  },
});

export const {
  setUserStatus,
  setValue,
  setLoggedInUser,
  setUserEmail,
  setPurityCycleDays,
} = userSlice.actions;

// The functions below are called selectors and allow us to select a value from the state.
export const getUserStatus = (state) => state.userSlice.userStatus;
export const getValue = (state) => state.userSlice.value;
export const getLoggedInUser = (state) => state.userSlice.loggedInUser;
export const getUserEmail = (state) => state.userSlice.userEmail;
export const getPurityCycleDays = (state) => state.userSlice.purityCycleDays;

export default userSlice.reducer;
