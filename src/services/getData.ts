import apiAdapter from '@/adapters/api.adapter';

const API_URL = process.env.API_URL;

export const getData = async () => {
  try {
    const response = await apiAdapter.get(`${API_URL}data/getData`);
    // Se destructura data, porque del backend se recibe un objeto data
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
