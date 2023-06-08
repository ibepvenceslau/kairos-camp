import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
};

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { id, text, className, ...rest },
  ref,
) => {
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
        className="
          text-sm
          text-zinc-200
          bg-gray-900
          border-0
          outline-none
          rounded-md
          w-full
          h-10
          focus:ring-2
          focus:ring-rose-600
        "
        ref={ref}
        {...rest}
      />
    </div>
  );
};

export const Input = forwardRef(InputComponent);
