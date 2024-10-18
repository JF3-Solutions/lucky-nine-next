import { ROLES } from '@/models/Roles.enum';
import { UsersInterface } from '@/models/User.interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define una interfaz para el estado
interface UsersInterfaceGlobalState extends UsersInterface {
  setUserInfo: (userInfo: UsersInterface) => void;
}

// Usa el tipo en el store
export const useUserInfoStore = create<UsersInterfaceGlobalState>()(
  persist(
    (set) => ({
      // Estado inicial
      name: '',
      email: '',
      username: '',
      lastName: '',
      role: ROLES.USER,
      verified: false,
      cedula: '',
      saldo: 0,
      pagoMoviles: [],

      // Función para actualizar la información del usuario
      setUserInfo: (userInfo: UsersInterface) => {
        set({
          name: userInfo.name,
          email: userInfo.email,
          username: userInfo.username,
          lastName: userInfo.lastName,
          role: userInfo.role,
          verified: userInfo.verified,
          cedula: userInfo.cedula,
          saldo: userInfo.saldo,
          pagoMoviles: userInfo.pagoMoviles,
        });
      },
    }),
    {
      name: 'user-info', // nombre del almacenamiento persistente
    }
  )
);
