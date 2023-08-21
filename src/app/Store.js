import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/usersJourney/UserSlice'

export const store = configureStore({
    reducer: {
        userSlice: userReducer
    }
})