import axiosInstance from '../interceptors/axiosInterceptor';
import { User } from '../models/User';

export const getUserData = async (): Promise<User> => {
  const response = await axiosInstance.get<User>('/client/getDataUser');
  return response.data;
};
