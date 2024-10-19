import {ChangeEvent,FC,useState} from 'react';
import {FaEye} from 'react-icons/fa';
import {FaEyeSlash} from 'react-icons/fa';
import {IoClose} from 'react-icons/io5';
import {IoCheckmark} from 'react-icons/io5';

interface InputProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  error: boolean;
  requeriments?: boolean;
  firstInput?: boolean;
  required?: boolean;
}

// Para que los requerimentos se miren se debe mandar el parametro
// requeriments = true
// Y el firstInput se tiene que enviar asi
// firstInput = (!emptyPassword && formData.password.length > 0) || emptyPassword

const InputPassword: FC<InputProps>=({
  value,
  handleChange,
  label,
  name,
  required=false,
  error,
  firstInput,
  requeriments,
}) => {
  const [showPassword,setShowPassword]=useState<boolean>(false);

  const hasUpperCase=/[A-Z]/.test(value);
  const hasNumber=/[0-9]/.test(value);
  const hasMinLength=value.length>=8;

  return (
    <div className='relative w-full transition-all'>
      <label
        className={`absolute transition-all pointer-events-none ${value.length>0
          ? 'text-[12px] top-[2px] left-[10px] text-blue-700'
          :'top-[10px] left-[10px] text-gray-400'
          }`}
      >
        {label}
      </label>
      <input
        className={`w-full h-[44px] rounded bg-transparent text-[15px] text-gray-400 border-[1px] border-blue-800 outline-none focus:border-primary transition-all pl-2 pt-2 pr-[45px] ${error? 'border-red-500':'border-black-p'
          }`}
        type={showPassword? 'text':'password'}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-3 top-3'
      >
        {showPassword? (
          <FaEyeSlash className='w-[25px] h-[25px] text-blue-800' />
        ):(
          <FaEye className='w-[25px] h-[25px] text-blue-800' />
        )}
      </button>
      {requeriments&&(
        <>
          {firstInput&&(
            <>
              <span
                className={`transition-all flex items-center gap-2 ${hasUpperCase? 'text-green-500':'text-red-500'
                  }`}
              >
                {hasUpperCase? <IoCheckmark />:<IoClose />} Letra mayúscula
              </span>
              <p
                className={`transition-all flex items-center gap-2 ${hasNumber? 'text-green-500':'text-red-500'
                  }`}
              >
                {hasNumber? <IoCheckmark />:<IoClose />} Número
              </p>
              <p
                className={`transition-all flex items-center gap-2  ${hasMinLength? 'text-green-500':'text-red-500'
                  }`}
              >
                {hasMinLength? <IoCheckmark />:<IoClose />} 8 caracteres
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InputPassword;
