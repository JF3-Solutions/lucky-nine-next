import { ChangeEvent, FormEvent, useState } from 'react';
import { useEmptyInput } from '@/hooks/useEmptyInput';
import axios from 'axios';
import { useToastify } from '@/hooks/useToastify';
import { useRouter } from 'next/navigation';
import { resendCode } from '@/app/verify/services/verify';

interface ForgotPasswordForm {
  email: string;
  password: string;
  code: string;
}

export const useForgotPasswordForm = () => {
  // States
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: '',
    password: '',
    code: '',
  });
  const [stepSelected, setStepSelected] = useState<string>('stepOne');
  const [step, setStep] = useState<string[]>(['stepTwo']);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  //   Hooks
  const emptyEmail = useEmptyInput(formData.email);
  const emptyPassword = useEmptyInput(formData.password);
  const emptyCode = useEmptyInput(formData.code);
  const { toastifyError, toastifySuccess, toastifyInfo } = useToastify();
  const router = useRouter();

  // Función para controlar los valores de los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // *--------------* //
    // Prevalidaciones //
    // *------------* //

    // Correo
    if (name === 'email') {
      if (value.length > 250) {
        return;
      }
    }

    if (name === 'code') {
      if (value.length > 6) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   Función que envia la petición para recibir el codigo
  const forgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);

    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}auth/forgotPassword`, formData)
        .then(() => {
          toastifySuccess(
            'Hemos enviado un correo con el código de verificación.',
            'globalToastify'
          );
          setStepSelected('stepTwo');
          setStep(['stepOne']);
        });
    } catch (error) {
      // Validamos si es un error de axios
      if (axios.isAxiosError(error)) {
        // Si del back se recibe un message, se muestra.
        if (error.response?.data?.message) {
          toastifyError(error.response?.data?.message, 'globalToastify');
        } else {
          toastifyError(
            'Ha ocurrido un error, por favor intenta mas tarde.',
            'globalToastify'
          );
        }
      } else {
        // Error generico
        toastifyError(
          'Ha ocurrido un error, por favor intenta mas tarde.',
          'globalToastify'
        );

        console.log(error);
      }
    } finally {
      setLoadingButton(false);
    }
  };

  // Función para validaciónes que habiliten el boton de iniciar sesión
  const isHandleSubmitEnable = () => {
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasMinLength = formData.password.length >= 8;

    return !(
      hasUpperCase &&
      hasNumber &&
      hasMinLength &&
      formData.code.length === 6
    );
  };

  //   Función para enviar el cambio de contraseña
  const recoveryPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);

    const data = {
      email: formData.email,
      password: formData.password,
      verificationCode: formData.code,
    };
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}auth/recoveryPassword`, data)
        .then(() => {
          toastifySuccess(
            'Has actualizado tu contraseña correctamente.',
            'globalToastify'
          );
          setTimeout(() => {
            router.replace('/sign-in');
          }, 2000);
        });
    } catch (error) {
      // Validamos si es un error de axios
      if (axios.isAxiosError(error)) {
        // Si del back se recibe un message, se muestra.
        if (error.response?.data?.message) {
          toastifyError(error.response?.data?.message, 'globalToastify');
        } else {
          toastifyError(
            'Ha ocurrido un error, por favor intenta mas tarde.',
            'globalToastify'
          );
        }
      } else {
        // Error generico
        toastifyError(
          'Ha ocurrido un error, por favor intenta mas tarde.',
          'globalToastify'
        );

        console.log(error);
      }
    } finally {
      setLoadingButton(false);
    }
  };

  //   Función para reenviar el código de verificación
  const handleResendCode = async () => {
    const { email } = formData;
    try {
      const response = await resendCode({ email });
      if (response.status === 200) {
        toastifyInfo(
          `El codigo de verificacion ha sido reenviado a ${email}.`,
          'globalToastify'
        );
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message: string = error.response.data.message;
        toastifyError(message, 'globalToastify');
      }
    }
  };

  return {
    stepSelected,
    step,
    loadingButton,
    emptyEmail,
    emptyPassword,
    emptyCode,
    handleChange,
    forgotPassword,
    isHandleSubmitEnable,
    recoveryPassword,
    handleResendCode,
    formData,
  };
};
