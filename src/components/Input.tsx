type InputProps = { label: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: InputProps) => {
  return (
    <label>
      <p className="mb-1">{props.label}</p>
      <input
        className="w-full rounded-lg border border-darker bg-black bg-opacity-0 px-3 py-1 transition-all placeholder:text-sm placeholder:text-placeholder hover:bg-opacity-[0.02] active:bg-opacity-[0.04]"
        type="text"
        {...{ ...props, label: undefined }}
      />
    </label>
  );
};

export default Input;
