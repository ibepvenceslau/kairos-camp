import { HTMLAttributes, ReactNode } from 'react';

type RadioBlockProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  children?: ReactNode;
};

export const RadioBlock = ({ text, children, ...rest }: RadioBlockProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm">{text}</h3>
      <div
        className="flex gap-4"
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};
