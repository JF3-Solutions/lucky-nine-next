'use client';

import { useAuthClientLoading } from '@/hooks/useAuthClientLoading';
import { useUserInfoStore } from '@/store/useUserInfoStore';
const Greeting = () => {
  const { name, email, isAuthenticated } = useUserInfoStore();
  const { loading } = useAuthClientLoading();

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {isAuthenticated ? (
            <p>
              Hola {name} {email}
            </p>
          ) : (
            <p> Hola usuario anonimo</p>
          )}
        </>
      )}
    </div>
  );
};

export default Greeting;
