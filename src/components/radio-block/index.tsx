import { HTMLAttributes, ReactNode } from 'react';

type RadioBlockProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  children?: ReactNode;
};

export const RadioBlock = ({ text, children, className, ...rest }: RadioBlockProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h3 className="text-sm">{text}</h3>
      <div
        className={`flex flex-col gap-2 md:flex-row md:gap-4`}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};
