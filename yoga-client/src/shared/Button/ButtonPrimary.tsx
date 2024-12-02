import Button, { ButtonProps } from "./Button";

export default function ButtonPrimary({
  className = "",
  ...args
}: ButtonProps) {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl ${className}`}
      {...args}
    />
  );
}
