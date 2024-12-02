import {
  ChevronDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { Button, Chip, Collapse } from "@material-tailwind/react";
import Select from "../../../../../shared/Select";
import Input from "../../../../../shared/Input";
import { DataVariant, VariantItemProduct } from "../context/type_context";
import { VariantItem as IVariantItem } from "../../../../../context/type_stores";
interface Props {
  item: DataVariant;
  handleRemoveItemType: (id?: number) => void;
  listVariantItem?: IVariantItem[];
  handleAddItem: ({
    idType,
    variantItem,
  }: {
    idType: number;
    variantItem: VariantItemProduct;
  }) => void;
  handleRemoveItem: ({
    idType,
    itemId,
  }: {
    idType: number;
    itemId: number;
  }) => void;
}
export default function VariantItem({
  item,
  handleRemoveItemType,
  listVariantItem,
  handleAddItem,
  handleRemoveItem,
}: Props) {
  const [open, setOpen] = useState(true);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [variantItems, setVariantItems] = useState<VariantItemProduct[]>(
    item.variantItems
  );
  const handleRenderVariantNoExist = () => {
    const listOption: IVariantItem[] = [];

    if (listVariantItem) {
      listVariantItem.forEach((item) => {
        // Kiểm tra nếu item không có trong variantItems
        const existsInVariantItems = variantItems.some(
          (vi) => vi.variantItem.id === item.id
        );

        if (!existsInVariantItems) {
          listOption.push(item);
        }
      });
    }

    return listOption;
  };

  const handleAddVariantItem = () => {
    if (
      selectRef.current != null &&
      priceInputRef.current != null &&
      priceInputRef.current.value.match(/\d+/g) != null
    ) {
      const valueSelect = JSON.parse(selectRef.current.value) as IVariantItem;
      const valuePrice = Number(priceInputRef.current.value);
      if (valueSelect && item.variantType.id) {
        setVariantItems((prev) => [
          ...prev,
          { variantItem: valueSelect, priceModifier: valuePrice },
        ]);
        handleAddItem({
          idType: item.variantType.id,
          variantItem: { variantItem: valueSelect, priceModifier: valuePrice },
        });

        priceInputRef.current.value = "";
        priceInputRef.current.focus();
      }
    }
  };
  const handleRemoveVariantItem = (itemId?: number) => {
    if (itemId && item.variantType.id) {
      const newList = variantItems.filter((pi) => pi.variantItem.id != itemId);
      handleRemoveItem({
        idType: item.variantType.id,
        itemId: itemId,
      });
      setVariantItems(newList);
    }
  };
  return (
    <>
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white ">
        <div className="p-6 flex flex-col sm:flex-row items-center">
          <div
            className="sm:ml-8 cursor-pointer flex gap-2 items-center"
            onClick={() => setOpen(!open)}
          >
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <Chip variant="ghost" value={item.variantType.name} />
            </h3>
            <div className="self-center border p-2 rounded-md bg-white">
              <ChevronDownIcon
                className={` w-5 h-5 ${open ? "rotate-180" : ""} duration-200`}
              />
            </div>
          </div>
          <ButtonSecondary
            sizeClass="py-2 px-4 "
            fontSize="text-sm font-medium"
            className=" dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg !bg-red-400 text-white"
            onClick={() => handleRemoveItemType(item.variantType.id)}
          >
            remove
          </ButtonSecondary>
        </div>
        <Collapse open={open}>
          <div
            className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${"block"}`}
          >
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Value
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                          >
                            Price modifier
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {variantItems &&
                          variantItems.map((vi) => (
                            <tr key={vi.variantItem.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {vi.variantItem.value?.toUpperCase()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {vi.priceModifier}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <Button
                                  variant="filled"
                                  className="rounded-xl !p-2 !px-4"
                                  color="red"
                                  onClick={() =>
                                    handleRemoveVariantItem(vi.variantItem.id)
                                  }
                                >
                                  <TrashIcon className="w-8 h-8" />
                                </Button>
                              </td>
                            </tr>
                          ))}

                        {variantItems.length != listVariantItem?.length && (
                          <tr>
                            <td className="px-6 pl-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              <Select
                                className="rounded-md"
                                ref={selectRef}
                                id={`select-${item.variantType.name}`}
                              >
                                {handleRenderVariantNoExist().map((item) => (
                                  <option
                                    value={JSON.stringify(item)}
                                    key={item.value}
                                  >
                                    {`${item.value?.toUpperCase()}`}
                                  </option>
                                ))}
                              </Select>
                            </td>
                            <td className=" px-6 pl-2 py-4 whitespace-nowrap text-sm text-gray-800">
                              <Input
                                className="rounded-md"
                                ref={priceInputRef}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <Button
                                variant="filled"
                                className="rounded-xl !p-2 !px-4"
                                color="light-green"
                                onClick={handleAddVariantItem}
                              >
                                <PlusCircleIcon className="w-8 h-8" />
                              </Button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}
