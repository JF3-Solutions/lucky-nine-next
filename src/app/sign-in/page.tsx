import { ToastContainer } from 'react-toastify';
import LoginForm from './component/LoginForm';

const SignInPage = () => {
  return (
    <main>
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='loginToastify'
      />
      <h1>Iniciar sesion</h1>
      <LoginForm />
    </main>
  );
};
export default SignInPage;
