import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Add new states here

  userStatus: "Admin",
  loggedInUser: "",
  userEmail: "",
  purityCycleDays: 0,
  userName: '',
  userAge: 0,
  establishedCycleStartDate: null,
  establishedCycleEndDate: null,

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
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserAge: (state, action) => {
      state.userAge = action.payload;
    },
    setEstablishedCycleStartDate: (state, action) => {
      state.establishedCycleStartDate = action.payload;
    },
    setEstablishedCycleEndDate: (state, action) => {
      state.establishedCycleEndDate = action.payload;
    },
  
  },
});

export const {
  setUserStatus,
  setValue,
  setLoggedInUser,
  setUserEmail,
  setPurityCycleDays,
  setUserName,
  setUserAge,
  setEstablishedCycleStartDate,
  setEstablishedCycleEndDate,
  
} = userSlice.actions;

// The functions below are called selectors and allow us to select a value from the state.
export const getUserStatus = (state) => state.userSlice.userStatus;
export const getValue = (state) => state.userSlice.value;
export const getLoggedInUser = (state) => state.userSlice.loggedInUser;
export const getUserEmail = (state) => state.userSlice.userEmail;
export const getPurityCycleDays = (state) => state.userSlice.purityCycleDays;
export const getUserName = (state) => state.userSlice.userName;
export const getUserAge = (state) => state.userSlice.userAge;
export const getEstablishedCycleStartDate = (state) => state.userSlice.establishedCycleStartDate;
export const getEstablishedCycleEndDate = (state) => state.userSlice.establishedCycleEndDate;

export default userSlice.reducer;
