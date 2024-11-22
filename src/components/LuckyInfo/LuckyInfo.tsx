import AvailableGames from '../AvailableGames/AvailableGames';
import Logo from '../Imagen/Imagen';
import TextInfo from '../TextInfo/TextInfo';

const LucyInfo=() => {
  return (
    <div className="flex flex-col items-center md:w-1/2 md:my-auto md:h-full md:flex md:flex-col md:items-center md:justify-start gap-12">
      <Logo className="md:text-center h-[10rem] w-[10rem] md:h-[14rem] md:w-[14rem] box-shadow border-2 border-blue-800" src={"/Logo/1.png"} alt={"Bingo 9"} />
      <TextInfo />
      <AvailableGames />
    </div>
  );
}

export default LucyInfo;
