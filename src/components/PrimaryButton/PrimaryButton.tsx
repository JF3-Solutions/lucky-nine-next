interface PrimaryButtonInterface {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

const PrimaryButton = ({
  onClick,
  label,
  type,
  loading = false,
  className,
}: PrimaryButtonInterface) => {
  return (
    <button
      type={type}
      className={`bg-red-500 py-2 rounded-lg ${className}`}
      onClick={onClick}
    >
      {loading ? <>Cargando...</> : <>{label}</>}
    </button>
  );
};

export default PrimaryButton;
