import {ChangeEvent,FC,ReactNode} from 'react';

interface InputProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  name: string;
  error?: boolean;
  required?: boolean;
  placeholder?: string

  icon?: ReactNode;
}

const InputText: FC<InputProps>=({
  value,
  handleChange,
  label,
  type,
  name,
  required=false,
  icon,
  error,
}: InputProps) => {
  return (
    <div className='relative w-full'>
      {icon? <div className='absolute right-3 top-3 text-blue-800'>{icon}</div>:null}
      <label
        className={`absolute transition-all pointer-events-none ${value.length>0
          ? 'text-[12px] top-[2px] left-[10px] text-blue-700'
          :'top-[10px] left-[10px] text-gray-400'
          }`}
      >
        {label}
      </label>
      <input
        className={`w-full h-[44px] rounded bg-transparent text-[15px] text-gray-400 border-[1px] border-blue-800 outline-none focus:border-primary transition-all px-2 pt-2 ${icon? 'pr-[45px]':''
          } ${error? 'border-error':'border-black-p'}`}
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
