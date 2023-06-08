import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react';

import { ArrowIcon } from '@/components/icons/arrow.icon';

export type DropdownHandles = {
  getSelectedOption(): string;
  updateSelectedOption(value: string): void;
  clear(): void;
};

type DropdownProps = {
  id?: string;
  text: string;
  placeholder?: string;
  options: string[];
  onChange?: (value: string) => void;
};

const DropdownComponent: ForwardRefRenderFunction<DropdownHandles, DropdownProps> = (
  { id, text, placeholder = 'Selecione uma opção', options, onChange },
  ref,
) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const getSelectedOption = () => selectedOption;

  const updateSelectedOption = (value: string) => setSelectedOption(value);

  const clear = () => setSelectedOption('');

  useImperativeHandle(ref, () => ({
    getSelectedOption,
    updateSelectedOption,
    clear,
  }));

  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6"
      >
        {text}
      </label>
      <button
        type="button"
        className="
          inline-flex
          items-center
          justify-between
          text-sm
          text-zinc-200
          bg-gray-900
          border-0
          outline-none
          rounded-md
          w-full
          h-10
          px-4
          focus:ring-2
          focus:ring-rose-700
        "
        onClick={() => setOpen(!open)}
      >
        {selectedOption && <span>{selectedOption}</span>}
        {!selectedOption && <span className="text-zinc-500">{placeholder}</span>}
        <ArrowIcon />
      </button>

      <div
        id="dropdown"
        className={`
          z-10
          absolute
          ${open ? 'block' : 'hidden'}
          bg-gray-900
          rounded-lg
          shadow
          w-full
          mt-2
        `}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-36 overflow-y-auto"
          aria-labelledby="dropdownDefaultButton"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setOpen(false);
                onChange?.(option);
              }}
            >
              <a
                href="#"
                className="
                  block
                  px-4
                  py-2
                  hover:bg-rose-700
                "
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Dropdown = forwardRef(DropdownComponent);
