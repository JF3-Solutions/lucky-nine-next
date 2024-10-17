import apiAdapter from '@/adapters/api.adapter';

export const getData = async () => {
  try {
    const response = await apiAdapter.get(`${process.env.API_URL}data/getData`);
    // Se destructura data, porque del backend se recibe un objeto data
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
