interface PrimaryButtonInterface {
  label: string;
  type: 'button'|'submit'|'reset';
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

const PrimaryButton=({
  onClick,
  label,
  type,
  loading=false,
  className,
}: PrimaryButtonInterface) => {
  return (
    <button
      type={type}
      className={`bg-blue-800 font-semibold text-gray-100 hover:text-white w-full rounded-l h-10 max-w-[425px]  ${className}`}
      onClick={onClick}
    >
      {loading? <>Cargando...</>:<>{label}</>}
    </button>
  );
};

export default PrimaryButton;
