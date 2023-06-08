import { z } from 'zod';
import { toast } from 'react-toastify';
import { faker } from '@faker-js/faker';
import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';
import { Dropdown, DropdownHandles } from '@/components/dropdown';

type StateDTO = {
  sigla: string;
};

type CityDTO = {
  nome: string;
};

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
  const [complement, setComplement] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const cityRef = useRef<DropdownHandles>(null);
  const stateRef = useRef<DropdownHandles>(null);

  const [states, setStates] = useState<StateDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    document.addEventListener('keydown', async (event) => {
      if (event.shiftKey && event.ctrlKey && event.altKey && event.code === 'KeyW') {
        const states = await loadStates();
        const state = faker.helpers.arrayElement(states.map((state) => state.sigla));

        stateRef.current?.updateSelectedOption(state);

        const cities = await loadCities(state);
        const city = faker.helpers.arrayElement(cities.map((city) => city.nome));

        cityRef.current?.updateSelectedOption(city);

        setComplement(faker.word.words(faker.number.int({ min: 0, max: 8 })));
        setStreetName(faker.location.street());
        setStreetNumber(faker.location.buildingNumber());
        setNeighborhood(faker.location.secondaryAddress());
      }
    });
  }, []);

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async (): Promise<StateDTO[]> => {
    const response = await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados');

    const states = await response.json();

    setStates(states);

    return states;
  };

  const loadCities = async (state: string): Promise<CityDTO[]> => {
    const response = await fetch(
      `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
    );

    const cities = await response.json();

    setCities(cities);
    cityRef.current?.clear();

    return cities;
  };

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
    city: cityRef.current?.getSelectedOption() ?? '',
    state: stateRef.current?.getSelectedOption() ?? '',
  });

  const validate = () => {
    try {
      addressSchema.parse({
        streetName,
        streetNumber,
        neighborhood,
        complement,
        city: cityRef.current?.getSelectedOption(),
        state: stateRef.current?.getSelectedOption(),
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
    setComplement('');
    setStreetName('');
    setStreetNumber('');
    setNeighborhood('');
    cityRef.current?.clear();
    stateRef.current?.clear();
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
          <Dropdown
            text="Estado"
            placeholder="Selecione um estado"
            options={states.map((state) => state.sigla).sort()}
            onChange={(value) => loadCities(value)}
            ref={stateRef}
          />
          <Dropdown
            text="Cidade"
            placeholder="Selecione uma cidade"
            options={cities.map((city) => city.nome).sort()}
            ref={cityRef}
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
