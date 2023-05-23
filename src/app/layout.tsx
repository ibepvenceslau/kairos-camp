import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';

import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={poppins.className}
    >
      <body className="bg-gray-900 w-screen min-h-screen">{children}</body>
    </html>
  );
}
