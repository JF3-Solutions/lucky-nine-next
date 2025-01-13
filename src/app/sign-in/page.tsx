import { ToastContainer } from 'react-toastify';
import LoginForm from './component/LoginForm';
import PrimaryTitle from '@/components/PrimaryTitle/PrimaryTitle';
import LuckyInfo from '@/components/LuckyInfo/LuckyInfo';

const SignInPage = () => {
  return (
    <main className='main-container'>
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='loginToastify'
      />
      <LuckyInfo />
      {/* Form section */}
      <section className='flex-1 flex flex-col md:items-center md:my-auto gap-2 md:gap-12'>
        {/* Logo y texto */}
        <PrimaryTitle title='Iniciar sesion' />
        {/* Formulario de login */}
        <LoginForm />
      </section>
    </main>
  );
};
export default SignInPage;
