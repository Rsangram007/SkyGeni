import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching /api/${endpoint}:`, error);
    throw error;
  }
};