import { z } from 'zod';
import masker from 'vanilla-masker';
import { toast } from 'react-toastify';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react';

import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';

const responsibleSchema = z.object({
  responsibleName: z.string().nonempty({ message: 'Nome do responsável é obrigatório' }),
  responsibleBirthDate: z
    .string()
    .nonempty({ message: 'Data de nascimento do responsável é obrigatório' }),
  responsibleEmail: z
    .string()
    .email({ message: 'E-mail do responsável não está nos padrões esperados' })
    .nonempty({ message: 'E-mail do responsável é obrigatório' }),
  responsiblePhone: z.string().nonempty({ message: 'Telefone do responsável é obrigatório' }),
  responsibleRg: z.string().nonempty({ message: 'RG do responsável é obrigatório' }),
  responsibleCpf: z.string().nonempty({ message: 'CPF do responsável é obrigatório' }),
  degreeOfKinship: z.string().nonempty({ message: 'Grau de parentesco é obrigatório' }),
});

type ResponsibleData = {
  responsibleName: string;
  responsibleBirthDate: string;
  responsibleEmail: string;
  responsiblePhone: string;
  responsibleRg: string;
  responsibleCpf: string;
  degreeOfKinship: string;
};

export type ResponsibleHandles = {
  getResponsibleData(): ResponsibleData;
  clear(): void;
};

type ResponsibleProps = {
  changeTab(tab: string): void;
};

const ResponsibleComponent: ForwardRefRenderFunction<ResponsibleHandles, ResponsibleProps> = (
  { changeTab },
  ref,
) => {
  const [responsibleRg, setResponsibleRg] = useState('');
  const [responsibleCpf, setResponsibleCpf] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [degreeOfKinship, setDegreeOfKinship] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [responsiblePhone, setResponsiblePhone] = useState('');
  const [responsibleBirthDate, setResponsibleBirthDate] = useState('');

  const handleResponsiblePrev = () => {
    changeTab('church');
  };

  const handleResponsibleNext = () => {
    try {
      responsibleSchema.parse({
        responsibleName,
        responsibleBirthDate,
        responsibleEmail,
        responsiblePhone,
        responsibleRg,
        responsibleCpf,
        degreeOfKinship,
      });

      changeTab('send');
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const issue of err.issues) {
          toast.error(issue.message);
        }
      }
    }
  };

  const getResponsibleData = () => ({
    responsibleName,
    responsibleBirthDate,
    responsibleEmail,
    responsiblePhone,
    responsibleRg,
    responsibleCpf,
    degreeOfKinship,
  });

  const clear = () => {
    setResponsibleRg('');
    setResponsibleCpf('');
    setResponsibleName('');
    setDegreeOfKinship('');
    setResponsibleEmail('');
    setResponsiblePhone('');
    setResponsibleBirthDate('');
  };

  useImperativeHandle(ref, () => ({
    getResponsibleData,
    clear,
  }));

  return (
    <>
      <InputGroup
        text="Responsável"
        tooltip="Os campos abaixo devem ser preenchidos com os dados do responsável legal do participante"
      >
        <InputBlock>
          <Input
            id="responsibleName"
            text="Nome"
            type="text"
            className="md:w-2/3"
            value={responsibleName}
            onChange={(event) => setResponsibleName(event.target.value)}
          />

          <Input
            id="responsibleBirthDate"
            text="Data de Nascimento"
            type="date"
            className="md:w-1/3"
            value={responsibleBirthDate}
            onChange={(event) => setResponsibleBirthDate(event.target.value)}
          />
        </InputBlock>

        <Input
          id="responsibleEmail"
          text="E-mail"
          type="email"
          value={responsibleEmail}
          onChange={(event) => setResponsibleEmail(event.target.value)}
        />

        <Input
          id="responsiblePhone"
          text="Contato"
          type="text"
          value={responsiblePhone}
          onChange={(event) =>
            setResponsiblePhone(masker.toPattern(event.target.value, '(99) 99999-9999'))
          }
        />

        <InputBlock>
          <Input
            id="responsibleRg"
            text="RG"
            type="text"
            className="md:w-1/2"
            value={responsibleRg}
            onChange={(event) =>
              setResponsibleRg(masker.toPattern(event.target.value, '99.999.999-9'))
            }
          />

          <Input
            id="responsibleCpf"
            text="CPF"
            type="text"
            className="md:w-1/2"
            value={responsibleCpf}
            onChange={(event) =>
              setResponsibleCpf(masker.toPattern(event.target.value, '999.999.999-99'))
            }
          />
        </InputBlock>

        <Input
          id="degreeOfKinship"
          text="Grau de Parentesco"
          type="text"
          value={degreeOfKinship}
          onChange={(event) => setDegreeOfKinship(event.target.value)}
        />
      </InputGroup>
      <div className="md:grid md:grid-cols-3 md:gap-2">
        <Button
          text="Voltar"
          color="bg-indigo-700"
          hoverColor="hover:bg-indigo-600"
          onClick={handleResponsiblePrev}
        />

        <Button
          text="Próximo"
          onClick={handleResponsibleNext}
          className="md:col-span-2"
        />
      </div>
    </>
  );
};

export const Responsible = forwardRef(ResponsibleComponent);
