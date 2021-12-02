import React, { FC } from "react";

const Label: FC = ({ children }) => {
  return (
    <label className="label">
      <span className="label-text">{children}</span>
    </label>
  );
};

export default Label;
