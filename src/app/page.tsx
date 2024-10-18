import { getData } from '@/services/getData';
import Link from 'next/link';
import Greeting from './components/Greeting/Greeting';
import { Suspense } from 'react';

interface GamesInterface {
  name: string;
  url: string;
}

export default async function Home() {
  // Se destructura data porque del backend se obtiene este objeto
  const { data: globalData } = await getData();

  return (
    <main>
      <h1>home {globalData?.games[0]?.name}</h1>

      <Suspense fallback={<p>Cargando</p>}>
        <Greeting />
      </Suspense>

      <section className='px-10 flex gap-4'>
        {globalData?.games?.map((game: GamesInterface, index: number) => (
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
