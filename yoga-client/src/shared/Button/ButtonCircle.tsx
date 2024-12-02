import { ButtonHTMLAttributes } from "react";
import twFocusClass from "../../utils/twFocusClass";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

export default function ButtonCircle({
  className = " ",
  size = " w-9 h-9 ",
  ...args
}: ButtonCircleProps) {
  return (
    <button
      className={
        `ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-slate-900 hover:bg-slate-800 
        text-slate-50 ${className} ${size} ` + twFocusClass(true)
      }
      {...args}
    />
  );
}
