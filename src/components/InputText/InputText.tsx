import { ChangeEvent, FC, ReactNode } from 'react';

interface InputProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  name: string;
  error: boolean;
  required?: boolean;
  icon?: ReactNode;
}

const InputText: FC<InputProps> = ({
  value,
  handleChange,
  label,
  type,
  name,
  required = false,
  icon,
  error,
}) => {
  return (
    <div className='relative w-full'>
      {icon ? <div className='absolute right-3 top-3'>{icon}</div> : null}
      <label
        className={`absolute transition-all pointer-events-none ${
          value.length > 0
            ? 'text-[12px] top-[5px] left-[10px]'
            : 'top-[18px] left-[10px]'
        }`}
      >
        {label}
      </label>
      <input
        className={`w-full h-[54px] rounded bg-black-p border-[2px] outline-none focus:border-primary transition-all pl-2 pt-2 ${
          icon ? 'pr-[45px]' : ''
        } ${error ? 'border-error' : 'border-black-p'}`}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default InputText;
