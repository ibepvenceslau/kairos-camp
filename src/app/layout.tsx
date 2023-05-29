import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';

import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
});

export const metadata = {
  title: {
    default: 'Kairós Camp',
    template: '%s | Kairós Camp',
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={poppins.className}
    >
      <body className="bg-gray-900 text-zinc-50 w-screen min-h-screen">
        <div className="absolute left-0 top-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-10 w-full h-full -z-10"></div>
        {children}
      </body>
    </html>
  );
}
