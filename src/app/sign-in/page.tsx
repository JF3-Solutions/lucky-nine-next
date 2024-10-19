import {ToastContainer} from 'react-toastify';
import LoginForm from './component/LoginForm';
import PrimaryTitle from '@/components/TitlePage/PrimaryTitle';

const SignInPage=() => {
  return (
    <main className='h-full' >
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='loginToastify'
      />
      <PrimaryTitle title="Iniciar sesion" />
      <LoginForm />
    </main>
  );
};
export default SignInPage;
