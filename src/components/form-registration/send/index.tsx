import { RefObject } from 'react';

import { Button } from '@/components/button';
import { calcPersonAge } from '@/components/form-registration/common';
import { PersonalHandles } from '@/components/form-registration/personal';

type SendProps = {
  personalRef: RefObject<PersonalHandles>;
  changeTab(tab: string): void;
};

export const Send = ({ personalRef, changeTab }: SendProps) => {
  const handleSendPrev = () => {
    const personAge = calcPersonAge(personalRef.current?.getPersonalData().birthDate ?? '');

    if (personAge < 18) {
      changeTab('responsible');
    } else {
      changeTab('church');
    }
  };

  return (
    <>
      <Button
        text="Voltar"
        color="bg-indigo-700"
        hoverColor="hover:bg-indigo-600"
        onClick={handleSendPrev}
      />
      <Button
        text="Enviar"
        type="submit"
      />
    </>
  );
};
