import { InputHTMLAttributes } from 'react';

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  text: string;
};

export const Radio = ({ id, name, text, ...rest }: RadioProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="radio"
        name={name}
        className="w-6 h-6 text-rose-600 border-gray-900 bg-gray-900 focus:ring-2 focus:ring-rose-600"
        {...rest}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium"
      >
        {text}
      </label>
    </div>
  );
};
