import Logo from '../Imagen/Imagen';

const AvailableGames = () => {
  return (
    <div className='hidden  md:flex flex-col justify-start '>
      <h2 className='text-blue-500'>Juegos Disponibles</h2>
      <Logo className='w-16 h-16' src={'/Logo/2.png'} alt={'Lucky9'} />
    </div>
  );
};

export default AvailableGames;
