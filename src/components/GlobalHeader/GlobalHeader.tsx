'use client';
import { useEffect, useState } from 'react';
import NavBar from './Navbar';
import { getDataUser } from '@/services/getDataUser';
import { setUserInfoAdapter } from '@/adapters/userInfo.adapter';
import { useUserInfoStore } from '@/store/useUserInfoStore';
import Cookies from 'js-cookie';

const GlobalHeader = () => {
  // Store
  const { setUserInfo, login } = useUserInfoStore();

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Efecto para hacer fetch de los datos del usuario
  useEffect(() => {
    const token = Cookies.get('token');
    const refresh = Cookies.get('refresh');

    // Si existe token, se hace la petición para obtener los datos del usuario
    if (token && refresh) {
      const getDataUserFc = () => {
        getDataUser()
          .then((res) => {
            const { data } = res;

            // Se adaptan los datos
            const adaptedData = setUserInfoAdapter(data);

            // Se guardan en el storage
            setUserInfo(adaptedData);

            // Se loguea en la UI
            login();

            // Se quitan los skeletons
            setLoading(false);
          })
          .catch((error) => {
            const token = error?.response?.headers['token'];
            const status = error?.response?.status;

            if (token && status === 403) {
              Cookies.set('token', token);
              getDataUserFc();
            } else {
              Cookies.remove('token');
              Cookies.remove('refresh');
              window.location.href = '/';
            }
          });
      };

      getDataUserFc();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='box-shadow border-b-2 z-50 border-blue-800 flex h-[60px] justify-center items-center gap-4 w-full bg-black-custom'>
      {isMenuOpen ? (
        <div
          className='fixed w-[100vw] h-[100dvh] right-0 top-0 z-[100]'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      ) : null}

      <NavBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        loading={loading}
      />
    </header>
  );
};

export default GlobalHeader;
