'use client';
import { isEmailValid } from '@/utilities/validation';
import InputText from '@/components/InputText/InputText';
import { useEmptyInput } from '@/hooks/useEmptyInput';
import { MdOutlineEmail } from 'react-icons/md';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { login } from '../services/login';

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const emptyEmail = useEmptyInput(formData.email);

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
        console.log(res);
      })
      .catch((error: AxiosError) => {
        // Manejar el error
        console.log(error);
        if (error.status === 401) {
          // Redireccionar a la vista de verify (usuario no verificado)
          console.log('Redireccionar');
        } else {
          // Mostrar toast con el mensaje de error.
          console.log('Mostrar toast');
        }
      })
      .finally(() => setButtonLoading(false));
  };

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

      <div>
        <input type='password' name='password' onChange={handleChange} />
      </div>
      <button type='submit'>{buttonLoading ? 'Cargando..' : 'Enviar'}</button>
    </form>
  );
};

export default LoginForm;
