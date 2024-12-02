import Button, { ButtonProps } from "./Button";

export default function ButtonThird({
  className = "text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700",
  ...args
}: ButtonProps) {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />;
}
