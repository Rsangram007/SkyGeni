import { configureStore } from '@reduxjs/toolkit';
import customerTypeReducer from './slices/customerTypeSlice';
import acvRangeReducer from './slices/acvRangeSlice';
import accountIndustryReducer from './slices/accountIndustrySlice';
import teamReducer from './slices/teamSlice';

const store = configureStore({
  reducer: {
    customerType: customerTypeReducer,
    acvRange: acvRangeReducer,
    accountIndustry: accountIndustryReducer,
    team: teamReducer,
  },
});

export default store;