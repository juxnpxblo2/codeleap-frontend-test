import type { ChangeEventHandler } from "react";

type TextAreaProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  maxLength?: number;
};

const TextArea = (props: TextAreaProps) => {
  return (
    <label>
      <p className="mb-1">{props.label}</p>
      <textarea
        className="w-full resize-none rounded-lg border border-darker bg-black bg-opacity-0 px-3 py-1.5 transition-all placeholder:text-sm placeholder:text-placeholder hover:bg-opacity-[0.02] active:bg-opacity-[0.04]"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        rows={3}
        maxLength={props.maxLength}
      />
    </label>
  );
};

export default TextArea;
