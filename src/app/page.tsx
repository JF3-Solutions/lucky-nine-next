import { getData } from '@/services/getData';
import Link from 'next/link';
import Greeting from './components/Greeting/Greeting';

interface GamesInterface {
  name: string;
  url: string;
}

export default async function Home() {
  // Se destructura data porque del backend se obtiene este objeto
  const { data: availableGames } = await getData();

  return (
    <main>
      <h1>home {availableGames?.games[0]?.name}</h1>

      <Greeting />

      <section className='px-10 flex gap-4'>
        {availableGames?.games?.map((game: GamesInterface, index: number) => (
          <Link
            href={game?.url}
            key={index}
            className='w-[100px] h-[100px] bg-red-400'
          >
            <span>{game?.name}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
