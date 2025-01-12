import { Dispatch, SetStateAction } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Balance from './Balance';
import ButtonNav from './ButtonNav';
import Imagen from '../Imagen/Imagen';
import NavbarSkeleton from './NavbarSkeleton';
import { useUserInfoStore } from '@/store/useUserInfoStore';

interface NavBarInterface {
  isMenuOpen: boolean;
  loading: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}
const NavBar = ({ isMenuOpen, setIsMenuOpen, loading }: NavBarInterface) => {
  const { isAuthenticated, logout, saldo } = useUserInfoStore();

  // Estado para saber si el menu esta abierto
  const pathname: string = usePathname(); // Usamos usePathname para obtener la ruta actua

  const ItemUrl = isAuthenticated
    ? [
        { name: 'Inicio', href: '/' },
        // { name: 'Perfil', href: '/profile' },
        // { name: 'Pago Movil', href: '/wallet' },
        // { name: 'Retiros', href: '/withdrawals' },
        // { name: 'Depositos', href: '/deposits' },
        // {name: 'Soporte',href: '/support'},
      ]
    : [
        { name: 'Inicio', href: '/' },
        { name: 'Iniciar sesión', href: '/sign-in' },
        { name: 'Registrar cuenta', href: '/sign-up' },
        // {name: 'Soporte',href: '/support'},
      ];

  // Filtramos los elementos del menú según la ruta actual usando pathname
  const filteredItems = ItemUrl.filter((item) => pathname !== item.href);
  // Filtramos los elementos del menú según la ruta actual usando pathname
  const filteredItems = ItemUrl.filter((item) => pathname !== item.href);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //   Hooks
  const router = useRouter();

  if (loading) {
    return (
      <nav className='flex w-full md:max-w-[80vw] px-6 justify-between items-center'>
        <NavbarSkeleton />
      </nav>
    );
  }
  //   Hooks
  const router = useRouter();

  if (loading) {
    return (
      <nav className='flex w-full md:max-w-[80vw] px-6 justify-between items-center'>
        <NavbarSkeleton />
      </nav>
    );
  }

  return (
    <nav className='w-full md:max-w-[80vw] px-6 relative z-[101]'>
      <ul className='flex flex-row justify-between w-full items-center my-1'>
        {pathname === '/' ? (
          <li className='flex'>
            <Link href={'/'} className='w-[100px]'>
              <Imagen
                className='w-full max-w-[100px] h-[40px]'
                src={'/Logo/logo-md.png'}
                alt={'Lucky9'}
              />
            </Link>
            {isAuthenticated && <Balance balance={saldo} />}
          </li>
        ) : (
          <li className='flex items-center'>
            <ButtonNav
              onClick={() => router.back()}
              className='flex justify-center items-center w-10 bg-transparent lg:hidden'
            >
              <FaArrowLeft className='text-blue-800' size={20} />
            </ButtonNav>
            <Link href={'/'} className='w-[100px] hidden lg:block'>
              <Imagen
                className='w-full max-w-[100px] h-[40px]'
                src={'/Logo/logo-md.png'}
                alt={'Lucky9'}
              />
            </Link>
            {isAuthenticated && <Balance balance={saldo} />}
          </li>
        )}
        <li
          className={`menu-icon ${
            isMenuOpen
              ? 'transition-all duration-400 rotate-360'
              : 'transition-all duration-400 rotate-180'
          }`}
        >
          {isMenuOpen ? (
            <button
              onClick={toggleMenu}
              className='flex justify-center items-center w-10 bg-transparent z-[101]'
            >
              <IoClose className='text-gray-400 m-2 h-7 w-7' />
            </button>
          ) : (
            <button
              onClick={toggleMenu}
              className='flex justify-center items-center w-10 bg-transparent z-[101]'
            >
              <RxHamburgerMenu className='text-blue-800 m-2' size={28} />
            </button>
          )}
        </li>
      </ul>
      return (
      <nav className='w-full md:max-w-[80vw] px-6 relative z-[101]'>
        <ul className='flex flex-row justify-between w-full items-center my-1'>
          {pathname === '/' ? (
            <li className='flex'>
              <Link href={'/'} className='w-[100px]'>
                <Imagen
                  className='w-full max-w-[100px] h-[40px]'
                  src={'/Logo/logo-md.png'}
                  alt={'Lucky9'}
                />
              </Link>
              {isAuthenticated && <Balance balance={saldo} />}
            </li>
          ) : (
            <li className='flex items-center'>
              <ButtonNav
                onClick={() => router.back()}
                className='flex justify-center items-center w-10 bg-transparent lg:hidden'
              >
                <FaArrowLeft className='text-blue-800' size={20} />
              </ButtonNav>
              <Link href={'/'} className='w-[100px] hidden lg:block'>
                <Imagen
                  className='w-full max-w-[100px] h-[40px]'
                  src={'/Logo/logo-md.png'}
                  alt={'Lucky9'}
                />
              </Link>
              {isAuthenticated && <Balance balance={saldo} />}
            </li>
          )}
          <li
            className={`menu-icon ${
              isMenuOpen
                ? 'transition-all duration-400 rotate-360'
                : 'transition-all duration-400 rotate-180'
            }`}
          >
            {isMenuOpen ? (
              <button
                onClick={toggleMenu}
                className='flex justify-center items-center w-10 bg-transparent z-[101]'
              >
                <IoClose className='text-gray-400 m-2 h-7 w-7' />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className='flex justify-center items-center w-10 bg-transparent z-[101]'
              >
                <RxHamburgerMenu className='text-blue-800 m-2' size={28} />
              </button>
            )}
          </li>
        </ul>

        {isMenuOpen && (
          <div className='flex flex-col gap-2 items-start z-10 bg-black-custom absolute p-2 top-[55px] right-0 border-2 border-t-0 w-full max-w-[270px] xl:mr-24 border-blue-800 rounded-lg rounded-t-none'>
            {filteredItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='w-full text-start text-gray-200 text-md px-2'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Cerrar sesión */}
            {isAuthenticated ? (
              <button
                className='w-full text-start text-gray-200 text-md px-2'
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            ) : null}
          </div>
        )}
      </nav>
      );
      {isMenuOpen && (
        <div className='flex flex-col gap-2 items-start z-10 bg-black-custom absolute p-2 top-[55px] right-0 border-2 border-t-0 w-full max-w-[270px] xl:mr-24 border-blue-800 rounded-lg rounded-t-none'>
          {filteredItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='w-full text-start text-gray-200 text-md px-2'
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Cerrar sesión */}
          {isAuthenticated ? (
            <button
              className='w-full text-start text-gray-200 text-md px-2'
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              Cerrar sesión
            </button>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
