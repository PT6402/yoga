import { useState } from "react";
import ModalDialog from "../../../../components/ModalDialog";
import { Button } from "@material-tailwind/react";
import FormCreateVariant from "./FormCreateVariant";

export default function VariantCreateDialog() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className="w-full max-w-[70rem] h-[calc(100vh-15rem)] min-h-[25rem] max-h-[50rem] md:mx-0 mx-4 !z-[9999] p-8 !bg-transparent no-doc-scroll shadow-none border-none"
      >
        <FormCreateVariant handleClose={() => setOpen(false)} />
      </ModalDialog>

      <Button
        variant="filled"
        className=" w-fit mt-5 py-3.5"
        color="light-green"
        onClick={() => setOpen(true)}
      >
        Create
      </Button>
    </>
  );
}
