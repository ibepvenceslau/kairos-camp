import { z } from 'zod';
import { toast } from 'react-toastify';
import { faker } from '@faker-js/faker';
import {
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
  useEffect,
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
  validate(): boolean;
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

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    document.addEventListener('keydown', (event) => {
      if (event.shiftKey && event.ctrlKey && event.altKey && event.code === 'KeyW') {
        const isChurchMember = faker.datatype.boolean();

        setIsChurchMember(isChurchMember);

        if (isChurchMember) {
          setChurchName(faker.company.name());
          setChurchLeaderName(faker.person.fullName());
        } else {
          setChurchName('');
          setChurchLeaderName('');
        }
      }
    });
  }, []);

  const handleChurchPrev = () => {
    changeTab('address');
  };

  const handleChurchNext = () => {
    const personAge = calcPersonAge(personalRef.current?.getPersonalData().birthDate ?? '');

    const isValid = validate();

    if (!isValid) {
      return;
    }

    if (personAge < 18) {
      changeTab('responsible');
    } else {
      changeTab('send');
    }
  };

  const getChurchData = () => ({
    churchName,
    isChurchMember,
    churchLeaderName,
  });

  const validate = () => {
    try {
      churchSchema.parse({
        isChurchMember,
        churchName,
        churchLeaderName,
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
    setChurchName('');
    setIsChurchMember(true);
    setChurchLeaderName('');
  };

  useImperativeHandle(ref, () => ({
    getChurchData,
    validate,
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
