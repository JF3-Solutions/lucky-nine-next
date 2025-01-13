import LuckyInfo from '@/components/LuckyInfo/LuckyInfo';
import PrimaryTitle from '@/components/PrimaryTitle/PrimaryTitle';
import { ToastContainer } from 'react-toastify';
import RegisterForm from './components/RegisterForm';

const SignIn = () => {
  return (
    <main className='main-container'>
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='registerToastify'
      />
      <LuckyInfo />
      <section className='flex-1 flex flex-col md:items-center md:my-auto gap-2'>
        <PrimaryTitle title={'Registrar Cuenta'} />
        <RegisterForm />
      </section>
    </main>
  );
};
export default SignIn;
