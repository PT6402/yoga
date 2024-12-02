export interface LabelProps {
  className?: string;
  children?: React.ReactNode;
}
export default function Label({ className = "", children }: LabelProps) {
  return (
    <label
      className={`nc-Label text-base font-medium text-neutral-900 dark:text-neutral-200 ${className}`}
      data-nc-id="Label"
    >
      {children}
    </label>
  );
}
