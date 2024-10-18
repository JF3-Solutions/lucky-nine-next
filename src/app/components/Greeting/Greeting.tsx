'use client';

import { useUserInfoStore } from '@/store/useUserInfoStore';

const Greeting = () => {
  const { name, email } = useUserInfoStore();

  return (
    <div>
      Hola {name} {email}
    </div>
  );
};

export default Greeting;
