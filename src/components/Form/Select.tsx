import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface selectProps extends InputHTMLAttributes<HTMLSelectElement> {
  innerRef?: UseFormRegisterReturn;
  validate?: string;
}

const Select: FC<selectProps> = ({
  children,
  innerRef,
  validate,
  ...props
}) => {
  return (
    <select
      {...innerRef}
      {...props}
      className={
        "select select-bordered text-black w-full max-w-xs" +
        " " +
        props.className
      }
    >
      <option className="text-black" value="" disabled={true} selected={true}>
        Escolha uma opção
      </option>

      {children}
    </select>
  );
};
export default Select;
