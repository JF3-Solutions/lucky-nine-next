import { UsersInterface } from '@/models/User.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUserInfoAdapter = (data: any): UsersInterface => {
  return {
    name: data?.name,
    email: data?.email,
    username: data?.username,
    lastName: data?.lastName,
    role: data?.role,
    verified: data?.verified,
    cedula: data?.cedula,
    saldo: data?.saldo,
    pagoMoviles: data?.pagoMoviles,
  };
};
