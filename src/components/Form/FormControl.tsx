import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";

const FormControl: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className={"form-control m-2 " + props.className}>{children}</div>
  );
};

export default FormControl;
