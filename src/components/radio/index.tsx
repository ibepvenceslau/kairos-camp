type RadioProps = {
  id: string;
  name: string;
  text: string;
};

export const Radio = ({ id, name, text }: RadioProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="radio"
        value=""
        name={name}
        className="w-6 h-6 text-rose-600 border-gray-900 bg-gray-900 focus:ring-2 focus:ring-rose-600"
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
