import axios from 'axios';

export const isAccessExpired = async (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const token = error.response?.headers['token'];

    if (token) {
      if (error.response?.status === 403) {
        // Si el codigo es 403 retornamos true para saber que debemos hacer la petición nuevamente
        return 1;
      } else {
        // Si el codigo es diferente a 403, retornamos false para ejecutrar la logica correspondiente
        return 2;
      }
    } else {
      // En los demas casos devolvemos 3, no tenemos que hacer nada
      // Cerrar sesión
      // logout()
      return 3;
    }
  } else {
    // Cerrar sesión
    // logout();
    return 3;
  }
};
