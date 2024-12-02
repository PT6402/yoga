import { Button } from "@material-tailwind/react";
import Select from "../../../../../shared/Select";
import VariantItem from "../common/VariantItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../context/store";
import { useEffect, useRef, useState } from "react";
import { ProductVariant, Variant } from "../../../../../context/type_stores";
import { useParams } from "react-router-dom";
import { useProductAdmin } from "../../../../../hooks/admin";

export default function StepVariant() {
  const { id: productId } = useParams();
  const {
    removeVariantType,
    getOneProduct,
    addProductVariantItem,
    removeProductVariantItem,
  } = useProductAdmin();
  const { product_variant } = useSelector((state: RootState) => state.product);
  const { data: variants } = useSelector((state: RootState) => state.variant);
  const variantSelectRef = useRef<HTMLSelectElement>(null);
  const [variantProducts, setVariantProducts] =
    useState<ProductVariant[]>(product_variant);
  const handleRenderVariantNoExist = () => {
    const listOption: Variant[] = [];
    variants.forEach((item) => {
      const itemExist = variantProducts.some((pv) => pv.id == item.id);
      if (!itemExist) {
        listOption.push(item);
      }
    });
    return listOption;
  };
  const handleRemoveProductVariant = (id?: number) => {
    if (id) {
      if (product_variant.find((pv) => pv.id == id)) {
        removeVariantType({ productId: Number(productId), typeId: id }).then(
          async (res) => {
            if (res) {
              await getOneProduct(Number(productId));
            }
          }
        );
      } else {
        const listNew = variantProducts.filter(
          ({ id: typeId }: ProductVariant) => typeId != id
        );
        setVariantProducts(listNew);
      }
    }
  };
  const handleAddVariant = () => {
    if (variantSelectRef.current != null) {
      const variantSelect = JSON.parse(
        variantSelectRef.current.value
      ) as ProductVariant;
      if (variantSelect.id && variantSelect.name) {
        setVariantProducts((prev) => [
          ...prev,
          { id: variantSelect.id, name: variantSelect.name, variants: [] },
        ]);
      }
    }
  };
  const handleAddVariantItem = ({
    typeId,
    variantId,
    price_modifier,
  }: {
    typeId: number;
    variantId: number;
    price_modifier: number;
  }) => {
    addProductVariantItem({
      price_modifier,
      productId: Number(productId),
      variantId,
      variantTypeId: typeId,
    }).then(async (res) => {
      if (res) {
        await getOneProduct(Number(productId));
      }
    });
  };
  const handleRemoveVariantItem = ({ variantId }: { variantId: number }) => {
    removeProductVariantItem(variantId).then(async (res) => {
      if (res) {
        await getOneProduct(Number(productId));
      }
    });
  };
  useEffect(() => {
    setVariantProducts(product_variant);
  }, [product_variant]);
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
      </div>
      <div className="flex flex-col gap-2">
        {variantProducts.map((pv) => {
          const listVariantItem = variants.find(
            ({ id }: Variant) => id == pv.id
          )?.values;
          return (
            <VariantItem
              key={pv.id}
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
