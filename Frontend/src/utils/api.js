import axios from 'axios';

const API_URL = 'https://skygeni-2h7i.onrender.com/api';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching /api/${endpoint}:`, error);
    throw error;
  }
};