import publicApi from '@/adapters/publicApi.adapter';
import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await publicApi.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      {
        email,
        password,
      }
    );
    // Retorna directamente la respuesta de axios
    return response;
  } catch (error: unknown) {
    // Si el error es una respuesta de axios, lo puedes lanzar para que se maneje en el componente
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Error desconocido');
    }
  }
};
