import { useEmptyInput } from '@/hooks/useEmptyInput';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { login } from '../services/login';
import { useToastify } from '@/hooks/useToastify';
import { useUserInfoStore } from '@/store/useUserInfoStore';
import { useRouter } from 'next/navigation';
import { setUserInfoAdapter } from '@/adapters/userInfo.adapter';
import Cookies from 'js-cookie';

interface LoginForm {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  // Stores
  const { setUserInfo } = useUserInfoStore();

  // States
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  // Hooks
  const emptyEmail = useEmptyInput(formData.email);
  const emptyPassword = useEmptyInput(formData.password);
  const { toastifyError, toastifyInfo } = useToastify();
  const router = useRouter();

  // Función para controlar los valores de los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // *--------------* //
    // Prevalidaciones //
    // *------------* //

    // *-----* //
    // Correo //
    // *---* //
    if (name === 'email') {
      if (value.length > 250) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Se activa el loading del boton
    setButtonLoading(true);

    // Como ya tenemos instanciada la petición, la llamamos directamente
    await login(formData.email, formData.password)
      .then((res) => {
        // Manejar la respuesta correcta

        // Adapto los datos que recibo
        const adaptedData = setUserInfoAdapter(res.data.data);

        // Los seteo en el estado global
        console.log(adaptedData);
        setUserInfo(adaptedData);

        // Guardar token en las cookies
        Cookies.set('token', res?.data?.data?.token);
        Cookies.set('refresh', res?.data?.data?.refresh);

        // Redirigimos al home
        router.replace('/');
      })
      .catch((error: AxiosError) => {
        // Manejar el error
        if (error.status === 401) {
          // Redireccionar a la vista de verify (usuario no verificado)
          toastifyInfo(
            'Hemos enviado un correo de verificación a tu correo electronico.',
            // Notificacion global (layout principal)
            'globalToastify'
          );
          // Guardamos el correo en el sessionStorage para utilizarlo en /resendCode
          sessionStorage.setItem('verify', formData.email);
          router.push('/');
        } else {
          // Mostrar toast con el mensaje de error.
          const message = (error.response?.data as { message: string })
            ?.message;
          toastifyError(message, 'loginToastify');
        }
      })
      .finally(() => setButtonLoading(false));
  };

  return {
    buttonLoading,
    emptyEmail,
    emptyPassword,
    handleChange,
    handleSubmit,
    formData,
  };
};
