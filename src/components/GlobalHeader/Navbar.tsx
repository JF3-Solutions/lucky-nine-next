"use client"
import {FC,useState,useEffect,useCallback} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {RxHamburgerMenu} from 'react-icons/rx';
import {IoClose} from 'react-icons/io5';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import Balance from './balance';
import ItemsMenu from './ItemsMenu';
import ButtonNav from './ButtonNav';

const NavBar: FC<{showBackButton?: boolean}>=({showBackButton}) => {
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const pathname: string=usePathname(); // Usamos usePathname para obtener la ruta actual
    // Simular los valores de autenticación
    const isAuthenticated=false; // Simula si el usuario está autenticado o no
    const loading=false; // Simula el estado de carga
    const userData={saldo: 1000}; // Simula los datos de usuario

    const ItemUrl=isAuthenticated? [
        {name: 'Inicio',href: '/dashboard'},
        {name: 'Perfil',href: '/profile'},
        {name: 'Pago Movil',href: '/add-to-bank'},
        {name: 'Retiro',href: '/deposit-or-withdrawal'},
        {name: 'Deposito',href: '/deposit-or-withdrawal'},
        {name: 'Soporte',href: '/support'},
        {
            name: 'Cerrar sesión',href: '/auth/sign-in',onClick: () => {
                console.log('Cerrar sesión');
            }
        },
    ]
        :[
            {name: 'Iniciar sesión',href: '/sign-in'},
            {name: 'Registrar cuenta',href: '/sign-up'},
            {name: 'Soporte',href: '/support'},
        ];

    // Filtramos los elementos del menú según la ruta actual usando pathname
    const filteredItems=ItemUrl.filter(item => pathname!==item.href);

    const toggleMenu=() => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside=useCallback(
        (event: MouseEvent) => {
            const target=event.target as HTMLElement;
            if(isMenuOpen&&!target.closest('.menu-container')&&!target.closest('.menu-icon')) {
                setIsMenuOpen(false);
            }
        },
        [isMenuOpen]
    );

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[handleClickOutside]);

    if(loading) {
        return <p>Cargando...</p>;
    }

    return (
        <nav className="mx-4 w-full max-w-[1200px]">
            <ul className="flex flex-row justify-between w-full items-center my-1">
                {isAuthenticated? (
                    <li className="flex mt-2">
                        <Link href={'/'}>
                            <Logo className="w-[6rem]" src={'/Logo/3.png'} alt={'Lucky9'} />
                        </Link>
                        {userData&&<Balance balance={userData.saldo} />}
                    </li>
                ):(
                    showBackButton&&(
                        <li>
                            <ButtonNav onClick={() => window.history.back()} className="flex justify-center items-center w-10 bg-transparent">
                                <FaArrowLeft className="text-blue-800" size={20} />
                            </ButtonNav>
                        </li>
                    )
                )}
                <li className={`menu-icon ${isMenuOpen? 'transition-all duration-1000 rotate-360':'transition-all duration-1000 rotate-180'}`}>
                    {isMenuOpen? (
                        <IoClose className="text-gray-400 m-2 h-7 w-7" onClick={toggleMenu} />
                    ):(
                        <div className="flex justify-center items-center w-10 bg-transparent">
                            <RxHamburgerMenu className="text-blue-800 m-2" size={28} onClick={toggleMenu} />
                        </div>
                    )}
                </li>
            </ul>

            {isMenuOpen&&(
                <div className="menu-container z-10 bg-black absolute p-2 top-14 right-0 border-2 border-t-0 w-1/2 xl:mr-24 border-blue-800 rounded-lg rounded-t-none">
                    {filteredItems.map((item,index) => (
                        <div key={index}>
                            <ItemsMenu href={item.href} name={item.name} onClick={item.onClick} />
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
