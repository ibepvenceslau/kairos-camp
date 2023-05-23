import { ReactNode } from 'react';

type RadioBlockProps = {
  text: string;
  children?: ReactNode;
};

export const RadioBlock = ({ text, children }: RadioBlockProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm">{text}</h3>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};
