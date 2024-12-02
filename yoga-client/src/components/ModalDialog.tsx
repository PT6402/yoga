import { ReactNode } from "react";

export interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className: string;
  isTop?: boolean;
}
export default function ModalDialog({
  isOpen,
  onClose,
  children,
  className,
  isTop = false,
}: ModalDialogProps) {
  if (!isOpen) return null;

  return (
    <section
      className={`fixed inset-0 z-50 flex  justify-center  ${
        isTop ? "" : "items-center mt-10"
      }`}
    >
      <div
        className="fixed inset-0 bg-secondary/10 backdrop-blur-sm backdrop-filter bg-opacity-100"
        onClick={onClose}
      ></div>
      <div
        className={
          "!z-[9999] bg-white rounded p-secondary shadow-lg border border-primary" +
          ` ${className}`
        }
      >
        {children}
      </div>
    </section>
  );
}
