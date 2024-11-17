import { useUserInfoStore } from '@/store/useUserInfoStore';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// Hook para verificar que se esta cargando aun la petición de los datos del usuario
// en el cliente, mientras exista una cookie y el isAuthenticated sea false
// significa que aun no se ha resuelto el getDataUser, debido a que
// si esta petición devuelve error (sesión expirada) redirecciona
// al home con window.href y borra las cookies
export function useAuthClientLoading() {
  const { isAuthenticated } = useUserInfoStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const refresh = Cookies.get('token');

    if (refresh && isAuthenticated === false) {
      return;
    }

    setLoading(false);
  }, [isAuthenticated]);

  return { loading };
}
