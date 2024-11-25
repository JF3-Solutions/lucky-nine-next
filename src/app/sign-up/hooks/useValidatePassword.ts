import { useState } from 'react';

interface PasswordErrors {
  lengthError: boolean;
  uppercaseError: boolean;
  lowercaseError: boolean;
  numberError: boolean;
  symbolError: boolean;
  matchError: boolean;
}

// Hook personalizado para validar contraseñas
export const useValidatePassword = (
  password: string,
  confirmPassword: string
) => {
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors | null>(
    null
  );

  const validatePasswords = () => {
    const errors: PasswordErrors = {
      lengthError: password.length < 8,
      uppercaseError: !/[A-Z]/.test(password),
      lowercaseError: !/[a-z]/.test(password),
      numberError: !/\d/.test(password),
      symbolError: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
      matchError: password !== confirmPassword,
    };

    console.log(errors);
    setPasswordErrors(errors);
  };

  return [passwordErrors, validatePasswords] as const;
};
