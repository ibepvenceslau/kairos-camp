import Image from 'next/image';

import { Input } from '@/components/Input';
import { Radio } from '@/components/radio';
import { InputBlock } from '@/components/input-block';
import { InputGroup } from '@/components/input-group';
import { RadioBlock } from '@/components/radio-block';

export const metadata = {
  title: 'Inscrição',
  description: 'Inscrição Kairós Camp - A hora é agora',
};

type KairosCampRegistrationPageProps = {};

export default function KairosCampRegistration({}: KairosCampRegistrationPageProps) {
  return (
    <div className="flex flex-col justify-center bg-gray-950 shadow-lg shadow-gray-950 rounded-lg w-full max-w-3xl px-10 py-12 mx-auto">
      <header className="">
        <div className="relative w-24 h-24 -ml-3">
          <Image
            fill={true}
            src="/logo-kairos.png"
            alt="Logo Juventude Kairós"
          />
        </div>
        <div className="flex flex-col text-3xl my-6">
          <h2 className="font-normal">Faça a sua inscrição para o</h2>
          <h2 className="text-rose-600 font-black">KAIRÓS CAMP</h2>
        </div>
      </header>
      <main className="">
        <form className="flex flex-col gap-4">
          <InputGroup text="Dados pessoais">
            <InputBlock>
              <Input
                id="name"
                text="Nome"
                type="text"
                className="md:w-2/3"
              />

              <Input
                id="birthDate"
                text="Data de Nascimento"
                type="date"
                className="md:w-1/3"
              />
            </InputBlock>

            <Input
              id="email"
              text="E-mail"
              type="email"
            />

            <Input
              id="phone"
              text="Contato"
              type="text"
            />

            <InputBlock>
              <Input
                id="rg"
                text="RG"
                type="text"
                className="md:w-1/2"
              />

              <Input
                id="cpf"
                text="CPF"
                type="text"
                className="md:w-1/2"
              />
            </InputBlock>
          </InputGroup>

          <InputGroup text="Endereço">
            <InputBlock>
              <Input
                id="street-name"
                text="Logradouro"
                type="text"
                className="md:w-2/3"
              />

              <Input
                id="street-number"
                text="Número"
                type="text"
                className="md:w-1/3"
              />
            </InputBlock>

            <Input
              id="neighborhood"
              text="Bairro"
              type="text"
            />

            <Input
              id="complement"
              text="Complemento"
              type="text"
            />

            <InputBlock>
              <Input
                id="city"
                text="Cidade"
                type="text"
                className="md:w-1/2"
              />
              <Input
                id="state"
                text="Estado"
                type="text"
                className="md:w-1/2"
              />
            </InputBlock>
          </InputGroup>

          <InputGroup text="Igreja">
            <RadioBlock text="É membro de alguma igreja?">
              <Radio
                id="church-member-yes"
                name="church-member"
                text="Sim"
              />
              <Radio
                id="church-member-no"
                name="church-member"
                text="Não"
              />
            </RadioBlock>

            <InputBlock>
              <Input
                id="church-name"
                text="Qual o nome da igreja?"
                type="text"
                className="md:w-1/2"
              />

              <Input
                id="church-leader-name"
                text="Qual o nome do pastor/líder?"
                type="text"
                className="md:w-1/2"
              />
            </InputBlock>
          </InputGroup>

          <InputGroup
            text="Responsável"
            tooltip="Os campos abaixo devem ser preenchidos com os dados do responsável legal do participante"
          >
            <InputBlock>
              <Input
                id="responsible-name"
                text="Nome"
                type="text"
                className="md:w-2/3"
              />

              <Input
                id="responsible-birth-date"
                text="Data de Nascimento"
                type="date"
                className="md:w-1/3"
              />
            </InputBlock>

            <Input
              id="responsible-email"
              text="E-mail"
              type="email"
            />

            <Input
              id="responsible-contact"
              text="Contato"
              type="text"
            />

            <InputBlock>
              <Input
                id="responsible-rg"
                text="RG"
                type="text"
                className="md:w-1/2"
              />

              <Input
                id="responsible-cpf"
                text="CPF"
                type="text"
                className="md:w-1/2"
              />
            </InputBlock>

            <Input
              id="degree-of-kinship"
              text="Grau de Parentesco"
              type="text"
            />
          </InputGroup>

          <button
            type="submit"
            className="flex items-center justify-center text-sm text-white font-semibold rounded-md bg-rose-600 w-full h-10 mt-6 hover:bg-rose-500"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
