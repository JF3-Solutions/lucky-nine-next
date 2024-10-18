// AuthContext.tsx
import React,{createContext,useContext,useState,useEffect} from 'react';
import {User} from '../models/User.interface';
import {getUserData} from '@/app/admin/services/userService';

interface AuthContextProps {
  user: User|null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext=createContext<AuthContextProps|undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}>=({
  children,
}) => {
  const [user,setUser]=useState<User|null>(null);

  const login=(userData: User) => {
    setUser(userData);
    localStorage.setItem('token',userData.id); // Guarda el token en localStorage
  };

  const logout=() => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated=!!user;

  useEffect(() => {
    const fetchUserData=async () => {
      const token=localStorage.getItem('token');
      if(token) {
        try {
          const userData=await getUserData();
          setUser(userData);
        } catch(error) {
          console.error('Error fetching user data',error);
          logout();
        }
      }
    };

    fetchUserData();
  },[]);

  return (
    <AuthContext.Provider value={{user,login,logout,isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=(): AuthContextProps => {
  const context=useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
