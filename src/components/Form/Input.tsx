import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface cardProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
}

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  innerRef?: UseFormRegisterReturn;
  validate?: string;
}

const Input: FC<inputProps> = ({ innerRef, validate, ...props }) => {
  return (
    <input
      {...innerRef}
      {...props}
      className={"input" + " " + props.className}
    />
  );
};

const InputWithIcon: FC<inputProps> = ({ innerRef, validate, ...props }) => {
  return (
    <input
      {...innerRef}
      {...props}
      className={"input w-full" + (validate != undefined ? " input-error" : "")}
    />
  );
};

const InputCard: React.FC<cardProps> = ({ children, width }) => {
  return (
    <div
      className={"p-10 card shadow-2xl bg-base-200 overflow-visible " + width}
    >
      {children}
    </div>
  );
};

const InputGroup: React.FC = ({ children }) => {
  return <label className="input-group input-group-md">{children}</label>;
};

export default Input;
export { InputCard, InputGroup, InputWithIcon };
