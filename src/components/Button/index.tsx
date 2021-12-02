import React, { FC, HTMLAttributes } from "react";

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  width?: string;
  color?: string;
  typeText?:
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "normal-case"
    | undefined;
  type: "button" | "submit" | "reset" | undefined;
}

const Button: FC<buttonProps> = ({
  children,
  width,
  color,
  type,
  typeText,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={`btn mt-4 ${width} ${color} ${typeText}`}
    >
      {children}
    </button>
  );
};

export default Button;
