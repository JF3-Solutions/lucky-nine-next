import LuckyInfo from '@/components/LuckyInfo/LuckyInfo';
import PrimaryTitle from '@/components/PrimaryTitle/PrimaryTitle';
import { ToastContainer } from 'react-toastify';
import VerifyForm from './components/VerifyForm';

const VerifyPage = () => {
  return (
    <main className='min-h-[calc(100dvh-60px)] flex flex-col md:max-w-[80vw] md:mx-auto'>
      <ToastContainer
        theme='colored'
        draggable
        className='md:w-[600px]'
        containerId='verifyToastify'
      />
      <section className='flex flex-col md:flex-row md:h-dvh md:w-full md:justify-evenly md:items-start pt-6'>
        <LuckyInfo />
        <div className='flex flex-col gap-4 w-full items-center'>
          <PrimaryTitle title={'Verificar cuenta'} />
          <VerifyForm />
        </div>
      </section>
    </main>
  );
};
export default VerifyPage;
