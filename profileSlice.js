import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  license: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLicense: (state, action) => {
      state.license = action.payload;
    },
  },
});

export const { setLicense } = profileSlice.actions;

export const selectLicense = (state) => state.profile.license;

export default profileSlice.reducer;
