import {ROLES} from '@/models/Roles.enum';
import {UsersInterface} from '@/models/User.interface';
import {create} from 'zustand';
import Cookies from 'js-cookie';
import {persist} from 'zustand/middleware';

// Define una interfaz para el estado
interface UsersInterfaceGlobalState extends UsersInterface {
  setUserInfo: (userInfo: UsersInterface) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Usa el tipo en el store
export const useUserInfoStore=create<UsersInterfaceGlobalState>()(
  persist(
    (set) => ({
      // Estado inicial
      name: '',
      email: '',
      username: '',
      lastName: '',
      password: '',
      role: ROLES.USER,
      verified: false,
      cedula: '',
      saldo: 0,
      pagoMoviles: [],
      isAuthenticated: false,

      // Función para actualizar la información del usuario
      setUserInfo: (userInfo: UsersInterface) => {
        set({
          name: userInfo.name,
          email: userInfo.email,
          username: userInfo.username,
          lastName: userInfo.lastName,
          password: userInfo.password,
          role: userInfo.role,
          verified: userInfo.verified,
          cedula: userInfo.cedula,
          saldo: userInfo.saldo,
          pagoMoviles: userInfo.pagoMoviles,
        });
      },

      // Función para loguearse (pasar isAuth.. a true)
      login: () => {
        set({
          isAuthenticated: true,
        });
      },

      // Función para desloguearse (Afuera se tendra que redirigir)
      logout: () => {
        set({
          name: '',
          email: '',
          username: '',
          lastName: '',
          role: ROLES.USER,
          verified: false,
          cedula: '',
          saldo: 0,
          pagoMoviles: [],
          isAuthenticated: false,
        });

        Cookies.remove('token');
        Cookies.remove('refresh');
        // Redirigimos al home con window para reiniciar el cache de todas las rutas
        window.location.href='/';
      },
    }),
    {
      name: 'user-info', // nombre del almacenamiento persistente
    }
  )
);
