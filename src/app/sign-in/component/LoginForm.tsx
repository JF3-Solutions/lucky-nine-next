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
        className='flex-1 flex flex-col w-full items-center md:max-w-[425px] px-6 py-6 justify-between  md:gap-12'
      >
        <div className='flex flex-col gap-4 md:mb-4 w-full md:max-w-[425px]'>
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
          <div className='flex flex-col w-full md:max-w-[425px]'>
            <InputPassword
              value={formData.password}
              handleChange={handleChange}
              label='Contraseña'
              name='password'
              error={emptyPassword}
              required={true}
            />
            <Link
              className='text-white text-[12px] text-right mt-[6px]'
              href={'/forgot-password'}
            >
              ¿Olvidaste Contraseña?
            </Link>
          </div>
        </div>
        <PrimaryButton
          label='Iniciar sesion'
          type='submit'
          loading={buttonLoading}
          className='max-w-[250px]'
        />
      </form>
    </>
  );
};

export default LoginForm;
