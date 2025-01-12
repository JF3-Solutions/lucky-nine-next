import { useEmptyInput } from '@/hooks/useEmptyInput';
import { useToastify } from '@/hooks/useToastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useValidatePassword } from './useValidatePassword';
import { register } from '../services/register';
import type { AxiosError } from 'axios';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface RegisterForm {
  name: string;
  username: string;
  lastName: string;
  cedulaPrefix: string;
  cedulaNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const useRegisterForm = () => {
  // -------------Store------------//

  // -------------State------------//
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    lastName: '',
    username: '',
    cedulaPrefix: 'V',
    cedulaNumber: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  console.log(formData);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  // -------------Hooks------------//
  // Verificamos el input del email no quede vacío
  const emptyEmail: boolean = useEmptyInput(formData.email);
  // Verificamos el input del password no quede vacío
  const emptyPassword: boolean = useEmptyInput(formData.password);
  const emptyPasswordConfirm: boolean = useEmptyInput(formData.passwordConfirm);
  // Aplicaremos un hook para prevalidaciones de contraseña y confirmacion de contraseñas
  const [passwordErrors, validatePassword] = useValidatePassword(
    formData.password,
    formData.passwordConfirm
  );
  // Aplicamos los componentes toast para pintar las respuestas que recibiremos
  const { toastifyError, toastifyInfo } = useToastify();
  // Manipulamos el redireccionamiento de las paginas con este hooks
  const router: AppRouterInstance = useRouter();
  // Validación general para la longitud de campos específicos
  const validateInputLength: (value: string, maxLength: number) => boolean = (
    value: string,
    maxLength: number
  ): boolean => {
    return value.length <= maxLength;
  };
  const cedulaOptions = [
    { value: 'V', label: 'V' },
    { value: 'E', label: 'E' },
    { value: 'J', label: 'J' },
  ];

  // Manejar cambio en el prefijo de la cédula
  const handlePrefixChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      cedulaPrefix: e.target.value,
    }));
  };

  // Manejar cambio en el número de cédula
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      cedulaNumber: e.target.value,
    }));
  };

  // Creamos una funcion para manipular los cambios de los inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'username' || name === 'lastName') {
      if (!validateInputLength(value, 50)) return;
    } else if (name === 'email') {
      if (!validateInputLength(value, 250)) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    validatePassword();
    console.log(emptyPasswordConfirm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.password, formData?.passwordConfirm]);

  //Creamos la funcion que enviara las peticiones del registro a la DDBB
  const handleSubmit = async (e: FormEvent<Element>): Promise<void> => {
    e.preventDefault();

    //Creamos una copia de formData y excluimos passwordConfirm
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, cedulaPrefix, cedulaNumber, ...dataToSend } =
      formData;

    // Agregar `cedula` combinando prefijo y número
    const cedula = `${cedulaPrefix}-${cedulaNumber}`;
    // Activamos el Loading del boton mientras se realiza la peticion
    setButtonLoading(true);
    // Llamamos la peticion directamente desde register y le pasamos los parametros que vamos a enviar.
    await register({ ...dataToSend, cedula })
      .then((res): void => {
        // Manejamos la respuesta correcta
        if (res.status === 201) {
          // Como el usuario no esta verificado dejamos un mensaje antes del redireccionamiento
          toastifyInfo(
            'Hemos enviado un correo de verificacion a tu correo electronico.',
            //Mostramos el mensaje en el Toast global
            'globalToastify'
          );
          // Guardamos el correo en el sessionStorage para utilizarlo en el /resendCode
          sessionStorage.setItem('verify', formData.email);

          //Al finalizar y si todo esta OK redireccionamos al home
          router.push('/verify');
          return;
        }
        return;
      })
      .catch((error: AxiosError) => {
        // Si tenemos algún error lo manejaremos con condicionales

        // Mostramos el toast con el mensaje que nos envie la DDBB
        const message: string = (error.response?.data as { message: string })
          ?.message;
        toastifyError(message, 'registerToastify');
      })
      .finally((): void => setButtonLoading(false));
  };

  return {
    formData,
    buttonLoading,
    emptyEmail,
    emptyPassword,
    passwordErrors,
    cedulaOptions,
    handlePrefixChange,
    handleNumberChange,
    handleChange,
    handleSubmit,
    emptyPasswordConfirm,
  };
};
