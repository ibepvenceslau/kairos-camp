import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  color?: string;
  hoverColor?: string;
};
export const Button = ({
  text,
  color = 'bg-rose-600',
  hoverColor = 'hover:bg-rose-500',
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`
        ${className}
        flex
        items-center
        justify-center
        text-sm
        text-white
        font-semibold
        rounded-md
        ${color}
        w-full
        h-10
        mt-6
        ${hoverColor}
      `}
      {...rest}
    >
      {text}
    </button>
  );
};
