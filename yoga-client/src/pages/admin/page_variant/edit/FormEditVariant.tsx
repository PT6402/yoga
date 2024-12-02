import { useEffect, useRef, useState } from "react";
import { useVariantAdmin } from "../../../../hooks/admin";
import { Variant, VariantItem } from "../../../../context/type_stores";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Input from "../../../../shared/Input";
import TableVariantItem from "./TableVariantItem";
import Swal from "sweetalert2";
interface Props {
  variant: Variant;
  handleClose: () => void;
}
export interface VariantEditState {
  id: number;
  status: boolean;
}
export default function FormEditVariant({ variant, handleClose }: Props) {
  const {
    addVariantItem,
    getAllVariant,
    updateVariantItem,
    removeVariantItem,
    updateNameVariantType,
  } = useVariantAdmin();
  const [valueInputItem, setValueInputItem] = useState<string>("");
  const inputVariantRef = useRef<HTMLInputElement>(null);
  const inputVariantItemRef = useRef<HTMLInputElement>(null);
  const [isEdit, setEdit] = useState<VariantEditState | null>(null);

  const handleAddVariantItem = () => {
    if (
      variant.id &&
      inputVariantItemRef.current != null &&
      inputVariantItemRef.current.value.trim() != ""
    ) {
      addVariantItem({
        idVariantType: variant.id,
        valueVariant: inputVariantItemRef.current.value,
      }).then(async (status) => {
        if (status) {
          await getAllVariant();
          setValueInputItem("");
        }
      });
    }
  };
  const handleEditVariantItem = (id?: number) => {
    if (inputVariantItemRef.current != null && id && variant.values) {
      const variantItem = variant.values.find(
        ({ id: idItem }: VariantItem) => idItem == id
      );
      if (variantItem && variantItem.value) {
        setValueInputItem(variantItem.value);
        setEdit({ id, status: true });
        inputVariantItemRef.current.focus();
      }
    }
  };
  const handleUpdateVariantItem = () => {
    // console.log("heeeee");
    if (valueInputItem.trim() != "" && isEdit?.id) {
      updateVariantItem({
        idVariantItem: isEdit.id,
        valueVariant: valueInputItem,
      }).then(async (status) => {
        if (status) {
          await getAllVariant();
          setEdit(null);
          setValueInputItem("");
        }
      });
    }
  };
  const handleRemoveVariantItem = (id?: number) => {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          removeVariantItem({ variantId: id }).then(async (status) => {
            if (status) {
              await getAllVariant();

              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    }
  };
  const handleUpdateNameVariantName = () => {
    if (
      inputVariantRef.current != null &&
      inputVariantRef.current.value.trim() != "" &&
      variant.id
    ) {
      updateNameVariantType({
        idVariantTypeId: variant.id,
        nameVariantType: inputVariantRef.current.value,
      }).then(async (status) => {
        if (status) {
          getAllVariant();
        }
      });
    }
  };
  useEffect(() => {
    if (isEdit && inputVariantItemRef.current != null) {
      inputVariantItemRef.current.focus();
    }
    if (isEdit == null) {
      setValueInputItem("");
    }
  }, [isEdit]);
  return (
    <>
      <div className="max-w-lg h-full max-h-fit mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 relative ">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-0 right-0"
        >
          <div className="flex-1 text-start  w-fit p-1 rounded-bl-lg rounded-tr-md  bg-red-400">
            <XMarkIcon className="w-6 h-6 text-white" />
          </div>
        </button>
        <div className="flex flex-row justify-between items-center border-b border-slate-200 pb-2 ">
          <div>
            <Input
              className="rounded-md !ring-transparent !border-gray-600 focus:outline-gray-600 focus:!border-transparent "
              placeholder="name variant type ..."
              defaultValue={variant?.name || ""}
              ref={inputVariantRef}
            />
          </div>
          <div className="inline-flex space-x-2 items-center">
            <button
              className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-green-400"
              onClick={handleUpdateNameVariantName}
            >
              <span className="text-sm font-medium hidden md:block">
                Update name type
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-start items-center border-t border-slate-200 py-2 border-l-transparent  transition ease-linear duration-150 gap-3">
          <div>
            <Input
              className="rounded-md !ring-transparent !border-gray-600 focus:outline-gray-600 focus:!border-transparent"
              placeholder="name variant ..."
              ref={inputVariantItemRef}
              value={valueInputItem}
              onChange={(e) => {
                setValueInputItem(e.target.value);
              }}
            />
          </div>
          <div className="inline-flex space-x-2 items-center">
            {isEdit && isEdit.status ? (
              <div className="flex gap-2">
                <button
                  className="p-3 border border-slate-200 rounded-md inline-flex space-x-1 items-center  bg-red-500 text-white"
                  onClick={handleUpdateVariantItem}
                >
                  <span className="text-sm font-medium">update</span>
                </button>
                <button
                  className="p-3 border border-slate-200 rounded-md inline-flex space-x-1 items-center  bg-white text-black"
                  onClick={() => setEdit(null)}
                >
                  <span className="text-sm font-medium">cancel</span>
                </button>
              </div>
            ) : (
              <button
                className="p-3 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-white"
                onClick={handleAddVariantItem}
              >
                <span className="text-sm font-medium">
                  <PlusIcon className="w-5 h-5 text-black" />
                </span>
              </button>
            )}
          </div>
        </div>
        <div id="tasks" className="my-5 ">
          <div className="flex flex-col h-[calc(100vh-30rem)] overflow-y-auto overflow-x-hidden scrollbar">
            <div className="-m-1.5">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg  ">
                  <TableVariantItem
                    handleRemove={handleRemoveVariantItem}
                    handleEdit={handleEditVariantItem}
                    variant={variant}
                    isEdit={isEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
