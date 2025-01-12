interface PrimaryButtonInterface {
  label: string;
  type: 'button'|'submit'|'reset';
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean

}

const PrimaryButton=({
  onClick,
  label,
  type,
  loading=false,
  className,
  disabled
}: PrimaryButtonInterface) => {
  return (
    <button
      type={type}
      className={`bg-blue-800 font-semibold text-gray-100 hover:text-white w-full rounded-l h-10 max-w-[425px]  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading? <>Cargando...</>:<>{label}</>}
    </button>
  );
};

export default PrimaryButton;
