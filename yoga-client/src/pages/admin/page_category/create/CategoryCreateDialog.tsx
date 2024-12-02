import { Button } from "@material-tailwind/react";
import { useState } from "react";
import ModalDialog from "../../../../components/ModalDialog";
import FormCreateCategory from "./FormCreateCategory";

export default function CategoryCreateDialog() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className="w-full max-w-[70rem] h-[calc(100vh-15rem)] min-h-[25rem] max-h-[50rem] md:mx-0 mx-4 !z-[9999] p-8 !bg-transparent no-doc-scroll shadow-none border-none "
      >
        <FormCreateCategory handleClose={() => setOpen(false)} />
      </ModalDialog>
      <Button
        variant="filled"
        className="w-full max-w-fit"
        color="light-green"
        onClick={() => setOpen(true)}
      >
        Create
      </Button>
    </div>
  );
}
