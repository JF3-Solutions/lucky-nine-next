'use client';
import {isEmailValid} from '@/utilities/validation';
import InputText from '@/components/InputText/InputText';

import {MdOutlineEmail} from 'react-icons/md';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import InputPassword from '@/components/InputPassword/InputPassword';
import {useLoginForm} from '../hooks/useLoginForm';
import Link from 'next/link';

const LoginForm=() => {
  const {
    formData,
    buttonLoading,
    emptyEmail,
    emptyPassword,
    handleChange,
    handleSubmit,
  }=useLoginForm();
  return (
    <>
      <form
        action=''
        onSubmit={handleSubmit}
        className="flex flex-col justify-between w-full h-svh items-center max-w-[425px] md:mt-10"
      >
        <div className='flex flex-col gap-4'>
          <InputText
            value={formData.email}
            handleChange={handleChange}
            type='email'
            name='email'
            required={true}
            label='Correo electronico'
            error={
              emptyEmail||
                (formData.email.length>0&&!isEmailValid(formData.email))
                ? true
                :false
            }
            icon={<MdOutlineEmail className='w-[25px] h-[25px]' />}
          />
          <div className='flex flex-col'>
            <InputPassword
              value={formData.password}
              handleChange={handleChange}
              label='Contraseña'
              name='password'
              error={emptyPassword}
              required={true}
            />
            <Link className='text-white text-[12px] text-right mt-[6px]' href={'/forgot-password'}>¿Olvidaste Contraseña?</Link>
          </div>
        </div>
        <PrimaryButton
          label='Iniciar sesion'
          type='submit'
          loading={buttonLoading}
          className='w-[50%] '
        />
      </form>
    </>
  );
};

export default LoginForm;
