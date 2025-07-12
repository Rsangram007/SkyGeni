import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    fetchTeamRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTeamSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchTeamError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTeamRequest,
  fetchTeamSuccess,
  fetchTeamError,
} = teamSlice.actions;

export default teamSlice.reducer;