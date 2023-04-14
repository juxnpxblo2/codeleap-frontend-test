import { useMemo } from "react";

export type ButtonProps = {
  content: string;
  type?: "button" | "submit";
  appearance?: "primary" | "secondary" | "confirm" | "danger";
  onClick?: () => void;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const appearence = useMemo(() => props.appearance || "secondary", []);
  const type = useMemo(() => props.type || "button", []);

  return (
    <button
      className={`w-[120px] rounded-lg py-1 font-bold transition-all
        ${props.disabled && "opacity-60"}
        ${appearence !== "secondary" && "text-white"}
        ${
          appearence !== "secondary" &&
          !props.disabled &&
          "hover:bg-opacity-80 active:bg-opacity-95"
        }
        ${appearence === "primary" && "bg-blue"}
        ${appearence === "secondary" && "border border-dark"}
        ${
          appearence === "secondary" &&
          !props.disabled &&
          "bg-black bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-10"
        }
        ${appearence === "danger" && "bg-red"}
        ${appearence === "confirm" && "bg-green"}
      `}
      type={type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.content}
    </button>
  );
};

export default Button;
