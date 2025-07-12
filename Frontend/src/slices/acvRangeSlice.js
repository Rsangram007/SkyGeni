import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const acvRangeSlice = createSlice({
  name: 'acvRange',
  initialState,
  reducers: {
    fetchAcvRangeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAcvRangeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAcvRangeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAcvRangeRequest,
  fetchAcvRangeSuccess,
  fetchAcvRangeError,
} = acvRangeSlice.actions;

export default acvRangeSlice.reducer;