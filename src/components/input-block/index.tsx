import { ReactNode } from 'react';

type InputBlockProps = {
  children: ReactNode;
};

export const InputBlock = ({ children }: InputBlockProps) => {
  return <div className="flex flex-col gap-4 md:flex-row md:gap-2">{children}</div>;
};
