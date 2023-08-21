import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Add new states here
  value: 777,
  userStatus: "Admin",
  loggedInUser: "",
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
  },
});

export const { setUserStatus, setValue, setLoggedInUser } = userSlice.actions;

// The functions below are called selectors and allow us to select a value from the state.
export const getUserStatus = (state) => state.userSlice.userStatus;
export const getValue = (state) => state.userSlice.value;
export const getLoggedInUser = (state) => state.userSlice.loggedInUser;

export default userSlice.reducer;
