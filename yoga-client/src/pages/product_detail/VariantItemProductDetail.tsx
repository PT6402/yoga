import React, { useEffect, useState } from "react";
import { ProductVariant, ProductVariantItem } from "../../data_app/products";
import { Typography } from "@material-tailwind/react";

const VariantItemProductDetail = React.memo(
  ({
    variant,
    handleChangePriceProduct,
    handleGetValue,
  }: {
    variant: ProductVariant;
    handleChangePriceProduct: ({
      type,
      resultPrice,
    }: {
      type: string;
      resultPrice: number;
    }) => void;
    handleGetValue: ({ type, value }: { type: string; value: string }) => void;
  }) => {
    const [active, setActive] = useState<ProductVariantItem>(() => {
      return variant.item.reduce((maxItem, currentItem) => {
        return currentItem.price_modifier > maxItem.price_modifier
          ? currentItem
          : maxItem;
      });
    });
    const handleChangePrice = (value?: string) => {
      if (value) {
        const newItem = variant.item.find((pv) => pv.value == value);
        const oldItem = variant.item.find((pv) => pv.value == active.value);
        if (newItem && oldItem) {
          const resultPrice = newItem.price_modifier - oldItem.price_modifier;
          handleChangePriceProduct({
            type: variant.type,
            resultPrice,
          });
        }
      }
    };
    useEffect(() => {
      // console.log()
      handleGetValue({ type: variant.type, value: active.value });
    }, [active]);
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              {variant.type}:
              <span className="ml-1 font-semibold">{active?.value}</span>
            </span>
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {variant.item.map((item, index) => {
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${"cursor-pointer"} ${
                  active?.value == item.value
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                } w-fit px-4`}
                onClick={() => {
                  setActive(item);
                  handleChangePrice(item.value);
                }}
              >
                <Typography className="font-bold w-fit" variant="paragraph">
                  {item.value}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default VariantItemProductDetail;
