import Image from 'next/image';

import { FormRegistration } from '@/components/form-registration';

export const metadata = {
  title: 'Inscrição',
  description: 'Inscrição Kairós Camp - A hora é agora',
};

type KairosCampRegistrationPageProps = {};

export default function KairosCampRegistration({}: KairosCampRegistrationPageProps) {
  return (
    <div className="relative flex items-center justify-center text-zinc-50 h-screen py-8 px-4">
      <div className="absolute left-0 top-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-10 w-full h-full"></div>
      <div className="flex flex-col justify-center bg-gray-950 shadow-lg shadow-gray-950 rounded-lg w-full max-w-3xl px-10 py-12 mx-auto z-10">
        <header className="">
          <div className="relative w-24 h-24 -ml-3">
            <Image
              fill={true}
              src="/logo-kairos.png"
              alt="Logo Juventude Kairós"
              sizes="100%"
            />
          </div>
          <div className="flex flex-col text-3xl my-6">
            <h2 className="font-normal">Faça a sua inscrição para o</h2>
            <h2 className="text-rose-600 font-black">KAIRÓS CAMP</h2>
          </div>
        </header>
        <main>
          <FormRegistration />
        </main>
      </div>
    </div>
  );
}
