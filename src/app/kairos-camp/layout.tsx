import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'Kairós Camp',
    template: '%s | Kairós Camp',
  },
};

type KairosCampLayoutProps = {
  children: ReactNode;
};

export default function KairosCampLayout({ children }: KairosCampLayoutProps) {
  return <div className="flex items-center justify-center text-zinc-50 py-8 px-4">{children}</div>;
}
