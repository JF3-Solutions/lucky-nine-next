interface InputVerifyProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const InputVerify: React.FC<InputVerifyProps> = ({
  id,
  value,
  onChange,
  handlePaste,
}) => {
  return (
    <div className='relative w-auto'>
      <input
        id={id}
        value={value}
        onChange={onChange}
        maxLength={1}
        onPaste={handlePaste}
        type='text'
        className='w-[35px] h-[35px] rounded bg-transparent text-[15px] text-gray-400 border-[1px] border-blue-800 outline-none focus:border-primary transition-all px-2 pt-2 '
      />
    </div>
  );
};

export default InputVerify;
