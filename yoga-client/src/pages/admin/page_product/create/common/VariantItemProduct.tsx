import React, { useState } from "react";
import { DataVariant } from "../context/type_context";
import { VariantItem } from "../../../../../context/type_stores";
import { Typography } from "@material-tailwind/react";

const VariantItemProduct = React.memo(
  ({
    variant,
    handleChangePriceProduct,
  }: {
    variant: DataVariant;
    handleChangePriceProduct: ({
      typeId,
      oldItemId,
      newItemId,
    }: {
      typeId: number;
      oldItemId: number;
      newItemId: number;
    }) => void;
  }) => {
    const [active, setActive] = useState<VariantItem>(
      variant.variantItems[0].variantItem
    );
    const handleChangePrice = (id?: number) => {
      if (id) {
        const item = variant.variantItems.find((pv) => pv.variantItem.id == id);
        const typeId = variant.variantType.id;
        const newItemId = id;
        const oldItemId = active.id;
        if (item && item.priceModifier && typeId && oldItemId) {
          handleChangePriceProduct({ typeId, oldItemId, newItemId });
        }
      }
    };
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              {variant.variantType.name}:
              <span className="ml-1 font-semibold">{active?.value}</span>
            </span>
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {variant.variantItems.map((item, index) => {
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${"cursor-pointer"} ${
                  active?.id == item.variantItem.id
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                } w-fit px-4`}
                onClick={() => {
                  setActive(item.variantItem);
                  handleChangePrice(item.variantItem.id);
                }}
              >
                <Typography className="font-bold w-fit" variant="paragraph">
                  {item.variantItem.value}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
export default VariantItemProduct;
