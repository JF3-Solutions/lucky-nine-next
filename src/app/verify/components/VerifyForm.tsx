'use client';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import InputVerify from './InputVerify';
import { useVerifyForm } from '@/app/verify/hook/useVerify';

const VerifyForm = () => {
  const {
    code,
    error,
    isSubmitting,
    handleChange,
    handleResendCode,
    handlePaste,
  } = useVerifyForm();

  return (
    <form
      onSubmit={handleResendCode}
      className='flex-1 flex flex-col justify-between w-full h-full items-center gap-12 md:max-w-[425px] px-6 py-6 md:gap-12'
    >
      <div className='flex flex-row items-center justify-center md:mb-4 md:max-w-[425px] gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <InputVerify
            key={index}
            id={`input-${index}`}
            value={code[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            handlePaste={(e) => {
              handlePaste(e);
            }}
          />
        ))}
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <PrimaryButton
        label={isSubmitting ? 'Enviando...' : 'Reenviar código'}
        type='submit'
        className='max-w-[250px]'
        disabled={isSubmitting}
      />
    </form>
  );
};

export default VerifyForm;
