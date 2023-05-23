import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
};

export const Input = ({ id, text, className, ...rest }: InputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6"
      >
        {text}
      </label>
      <input
        id={id}
        name={id}
        className="text-sm text-zinc-200 bg-gray-900 border-0 outline-none rounded-md w-full h-10 focus:ring-2 focus:ring-rose-600"
        {...rest}
      />
    </div>
  );
};
