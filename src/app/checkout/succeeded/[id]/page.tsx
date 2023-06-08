import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Registration } from '@prisma/client';
import { PaymentReceipt } from '@/components/payment-receipt';

export const metadata = {
  title: 'Inscrição Realizada com Sucesso',
};

type CheckoutSucceededPageProps = {
  params: {
    id: string;
  };
};

const CheckoutSucceededPage = async ({ params }: CheckoutSucceededPageProps) => {
  const request = await fetch(`http://localhost:3000/api/registrations/${params.id}`);

  const registration: Registration = await request.json();

  if (!registration) {
    notFound();
  }

  return (
    <div className="relative flex items-center justify-center h-screen py-8 px-4">
      <div className="flex flex-col justify-center bg-gray-950 shadow-lg shadow-gray-950 rounded-lg w-full max-w-3xl px-10 py-12 mx-auto">
        <div className="md:flex md:justify-between">
          <h1 className="text-3xl text-rose-600 font-black">KAIRÓS CAMP</h1>
          <Link
            href="/inscricoes"
            className="text-sm text-rose-500 underline mt-auto hover:text-rose-600 transition-colors duration-300"
          >
            Voltar para a página de inscrições
          </Link>
        </div>

        <div className="bg-gray-800 w-full h-[1px] my-2" />

        <h2 className="text-lg font-normal">
          Parabéns, a sua inscrição foi realizada com{' '}
          <span className="text-green-500 font-bold">SUCESSO!</span>
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          Você precisará apresentar o comprovante de inscrição no dia do evento, junto de um
          documento com foto, então não esqueça de tirar{' '}
          <span className="text-rose-600 font-bold">PRINT</span> dessa tela.
        </p>

        <PaymentReceipt registration={registration} />
      </div>
    </div>
  );
};

export default CheckoutSucceededPage;
