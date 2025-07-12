import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const customerTypeSlice = createSlice({
  name: 'customerType',
  initialState,
  reducers: {
    fetchCustomerTypeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerTypeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCustomerTypeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCustomerTypeRequest, fetchCustomerTypeSuccess, fetchCustomerTypeError } = customerTypeSlice.actions;
export default customerTypeSlice.reducer;