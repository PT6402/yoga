import { Button } from "@material-tailwind/react";
import { useState } from "react";
import ModalDialog from "../../../../components/ModalDialog";

import { Category } from "../../../../context/type_stores";
import FormEditCategory from "./FormEditCategory";

interface Props {
  item: Category;
}
export default function CategoryEditDialog({ item }: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <ModalDialog
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className="w-full max-w-[70rem] h-[calc(100vh-15rem)] min-h-[25rem] max-h-[50rem] md:mx-0 mx-4 !z-[9999] p-8 !bg-transparent no-doc-scroll shadow-none border-none "
      >
        <FormEditCategory handleClose={() => setOpen(false)} item={item} />
      </ModalDialog>
      <Button
        variant="outlined"
        className="w-full max-w-fit"
        color="gray"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
    </div>
  );
}
