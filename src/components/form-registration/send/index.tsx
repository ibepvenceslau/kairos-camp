import { RefObject } from 'react';

import { Button } from '@/components/button';
import { calcPersonAge } from '@/components/form-registration/common';
import { AddressHandles } from '@/components/form-registration/address';
import { PersonalHandles } from '@/components/form-registration/personal';

type SendProps = {
  personalRef: RefObject<PersonalHandles>;
  addressRef: RefObject<AddressHandles>;
  changeTab(tab: string): void;
};

export const Send = ({ personalRef, addressRef, changeTab }: SendProps) => {
  const handleSendPrev = () => {
    const personAge = calcPersonAge(personalRef.current?.getPersonalData().birthDate ?? '');

    if (personAge < 18) {
      changeTab('responsible');
    } else {
      changeTab('church');
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">Parabéns por chegar até aqui, você está quase lá!</h2>
        {addressRef.current?.getAddressData().state === 'SP' &&
        addressRef.current?.getAddressData().city === 'Presidente Venceslau' ? (
          <>
            <p className="text-sm text-zinc-400">
              Como você é residente de nossa queridíssima cidade, você poderá fazer o pagamento de
              sua inscrição em nossa amada igreja ou através do PIX.
            </p>
            <p className="text-sm text-zinc-400">
              O valor do investimento é de{' '}
              <span className="font-bold text-lg text-rose-600">R$ 160,00</span> (cento e sessenta
              reais).
            </p>
            <h3>1ª Opção (Pagamento Presencial com Cartão de Crédito / Débito)</h3>
            <p className="text-sm text-zinc-400">
              Para o pagamento presencial, basta comparecer em nossa igreja, na Rua Comandante
              Antenor Pereira, 740 - Parque São Francisco, e procurar por um dos nossos líderes.
            </p>
            <h3>2ª Opção (Pagamento via PIX)</h3>
            <p className="text-sm text-zinc-400">
              Para o pagamento via PIX, basta realizar a transferência para a chave
              <span className="font-bold text-rose-600"> analaura_guilmo@icloud.com</span> e enviar
              o comprovante para o número{' '}
              <span className="font-bold text-rose-600">(18) 99613-8580</span> (WhatsApp),
              juntamente com seu número de documento (RG ou CPF).
            </p>
            <p className="text-sm text-zinc-400">
              Para finalizar sua inscrição, basta clicar no botão abaixo.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-400">
              Para finalizar sua inscrição, basta clicar no botão abaixo e você será redirecionado
              para a nossa página de pagamento.
            </p>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          text="Voltar"
          color="bg-indigo-700"
          hoverColor="hover:bg-indigo-600"
          onClick={handleSendPrev}
        />
        <Button
          text="Finalizar Minha Inscrição"
          type="submit"
        />
      </div>
    </div>
  );
};
