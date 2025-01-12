import { useState, type FormEvent } from 'react';
import { useToastify } from '@/hooks/useToastify';
import axios from 'axios';
import { resendCode, verify } from '../services/verify';
import { setUserInfoAdapter } from '@/adapters/userInfo.adapter';
import Cookies from 'js-cookie';
import { useUserInfoStore } from '@/store/useUserInfoStore';

export const useVerifyForm = () => {
  const { setUserInfo, login: loginUI } = useUserInfoStore();

  // ------------- State ------------- //
  const [code, setCode] = useState<string[]>(Array(6).fill('')); // Estado para almacenar los dígitos del código
  const [error, setError] = useState<string>(''); // Estado para errores
  const { toastifyError, toastifyInfo } = useToastify();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Estado para manejar el envío

  // Recuperar el email desde sessionStorage
  const email = sessionStorage.getItem('verify') || '';

  // ------------- Functions ------------- //

  // Manejar cambios en cada input de código
  const handleChange = async (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return; // Solo permitir un dígito numérico

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Enfocar el siguiente input automáticamente si se ingresa un dígito
    if (value && index < 5) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Si el valor se elimina (vacío) y no estamos en el primer input, enfocar el input anterior
    if (!value && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }

    // Si estamos en el último dígito y todos están llenos, enviamos el formulario
    if (index === 5 && newCode.every((digit) => digit !== '')) {
      await submitCode(newCode.join(''));
    }
  };

  // Manejar el evento de pegar (onPaste)
  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text'); // Obtener el texto pegado
    if (!/^\d+$/.test(pastedData)) return; // Validar que solo se peguen números

    const pastedArray = pastedData.slice(0, 6).split(''); // Dividir en un máximo de 6 caracteres
    const newCode = [...code];

    // Rellenar el código con los valores pegados
    pastedArray.forEach((char, idx) => {
      if (idx < newCode.length) {
        newCode[idx] = char;
      }
    });

    setCode(newCode);

    // Enfocar el input del último carácter y
    // Si estamos en el último dígito y todos están llenos, enviamos el formulario
    if (newCode?.length === 6) {
      await submitCode(newCode.join(''));
      const nextInput = document.getElementById(`input-${5}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Enviar el código de verificación
  const submitCode = async (verificationCode: string) => {
    setError('');

    if (verificationCode.length !== 6) {
      setError('Por favor, ingresa los 6 dígitos del código.');
      return;
    }

    try {
      const response = await verify({ email, verificationCode });
      if (response.status === 200) {
        const message: string = response.data.message;
        toastifyInfo(message, 'verifyToastify');

        setTimeout(() => {
          // Adapto los datos que recibo
          const adaptedData = setUserInfoAdapter(response.data.data);

          // Los seteo en el estado global
          setUserInfo(adaptedData);
          // Guardar token en las cookies & LocalStorage
          Cookies.set('token', response?.data?.data?.token);
          Cookies.set('refresh', response?.data?.data?.refresh);

          loginUI();

          // Redirigimos al home con window para reiniciar el cache de las rutas
          window.location.href = '/';
        }, 5000);

        return;
      }
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message: string = error.response.data.message;
        toastifyError(message, 'verifyToastify');
      }
    }
  };
  const handleResendCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await resendCode({ email });
      if (response.status === 200) {
        toastifyInfo(
          `El codigo de verificacion ha sido reenviado a ${email}.`,
          'verifyToastify'
        );
        setIsSubmitting(true);
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message: string = error.response.data.message;
        toastifyError(message, 'verifyToastify');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    code,
    error,
    isSubmitting,
    handleChange,
    handleResendCode,
    handlePaste,
  };
};
