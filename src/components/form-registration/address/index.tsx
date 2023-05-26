import { z } from 'zod';
import { toast } from 'react-toastify';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react';

import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';

const addressSchema = z.object({
  streetName: z.string().nonempty({ message: 'Rua é obrigatório' }),
  streetNumber: z.string().nonempty({ message: 'Número é obrigatório' }),
  neighborhood: z.string().nonempty({ message: 'Bairro é obrigatório' }),
  complement: z.string(),
  city: z.string().nonempty({ message: 'Cidade é obrigatório' }),
  state: z
    .string()
    .length(2, { message: 'O estado deve ter 2 caracteres' })
    .nonempty({ message: 'Estado é obrigatório' }),
});

type AddressData = {
  streetName: string;
  streetNumber: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
};

export type AddressHandles = {
  getAddressData(): AddressData;
  validate(): boolean;
  clear(): void;
};

type AddressProps = {
  changeTab(tab: string): void;
};

const AddressComponent: ForwardRefRenderFunction<AddressHandles, AddressProps> = (
  { changeTab },
  ref,
) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const handleAddressPrev = () => {
    changeTab('personal');
  };

  const handleAddressNext = () => {
    const isValid = validate();

    if (!isValid) {
      return;
    }

    changeTab('church');
  };

  const getAddressData = () => ({
    streetName,
    streetNumber,
    neighborhood,
    complement,
    city,
    state,
  });

  const validate = () => {
    try {
      addressSchema.parse({
        streetName,
        streetNumber,
        neighborhood,
        complement,
        city,
        state,
      });

      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const issue of err.issues) {
          toast.error(issue.message);
        }
      }

      return false;
    }
  };

  const clear = () => {
    setCity('');
    setState('');
    setComplement('');
    setStreetName('');
    setStreetNumber('');
    setNeighborhood('');
  };

  useImperativeHandle(ref, () => ({
    getAddressData,
    validate,
    clear,
  }));

  return (
    <>
      <InputGroup text="Endereço">
        <InputBlock>
          <Input
            id="streetName"
            text="Logradouro"
            type="text"
            className="md:w-2/3"
            value={streetName}
            onChange={(event) => setStreetName(event.target.value)}
          />

          <Input
            id="streetNumber"
            text="Número"
            type="text"
            className="md:w-1/3"
            value={streetNumber}
            onChange={(event) => setStreetNumber(event.target.value)}
          />
        </InputBlock>

        <Input
          id="neighborhood"
          text="Bairro"
          type="text"
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
        />

        <Input
          id="complement"
          text="Complemento"
          type="text"
          value={complement}
          onChange={(event) => setComplement(event.target.value)}
        />

        <InputBlock>
          <Input
            id="city"
            text="Cidade"
            type="text"
            className="md:w-1/2"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <Input
            id="state"
            text="Estado"
            type="text"
            className="md:w-1/2"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </InputBlock>
      </InputGroup>
      <div className="md:grid md:grid-cols-3 md:gap-2">
        <Button
          text="Voltar"
          color="bg-indigo-700"
          hoverColor="hover:bg-indigo-600"
          onClick={handleAddressPrev}
        />
        <Button
          text="Próximo"
          onClick={handleAddressNext}
          className="md:col-span-2"
        />
      </div>
    </>
  );
};

export const Address = forwardRef(AddressComponent);
