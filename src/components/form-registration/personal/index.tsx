import { z } from 'zod';
import masker from 'vanilla-masker';
import { toast } from 'react-toastify';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react';

import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';

const personalSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .nonempty({ message: 'Nome é obrigatório' }),
  birthDate: z.string().nonempty({ message: 'Data de nascimento é obrigatória' }),
  email: z
    .string()
    .email({ message: 'E-mail não está nos padrões esperados' })
    .nonempty({ message: 'E-mail é obrigatório' }),
  phone: z.string().nonempty({ message: 'Telefone é obrigatório' }),
  rg: z.string().nonempty({ message: 'RG é obrigatório' }),
  cpf: z.string().nonempty({ message: 'CPF é obrigatório' }),
});

type PersonalData = {
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;
};

export type PersonalHandles = {
  getPersonalData(): PersonalData;
  clear(): void;
};

type PersonalProps = {
  changeTab(tab: string): void;
};

const PersonalComponent: ForwardRefRenderFunction<PersonalHandles, PersonalProps> = (
  { changeTab },
  ref,
) => {
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handlePersonalNext = () => {
    try {
      personalSchema.parse({
        name,
        birthDate,
        email,
        phone,
        rg,
        cpf,
      });

      changeTab('address');
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const issue of err.issues) {
          toast.error(issue.message);
        }
      }
    }
  };

  const getPersonalData = () => ({
    rg,
    cpf,
    name,
    email,
    phone,
    birthDate,
  });

  const clear = () => {
    setRg('');
    setCpf('');
    setName('');
    setEmail('');
    setPhone('');
    setBirthDate('');
  };

  useImperativeHandle(ref, () => ({
    getPersonalData,
    clear,
  }));

  return (
    <>
      <InputGroup text="Dados pessoais">
        <InputBlock>
          <Input
            id="name"
            text="Nome"
            type="text"
            className="md:w-2/3"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            id="birthDate"
            text="Data de Nascimento"
            type="date"
            className="md:w-1/3"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </InputBlock>

        <Input
          id="email"
          text="E-mail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          id="phone"
          text="Contato"
          type="text"
          value={phone}
          onChange={(event) => setPhone(masker.toPattern(event.target.value, '(99) 99999-9999'))}
        />

        <InputBlock>
          <Input
            id="rg"
            text="RG"
            type="text"
            className="md:w-1/2"
            value={rg}
            onChange={(event) => setRg(masker.toPattern(event.target.value, '99.999.999-9'))}
          />

          <Input
            id="cpf"
            text="CPF"
            type="text"
            className="md:w-1/2"
            value={cpf}
            onChange={(event) => setCpf(masker.toPattern(event.target.value, '999.999.999-99'))}
          />
        </InputBlock>
      </InputGroup>
      <Button
        text="Próximo"
        onClick={handlePersonalNext}
      />
    </>
  );
};

export const Personal = forwardRef(PersonalComponent);
