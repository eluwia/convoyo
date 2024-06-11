// store.js
import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import profileReducer from './slices/profileSlice';
import ridesReducer from './slices/ridesSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    profile: profileReducer,
    rides: ridesReducer
  },
});

export default store;
