'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import { FormEvent, useRef, useState } from 'react';

import { useLoading } from '@/contexts/loading.context';
import { Send } from '@/components/form-registration/send';
import { Church, ChurchHandles } from '@/components/form-registration/church';
import { Address, AddressHandles } from '@/components/form-registration/address';
import { Personal, PersonalHandles } from '@/components/form-registration/personal';
import { Responsible, ResponsibleHandles } from '@/components/form-registration/responsible';

export const Form = () => {
  const router = useRouter();
  const { openLoading, closeLoading } = useLoading();

  const [tab, setTab] = useState('personal');

  const churchRef = useRef<ChurchHandles>(null);
  const addressRef = useRef<AddressHandles>(null);
  const personalRef = useRef<PersonalHandles>(null);
  const responsibleRef = useRef<ResponsibleHandles>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    isValid = !!churchRef.current?.validate() && isValid;
    isValid = !!addressRef.current?.validate() && isValid;
    isValid = !!personalRef.current?.validate() && isValid;
    isValid = !!responsibleRef.current?.validate() && isValid;

    if (!isValid) {
      return;
    }

    const data = {
      ...churchRef.current?.getChurchData(),
      ...addressRef.current?.getAddressData(),
      ...personalRef.current?.getPersonalData(),
      ...responsibleRef.current?.getResponsibleData(),
    };

    try {
      openLoading();

      const registrationsRequest = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (registrationsRequest.status !== 200) {
        throw new Error();
      }

      churchRef.current?.clear();
      addressRef.current?.clear();
      personalRef.current?.clear();
      responsibleRef.current?.clear();

      const { id, email, state, city } = await registrationsRequest.json();

      if (state === 'SP' && city === 'Presidente Venceslau') {
        router.push(`/checkout/succeeded/${id}`);
      } else {
        const checkoutRequest = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            email,
          }),
        });

        const { url } = await checkoutRequest.json();

        window.location.href = url;
      }
    } catch {
      toast.error('Erro ao realizar inscrição, entre em contato com a equipe!');
    } finally {
      closeLoading();
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Tabs.Root
        className="flex flex-col"
        value={tab}
      >
        <Tabs.Content
          value="personal"
          hidden={tab !== 'personal'}
          forceMount
        >
          <Personal
            changeTab={(tab) => setTab(tab)}
            ref={personalRef}
          />
        </Tabs.Content>
        <Tabs.Content
          value="address"
          hidden={tab !== 'address'}
          forceMount
        >
          <Address
            changeTab={(tab) => setTab(tab)}
            ref={addressRef}
          />
        </Tabs.Content>
        <Tabs.Content
          value="church"
          hidden={tab !== 'church'}
          forceMount
        >
          <Church
            changeTab={(tab) => setTab(tab)}
            personalRef={personalRef}
            ref={churchRef}
          />
        </Tabs.Content>
        <Tabs.Content
          value="responsible"
          hidden={tab !== 'responsible'}
          forceMount
        >
          <Responsible
            personalRef={personalRef}
            changeTab={(tab) => setTab(tab)}
            ref={responsibleRef}
          />
        </Tabs.Content>
        <Tabs.Content
          value="send"
          hidden={tab !== 'send'}
          forceMount
        >
          <Send
            changeTab={(tab) => setTab(tab)}
            addressRef={addressRef}
            personalRef={personalRef}
          />
        </Tabs.Content>
      </Tabs.Root>
    </form>
  );
};
