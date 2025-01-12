import type { Metadata } from 'next';
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased mt-[60px]`}>
        <script
          type='module'
          defer
          src='https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js'
        ></script>
        <ToastContainer
          theme='colored'
          draggable
          className='md:w-[600px]'
          containerId='globalToastify'
        />
        <GlobalHeader />

        {children}
      </body>
    </html>
  );
}
