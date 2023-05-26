import { ReactNode } from 'react';

type InputGroupProps = {
  text: string;
  tooltip?: string;
  children?: ReactNode;
};

export const InputGroup = ({ text, tooltip, children }: InputGroupProps) => {
  return (
    <>
      <div className="flex items-center gap-2 h-7">
        <span className="bg-gray-800 w-4 h-[1px]" />
        <h3 className="text-gray-700 shrink-0">{text}</h3>
        {tooltip && (
          <div className="relative flex items-center justify-center group">
            <span className="flex items-center justify-center text-xs bg-rose-600 rounded-full w-4 h-4">
              i
            </span>
            <span
              className="
                absolute
                left-1/2
                -translate-x-1/2
                translate-y-1/2
                bg-gray-800
                text-sm
                rounded-md
                opacity-0
                w-max
                max-w-xs
                px-2
                py-1
                mt-8
                group-hover:opacity-100
                transition-opacity
              "
            >
              {tooltip}
            </span>
          </div>
        )}
        <span className="bg-gray-800 w-full h-[1px]" />
      </div>
      {/* <div className="flex flex-col gap-1">{children}</div> */}
      {children}
    </>
  );
};
