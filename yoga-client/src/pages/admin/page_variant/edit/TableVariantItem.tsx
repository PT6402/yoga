import { Chip } from "@material-tailwind/react";
import { Variant } from "../../../../context/type_stores";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { VariantEditState } from "./FormEditVariant";

interface Props {
  handleRemove: (id?: number) => void;
  handleEdit: (id?: number) => void;
  isEdit: VariantEditState | null;
  variant: Variant;
}
export default function TableVariantItem({
  handleEdit,
  handleRemove,
  isEdit,
  variant,
}: Props) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 ">
      <thead>
        <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
          >
            Value
          </th>
          <th
            scope="col"
            className="px-6 py-3  text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-center"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 ">
        {variant.values &&
          variant.values.length > 0 &&
          variant.values.map((item) => (
            <tr
              key={item.id}
              className={isEdit?.id == item.id ? "bg-gray-300" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200  ">
                <div className="flex justify-center">
                  <Chip
                    value={item.value}
                    variant="ghost"
                    className="w-fit text-md"
                  />
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-center">
                <div
                  className={`flex gap-1 w-fit items-center ${
                    isEdit?.id == item.id ? "hidden" : ""
                  }`}
                >
                  <div
                    className="border p-2 rounded-full bg-gray-500 cursor-pointer w-fit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <PencilSquareIcon className="w-4 h-4   hover:cursor-pointer text-white" />
                  </div>
                  {item.referenceProduct == 0 && (
                    <>
                      |
                      <div
                        className="border p-2 rounded-full bg-red-500 cursor-pointer w-fit"
                        onClick={() => handleRemove(item.id)}
                      >
                        <TrashIcon className="w-4 h-4   hover:cursor-pointer text-white" />
                      </div>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
