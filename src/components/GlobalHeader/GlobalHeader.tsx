"use client"
import NavBar from './Navbar';

const GlobalHeader=({showBackButton}: {showBackButton: boolean|undefined}) => {
  return (
    <header className=' box-shadow border-b-2 z-50 border-blue-800 flex h-[60px] justify-center items-center gap-4 w-full'>
      <NavBar showBackButton={showBackButton} />
    </header>
  );
};

export default GlobalHeader;
