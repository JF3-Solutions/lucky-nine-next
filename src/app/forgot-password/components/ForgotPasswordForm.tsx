'use client';
import InputText from '@/components/InputText/InputText';
import { Button, Tab, Tabs } from '@nextui-org/react';
import { MdArrowForwardIos, MdOutlineEmail } from 'react-icons/md';
import { isEmailValid } from '@/utilities/validation';
import InputPassword from '@/components/InputPassword/InputPassword';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

const ForgotPasswordForm = () => {
  const {
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
  } = useForgotPasswordForm();
  return (
    <>
      {/* Tab */}
      <Tabs
        disabledKeys={step}
        color='primary'
        selectedKey={stepSelected}
        classNames={{
          tabList: 'bg-black-p',
        }}
      >
        <Tab key='stepOne' title='Ingresa tu correo'></Tab>
        <Tab key='stepTwo' title='Cambiar contraseña'></Tab>
      </Tabs>

      {/* Email Input / cambio de contraseña */}
      {stepSelected === 'stepOne' ? (
        <form
          onSubmit={forgotPassword}
          className='w-full flex flex-col gap-3 items-center'
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

          {/* Iniciar sesión */}
          <Button
            isLoading={loadingButton}
            type='submit'
            color='primary'
            className='w-full max-w-[200px] disabled:bg-neutral'
            disabled={!isEmailValid(formData.email)}
          >
            Continuar
          </Button>
        </form>
      ) : (
        <form
          onSubmit={recoveryPassword}
          className='w-full flex flex-col gap-3 items-center'
        >
          <InputText
            value={formData.code}
            handleChange={handleChange}
            type='text'
            name='code'
            required={true}
            label='Código de confirmación'
            error={
              emptyCode ||
              (formData.code.length > 0 && formData.code.length < 6)
                ? true
                : false
            }
          />

          {/* Password Input */}
          <InputPassword
            value={formData.password}
            handleChange={handleChange}
            label='Contraseña'
            name='password'
            required={true}
            requeriments={true}
            firstInput={
              (!emptyPassword && formData.password.length > 0) || emptyPassword
            }
            error={
              emptyPassword ||
              (formData.password.length > 0 && formData.password.length < 8)
            }
          />

          {/* Cambiar contraseña */}
          <Button
            isLoading={loadingButton}
            type='submit'
            color='primary'
            className='w-full max-w-[200px] disabled:bg-neutral'
            disabled={isHandleSubmitEnable()}
          >
            Cambiar contraseña
          </Button>

          <div className='text-[12px] font-semibold flex gap-2'>
            ¿No te llego correo electronico?{' '}
            <button
              type='button'
              onClick={handleResendCode}
              className='flex items-center gap-0.5 text-primary'
            >
              Reenviar <MdArrowForwardIos />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
