import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard";

// Import slice actions
import {
  fetchCustomerTypeRequest,
  fetchCustomerTypeSuccess,
  fetchCustomerTypeError,
} from "./slices/customerTypeSlice";

import {
  fetchAcvRangeRequest,
  fetchAcvRangeSuccess,
  fetchAcvRangeError,
} from "./slices/acvRangeSlice";

import {
  fetchAccountIndustryRequest,
  fetchAccountIndustrySuccess,
  fetchAccountIndustryError,
} from "./slices/accountIndustrySlice";

import {
  fetchTeamRequest,
  fetchTeamSuccess,
  fetchTeamError,
} from "./slices/teamSlice";

// Import named export
import { fetchData } from "./utils/api";

function App() {
  const dispatch = useDispatch();

  const fetchAndDispatch = async (
    endpoint,
    requestAction,
    successAction,
    errorAction
  ) => {
    dispatch(requestAction());
    try {
      const data = await fetchData(endpoint);
      dispatch(successAction(data));
    } catch (error) {
      dispatch(errorAction(error.message));
    }
  };

  useEffect(() => {
    fetchAndDispatch(
      "customer-type",
      fetchCustomerTypeRequest,
      fetchCustomerTypeSuccess,
      fetchCustomerTypeError
    );
    fetchAndDispatch(
      "acv-range",
      fetchAcvRangeRequest,
      fetchAcvRangeSuccess,
      fetchAcvRangeError
    );
    fetchAndDispatch(
      "account-industry",
      fetchAccountIndustryRequest,
      fetchAccountIndustrySuccess,
      fetchAccountIndustryError
    );
    fetchAndDispatch(
      "team",
      fetchTeamRequest,
      fetchTeamSuccess,
      fetchTeamError
    );
  }, [dispatch]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
