import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // Add new states here
    value: 777,
    userStatus: 'Admin'
}

export const userSlice = createSlice({
    name: 'userJourney',
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.userStatus = action.payload;
          },
          setValue: (state, action) => {
            state.value = action.payload;
          },
    }
})

export const { setUserStatus, setValue } = userSlice.actions;

// The functions below are called selectors and allow us to select a value from the state.
export const getUserStatus = (state) => state.userSlice.userStatus;
export const getValue = (state) => state.userSlice.value;



export default userSlice.reducer;