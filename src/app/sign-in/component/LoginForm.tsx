'use client';
import { isEmailValid } from '@/utilities/validation';
import InputText from '@/components/InputText/InputText';

import { MdOutlineEmail } from 'react-icons/md';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import InputPassword from '@/components/InputPassword/InputPassword';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginForm = () => {
  const {
    formData,
    buttonLoading,
    emptyEmail,
    emptyPassword,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form
      action=''
      onSubmit={handleSubmit}
      className='max-w-[500px] px-6 mx-auto'
    >
      <InputText
        value={formData.email}
        handleChange={handleChange}
        type='email'
        name='email'
        required={true}
        label='Correo electronico'
        error={
          emptyEmail ||
          (formData.email.length > 0 && !isEmailValid(formData.email))
            ? true
            : false
        }
        icon={<MdOutlineEmail className='w-[30px] h-[30px]' />}
      />

      <InputPassword
        value={formData.password}
        handleChange={handleChange}
        label='Contraseña'
        name='password'
        error={emptyPassword}
        required={true}
      />

      <PrimaryButton
        label='Enviar'
        type='submit'
        loading={buttonLoading}
        className='w-[50%]'
      />
    </form>
  );
};

export default LoginForm;
