import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const accountIndustrySlice = createSlice({
  name: 'accountIndustry',
  initialState,
  reducers: {
    fetchAccountIndustryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAccountIndustrySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAccountIndustryError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAccountIndustryRequest,
  fetchAccountIndustrySuccess,
  fetchAccountIndustryError,
} = accountIndustrySlice.actions;

export default accountIndustrySlice.reducer;