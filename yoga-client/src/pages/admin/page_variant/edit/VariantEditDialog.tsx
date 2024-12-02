import { useState } from "react";
import ModalDialog from "../../../../components/ModalDialog";
import { Button } from "@material-tailwind/react";
import { Variant } from "../../../../context/type_stores";
import FormEditVariant from "./FormEditVariant";

interface Props {
  variant: Variant;
}
export default function VariantEditDialog({ variant }: Props) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        isTop
        className="w-full max-w-[70rem] h-[calc(100vh-15rem)] min-h-[45rem] max-h-[50rem] md:mx-0 mx-4 !z-[9999] p-8 !bg-transparent no-doc-scroll shadow-none border-none"
      >
        <FormEditVariant variant={variant} handleClose={() => setOpen(false)} />
      </ModalDialog>

      <Button
        variant="outlined"
        className="border-gray-800 text-black"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
    </>
  );
}
