import Imagen from '@/components/Imagen/Imagen';
import LoaderOne from '@/components/Loaders/LoaderOne';

const loading = () => {
  return (
    <main className='min-h-[calc(100dvh-60px)] w-full flex flex-col justify-center items-center text-white bg-black'>
      <Imagen
        alt='Animación de carga de Lucky nine'
        className='w-full max-w-[270px] md:max-w-[450px] h-[300px]'
        src={'/loading.gif'}
      />
      <div className='relative translate-y-[-100px] md:translate-y-[-150px]'>
        <LoaderOne />
      </div>
    </main>
  );
};

export default loading;
