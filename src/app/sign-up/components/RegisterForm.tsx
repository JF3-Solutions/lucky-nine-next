'use client';
import InputText from '@/components/InputText/InputText';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import InputPassword from '@/components/InputPassword/InputPassword';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { isEmailValid } from '@/utilities/validation';
import InputSelect from '@/components/InputSelect/InputSelect';

const SignIn = () => {
  const {
    formData,
    buttonLoading,
    emptyEmail,
    emptyPassword,
    emptyPasswordConfirm,
    passwordErrors,
    cedulaOptions,
    handleNumberChange,
    handlePrefixChange,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex-1 flex flex-col w-full items-center gap-12 md:max-w-[425px] px-6 py-6 justify-between md:gap-12'
      >
        <div className='flex flex-col gap-4 md:mb-4 w-full md:max-w-[425px]'>
          <div className='flex gap-4'>
            {/* Campo de Nombre */}
            <InputText
              value={formData.name}
              handleChange={handleChange}
              type='text'
              name='name'
              required={true}
              label='Nombre'
            />

            {/* Campo de Apellido */}
            <InputText
              value={formData.lastName}
              handleChange={handleChange}
              type='text'
              name='lastName'
              required={true}
              label='Apellido'
            />
          </div>

          {/* Campo de Username */}
          <InputText
            value={formData.username}
            handleChange={handleChange}
            type='text'
            name='username'
            required={true}
            label='Username'
          />

          {/* Campo de Cedula de identidad */}
          <InputSelect
            name='cedula'
            prefixValue={formData.cedulaPrefix}
            numberValue={formData.cedulaNumber}
            options={cedulaOptions}
            placeholder='Número de cédula'
            onPrefixChange={handlePrefixChange}
            onNumberChange={handleNumberChange}
          />

          {/* Campo de Correo Electrónico */}
          <InputText
            value={formData.email}
            handleChange={handleChange}
            type='email'
            name='email'
            required={true}
            label='Correo Electrónico'
            error={
              emptyEmail ||
              (formData.email.length > 0 && !isEmailValid(formData.email))
            }
          />

          {/* Campo de Contraseña */}
          <InputPassword
            value={formData.password}
            handleChange={handleChange}
            label='Contraseña'
            name='password'
            error={
              !emptyPassword && formData.password.length > 0
                ? passwordErrors?.lengthError || passwordErrors?.uppercaseError
                : emptyPassword
            }
            required={true}
          />

          {/* Campo de Confirmación de Contraseña */}
          <InputPassword
            value={formData.passwordConfirm}
            handleChange={handleChange}
            label='Confirmar Contraseña'
            name='passwordConfirm'
            error={
              !emptyPasswordConfirm && formData.passwordConfirm.length > 0
                ? passwordErrors?.matchError
                : emptyPasswordConfirm
            }
            required={true}
          />
        </div>

        {/* Botón de Registro */}
        <PrimaryButton
          label='Registrar'
          type='submit'
          loading={buttonLoading}
          className='max-w-[250px]'
        />
      </form>
    </>
  );
};

export default SignIn;
