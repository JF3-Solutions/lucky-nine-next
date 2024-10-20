import { ToastContainer } from 'react-toastify';
import LoginForm from './component/LoginForm';
import PrimaryTitle from '@/components/PrimaryTitle/PrimaryTitle';
// import Logo from '/Logo.jpg';
import Image from 'next/image';

const SignInPage = () => {
  return (
    <main className='min-h-[calc(100dvh-60px)] flex flex-col pt-4 md:max-w-[80vw] md:mx-auto'>
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='loginToastify'
      />

      {/* Titulo */}
      <PrimaryTitle title='Iniciar sesion' />

      {/* Form section */}
      <section className='flex-1 flex flex-col md:flex-row gap-2'>
        {/* Logo y texto */}
        <div className='w-full flex flex-col items-center justify-center'>
          <figure className='w-[150px] relative h-[150px] rounded-full '>
            <Image
              src='/Logo.jpg'
              fill
              alt='Logo de Lucky Nine'
              className='rounded-full'
            />
          </figure>
          <p>texto</p>
        </div>

        {/* Formulario de login */}
        <LoginForm />
      </section>
    </main>
  );
};
export default SignInPage;
