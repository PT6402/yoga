import Button, { ButtonProps } from "./Button";

export default function ButtonSecondary({
  className = " border border-slate-300 dark:border-slate-700 ",
  ...args
}: ButtonProps) {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 ${className}`}
      {...args}
    />
  );
}