import React, { HTMLAttributes } from "react";

interface tooltipsProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "tooltip-right" | "tooltip-left" | "tooltip-bottom" | "";
  type?:
    | "tooltip-primary"
    | "tooltip-secondary"
    | "tooltip-accent"
    | "tooltip-info"
    | "tooltip-success"
    | "tooltip-warning"
    | "tooltip-error"
    | "";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";
  message: string;
}

const Tooltip: React.FC<tooltipsProps> = ({
  children,
  message,
  direction = "",
  type = "",
  color = "neutral",
}) => {
  return (
    <div
      data-tip={message}
      className={`tooltip z-20 ${direction} ${type} ${color}`}
    >
      {children}
    </div>
  );
};
export default Tooltip;
