import { Registration } from '@prisma/client';

type PaymentReceiptProps = {
  registration: Registration;
};

export const PaymentReceipt = ({ registration }: PaymentReceiptProps) => {
  return (
    <div className="relative bg-gray-950 ring-2 ring-rose-600  rounded-lg p-8 mt-5">
      <div className="absolute left-0 top-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-10 w-full h-full"></div>

      <h2 className="text-3xl font-semibold">Comprovante de Pagamento</h2>

      <div className="bg-rose-600 w-full h-[2px] mt-5" />

      <div className="flex flex-col gap-2 mt-6">
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">Nome:</label>
          <p>{registration.name}</p>
        </div>
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">E-mail:</label>
          <p>{registration.email}</p>
        </div>
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">Contato:</label>
          <p>{registration.phone}</p>
        </div>
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">Cidade:</label>
          <p>{registration.city}</p>
        </div>
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">Estado:</label>
          <p>{registration.state}</p>
        </div>
        <div className="flex flex-col md:gap-2 md:flex-row">
          <label className="text-sm text-rose-600 font-bold">ID do Comprovante:</label>
          <p>{registration.id}</p>
        </div>
      </div>
    </div>
  );
};
