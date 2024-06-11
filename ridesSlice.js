import { createSlice } from '@reduxjs/toolkit';

const ridesSlice = createSlice({
  name: 'rides',
  initialState: [],
  reducers: {
    addRide: (state, action) => {
      state.push(action.payload);
    },
    setRides: (state, action) => {
      return action.payload;
    }
  },
});

export const { addRide, setRides } = ridesSlice.actions;

export const selectAllRides = state => state.rides;

export default ridesSlice.reducer;
