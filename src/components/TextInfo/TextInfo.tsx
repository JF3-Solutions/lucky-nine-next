import Link from 'next/link';

const TextInfo = () => {
  return (
    <div className='text-center flex flex-col items-center'>
      <h3 className='hidden md:block md:text-gray-200'>
        Bienvenido a Lucky Nine
      </h3>
      <p className='text-gray-200 w-64 text-center hidden md:block'>
        <Link className='text-blue-800' href='/sign-up'>
          Registrate
        </Link>{' '}
        o{' '}
        <Link className='text-blue-800' href='/sign-in'>
          {' '}
          inicia sesión
        </Link>
        {''} para empezar a divertirte y ... ¡Ganar!
      </p>
    </div>
  );
};

export default TextInfo;
