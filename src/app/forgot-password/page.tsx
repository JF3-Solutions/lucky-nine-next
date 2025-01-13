import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <main className='main-container px-6 md:px-0 justify-center items-center'>
      <div className='flex flex-col items-center w-full max-w-[380px] gap-4 px-6 py-8 rounded-2xl bg-black transition-all max-h-max self-center border border-primary'>
        {/* LOGO */}
        <section className='flex text-[26px]'>
          <h2 className='font-bold text-inherit'>LUC</h2>
          <span className='text-primary font-bold'>KY9</span>
        </section>
        <p className='font-semibold text-[18px]'>Restablecer contraseña</p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPassword;
