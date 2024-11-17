import apiAdapter from '@/adapters/api.adapter';
import Cookies from 'js-cookie';

export const getDataUser = async () => {
  const token = Cookies.get('token');
  const refresh = Cookies.get('refresh');
  try {
    const response = await apiAdapter.get(
      `${process.env.NEXT_PUBLIC_API_URL}client/getDataUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          refresh_token: refresh,
        },
      }
    );
    // Se destructura data, porque del backend se recibe un objeto data
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
