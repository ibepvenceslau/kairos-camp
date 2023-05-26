import { z } from 'zod';
import { toast } from 'react-toastify';
import {
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { Input } from '@/components/input';
import { Radio } from '@/components/radio';
import { Button } from '@/components/button';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';
import { RadioBlock } from '@/components/radio-block';
import { calcPersonAge } from '@/components/form-registration/common';
import { PersonalHandles } from '@/components/form-registration/personal';

const churchSchema = z.discriminatedUnion('isChurchMember', [
  z.object({
    isChurchMember: z.literal(true),
    churchName: z.string().nonempty({ message: 'Nome da igreja é obrigatório' }),
    churchLeaderName: z.string().nonempty({ message: 'Nome do líder da igreja é obrigatório' }),
  }),
  z.object({
    isChurchMember: z.literal(false),
    churchName: z.string(),
    churchLeaderName: z.string(),
  }),
]);

type ChurchData = {
  isChurchMember: boolean;
  churchName: string;
  churchLeaderName: string;
};

export type ChurchHandles = {
  getChurchData(): ChurchData;
  clear(): void;
};

type ChurchProps = {
  personalRef: RefObject<PersonalHandles>;
  changeTab(tab: string): void;
};

const ChurchComponent: ForwardRefRenderFunction<ChurchHandles, ChurchProps> = (
  { personalRef, changeTab },
  ref,
) => {
  const [churchName, setChurchName] = useState('');
  const [isChurchMember, setIsChurchMember] = useState(true);
  const [churchLeaderName, setChurchLeaderName] = useState('');

  const handleChurchPrev = () => {
    changeTab('address');
  };

  const handleChurchNext = () => {
    const personAge = calcPersonAge(personalRef.current?.getPersonalData().birthDate ?? '');

    try {
      churchSchema.parse({
        isChurchMember,
        churchName,
        churchLeaderName,
      });

      if (personAge < 18) {
        changeTab('responsible');
      } else {
        changeTab('send');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const issue of err.issues) {
          toast.error(issue.message);
        }
      }
    }
  };

  const getChurchData = () => ({
    churchName,
    isChurchMember,
    churchLeaderName,
  });

  const clear = () => {
    setChurchName('');
    setIsChurchMember(true);
    setChurchLeaderName('');
  };

  useImperativeHandle(ref, () => ({
    getChurchData,
    clear,
  }));

  return (
    <>
      <InputGroup text="Igreja">
        <RadioBlock text="É membro de alguma igreja?">
          <Radio
            id="churchMemberYes"
            name="isChurchMember"
            text="Sim"
            value="true"
            checked={isChurchMember}
            onChange={(event) => setIsChurchMember(event.target.value === 'true')}
          />
          <Radio
            id="churchMemberNo"
            name="isChurchMember"
            text="Não"
            value="false"
            checked={!isChurchMember}
            onChange={(event) => setIsChurchMember(event.target.value === 'true')}
          />
        </RadioBlock>

        {isChurchMember && (
          <InputBlock>
            <Input
              id="churchName"
              text="Qual o nome da igreja?"
              type="text"
              className="md:w-1/2"
              value={churchName}
              onChange={(event) => setChurchName(event.target.value)}
            />

            <Input
              id="churchLeaderName"
              text="Qual o nome do pastor/líder?"
              type="text"
              className="md:w-1/2"
              value={churchLeaderName}
              onChange={(event) => setChurchLeaderName(event.target.value)}
            />
          </InputBlock>
        )}
      </InputGroup>
      <div className="md:grid md:grid-cols-3 md:gap-2">
        <Button
          text="Voltar"
          color="bg-indigo-700"
          hoverColor="hover:bg-indigo-600"
          onClick={handleChurchPrev}
        />
        <Button
          text="Próximo"
          onClick={handleChurchNext}
          className="md:col-span-2"
        />
      </div>
    </>
  );
};

export const Church = forwardRef(ChurchComponent);
