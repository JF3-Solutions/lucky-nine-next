import Link from 'next/link';

const GlobalHeader=() => {
  return (
    <header className=' bg-blue-500 flex py-5 justify-center items-center gap-4 w-full'>
      <Link href='/'>Inicio</Link>
      <Link href='/sign-in'>Login</Link>
      <Link href='/sign-up'>Registro</Link>
    </header>
  );
};

export default GlobalHeader;
