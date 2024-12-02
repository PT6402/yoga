import { Button } from "@material-tailwind/react";
import Select from "../../../../../shared/Select";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { useForm } from "../context/FormContext";
import { FormCreateType } from "../context/FormContants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../context/store";
import { useRef, useState } from "react";
import { DataVariant, VariantItemProduct } from "../context/type_context";
import { Variant } from "../../../../../context/type_stores";
import VariantItem from "../common/VariantItem";

export default function StepVariant() {
  const { state, dispatch } = useForm();
  const { data: variants } = useSelector((state: RootState) => state.variant);
  const variantSelectRef = useRef<HTMLSelectElement>(null);
  const [variantProducts, setVariantProducts] = useState<DataVariant[]>(
    state.dataVariant
  );
  const handleAddVariant = () => {
    if (variantSelectRef.current != null) {
      const variantSelect = JSON.parse(
        variantSelectRef.current.value
      ) as Variant;
      setVariantProducts((prev) => [
        ...prev,
        { variantType: variantSelect, variantItems: [] },
      ]);
    }
  };
  const handleRemoveProductVariant = (id?: number) => {
    if (id) {
      const listNew = variantProducts.filter(
        ({ variantType: type }: DataVariant) => id != type.id
      );
      setVariantProducts(listNew);
      return listNew;
    }
  };
  const handleRenderVariantNoExist = () => {
    const listOption: Variant[] = [];

    variants.forEach((item) => {
      const itemExist = variantProducts.some(
        (pv) => pv.variantType.id == item.id
      );
      if (!itemExist) {
        listOption.push(item);
      }
    });
    return listOption;
  };
  const handleAddVariantItem = ({
    idType,
    variantItem,
  }: {
    idType: number;
    variantItem: VariantItemProduct;
  }) => {
    const item = variantProducts.find(
      ({ variantType }: DataVariant) => variantType.id == idType
    );
    if (item && item.variantItems) {
      item.variantItems.push(variantItem);
    }
    setVariantProducts([...variantProducts]);
  };
  const handleRemoveVariantItem = ({
    idType,
    itemId,
  }: {
    idType: number;
    itemId: number;
  }) => {
    const items = variantProducts.find((pv) => pv.variantType.id == idType);
    if (items && items.variantItems) {
      const newList = items.variantItems?.filter(
        (pi) => pi.variantItem.id != itemId
      );
      items.variantItems = newList;
      setVariantProducts([...variantProducts]);
    }
  };
  const handleChangeStep = () => {
    const cleanList: DataVariant[] = [];
    variantProducts.forEach((item) => {
      if (item.variantItems && item.variantItems.length > 0) {
        cleanList.push(item);
      }
    });
    dispatch({
      type: FormCreateType.SET_DATA_VARIANT,
      payload: cleanList,
    });
  };
  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-between items-center mb-5">
        <div className="self-center  flex gap-2">
          {variantProducts.length != variants.length && (
            <>
              <Select
                className="rounded-md min-w-40 w-full"
                ref={variantSelectRef}
              >
                {handleRenderVariantNoExist().map((item) => (
                  <option value={JSON.stringify(item)} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <Button
                variant="filled"
                className="w-full text-nowrap !text-white"
                color="light-green"
                onClick={handleAddVariant}
              >
                Add variant
              </Button>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-transparent mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-slate-800 !ring-transparent border-2 border-slate-800 "
            onClick={() => {
              handleChangeStep();
              dispatch({ type: FormCreateType.PREV_STEP });
            }}
          >
            Back
          </ButtonSecondary>
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-white !ring-transparent"
            onClick={() => {
              handleChangeStep();
              dispatch({ type: FormCreateType.NEXT_STEP });
            }}
          >
            Next
          </ButtonSecondary>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {variantProducts.map((pv) => {
          const listVariantItem = variants.find(
            ({ id }: Variant) => id == pv.variantType.id
          )?.values;
          return (
            <VariantItem
              key={pv.variantType?.id}
              item={pv}
              listVariantItem={listVariantItem}
              handleRemoveItemType={handleRemoveProductVariant}
              handleAddItem={handleAddVariantItem}
              handleRemoveItem={handleRemoveVariantItem}
            />
          );
        })}
      </div>
    </div>
  );
}
