import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Input from "../../../../shared/Input";
import { VariantItem } from "../../../../context/type_stores";
import { useEffect, useRef, useState } from "react";
import { useVariantAdmin } from "../../../../hooks/admin";
import toast from "react-hot-toast";

interface Props {
  handleClose: () => void;
}
export default function FormCreateVariant({ handleClose }: Props) {
  const variantInputRef = useRef<HTMLInputElement>(null);
  const variantItemInputRef = useRef<HTMLInputElement>(null);
  const [variants, setVariants] = useState<VariantItem[]>([]);
  const { addVariant, getAllVariant } = useVariantAdmin();
  const handleAddVariantItem = () => {
    const valueName = variantItemInputRef.current?.value;
    if (
      variantItemInputRef.current != null &&
      valueName &&
      valueName.trim() != ""
    ) {
      const variantItem = variants.find(
        ({ value }: VariantItem) => value == valueName
      );
      if (variantItem == null) {
        setVariants((prev) => [...prev, { value: valueName }]);
        variantItemInputRef.current.value = "";
        variantItemInputRef.current.focus();
      } else {
        toast.error("name is exist!");
      }
    }
  };
  const handleRemoveVariantItem = ({ name }: { name?: string | null }) => {
    if (name) {
      setVariants((prev) => prev.filter(({ value }) => value != name));
    }
  };

  const handleSubmit = () => {
    if (
      variantInputRef.current != null &&
      variantInputRef.current.value.trim() != ""
    ) {
      addVariant({
        nameVariantType: variantInputRef.current.value,
        variants,
      }).then(async (status) => {
        if (status) {
          await getAllVariant();
          handleClose();
        }
      });
    }
  };
  useEffect(() => {
    if (variantItemInputRef.current != null) {
      variantItemInputRef.current.focus();
    }
  }, [variants]);
  useEffect(() => {
    if (variantInputRef.current != null) {
      variantInputRef.current.value = "";
      variantInputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 relative">
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
              ref={variantInputRef}
              defaultValue={variantInputRef.current?.value}
            />
          </div>
          <div className="inline-flex space-x-2 items-center">
            <button
              className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-green-400"
              onClick={handleSubmit}
            >
              <span className="text-sm font-medium hidden md:block">
                Create variant
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-start items-center border-t border-slate-200 py-2 border-l-transparent  transition ease-linear duration-150 gap-3 ">
          <div>
            <Input
              className="rounded-md !ring-transparent !border-gray-600 focus:outline-gray-600 focus:!border-transparent"
              placeholder="name variant ..."
              ref={variantItemInputRef}
            />
          </div>
          <div className="inline-flex space-x-2 items-center">
            <button
              className="p-3 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-white"
              onClick={handleAddVariantItem}
            >
              <span className="text-sm font-medium hidden md:block">
                <PlusIcon className="w-5 h-5 text-black" />
              </span>
            </button>
          </div>
        </div>

        <div id="tasks" className="my-5">
          {variants.length > 0 &&
            variants.map((item) => (
              <div
                id="task"
                key={item.value}
                className="flex justify-between items-center  py-3 px-2 border-l-4  border-l-transparent hover:bg-slate-100 transition ease-linear duration-150 rounded-lg"
              >
                <div className="inline-flex items-center space-x-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-500 hover:text-indigo-600 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>{item.value}</div>
                </div>
                <div
                  className="border p-2 rounded-full bg-red-500 cursor-pointer"
                  onClick={() => handleRemoveVariantItem({ name: item.value })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4 hover:cursor-pointer text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
