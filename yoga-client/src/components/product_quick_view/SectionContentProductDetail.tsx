import NcInputNumber from "../../components/NcInputNumber";
import Prices from "../../components/Prices";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import VariantItemProductDetail from "./VariantItemProductDetail";
import { useCallback, useState } from "react";
import { getHighestPriceVariants } from "../../utils/productUtil";
import { Product } from "../../data_app/products";
import { ProductItemCartAdmin } from "../../context/type_stores";
import { mapInputToResult } from "../../utils/orderUtil";
import { useOrderAdmin } from "../../hooks/admin";
import { useParams } from "react-router-dom";

interface Props {
  product: Product;
  defaultItem?: ProductItemCartAdmin;
  reloadPage?: () => void;
  handleClose: () => void;
  titleFunction: string;
}
export default function SectionContentProductDetail({
  product,
  defaultItem,
  reloadPage,
  handleClose,
  titleFunction,
}: Props) {
  const { id: orderId } = useParams();
  const { updateOrderItem, addOrderItem } = useOrderAdmin();
  const { price_base, variants, name } = product;
  const [qualitySelected, setQualitySelected] = useState(() => {
    if (defaultItem && defaultItem.quantity) {
      return defaultItem.quantity;
    } else {
      return 1;
    }
  });
  const [variantSelect, setVariantSelect] = useState<
    { type: string; value: string }[]
  >([]);
  const [priceProduct, setPriceProduct] = useState((): number => {
    if (defaultItem && defaultItem.variants) {
      return (
        mapInputToResult(variants, defaultItem.variants).reduce(
          (total, item) => total + item.price_modifier,
          0
        ) + price_base
      );
    } else {
      let price = price_base;
      getHighestPriceVariants(variants).forEach((item) => {
        price = price + item.price_modifier;
      });
      return price;
    }
  });
  const handleAddToCart = () => {
    const variantProductSelect = variantSelect.map((item) => item.value);
    console.log({
      price: priceProduct,
      product: product!,
      quantity: qualitySelected,
      variants: variantProductSelect,
    });
    if (titleFunction == "update") {
      if (defaultItem && defaultItem.id) {
        updateOrderItem(defaultItem.id, {
          price: priceProduct,
          productId: product.id,
          quantity: qualitySelected,
          variants: variantProductSelect,
        }).then((res) => {
          if (res) {
            if (reloadPage) {
              reloadPage();
              handleClose();
            }
          }
        });
      }
    }

    if (titleFunction == "add") {
      addOrderItem(Number(orderId), {
        price: priceProduct,
        productId: product.id,
        quantity: qualitySelected,
        variants: variantProductSelect,
      }).then((res) => {
        if (res) {
          if (reloadPage) {
            reloadPage();
            handleClose();
          }
        }
      });
    }
  };
  const handleChangePrice = useCallback(
    ({ type, resultPrice }: { type: string; resultPrice: number }) => {
      const item = variants.find((pv) => pv.type == type);
      if (item) {
        const price = priceProduct + resultPrice;
        setPriceProduct(price);
      }
    },
    [priceProduct]
  );

  const handleGetValue = useCallback(
    ({ type, value }: { type: string; value: string }) => {
      const item = variantSelect.find((v) => v.type == type);
      if (item) {
        item.value = value;
        setVariantSelect([...variantSelect]);
      } else {
        setVariantSelect((prev) => [...prev, { type: type, value: value }]);
      }
    },
    [variantSelect]
  );

  return (
    <div className="space-y-7 2xl:space-y-8">
      {/* ---------- 1 HEADING ----------  */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">{name}</h2>

        <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
          <Prices
            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
            price={priceProduct}
          />
        </div>
      </div>

      {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
      {variants &&
        variants.length > 0 &&
        variants.map((item, index) => (
          <VariantItemProductDetail
            handleGetValue={handleGetValue}
            variant={item}
            key={index}
            defaultItem={defaultItem}
            handleChangePriceProduct={handleChangePrice}
          />
        ))}

      {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
      <div className="flex space-x-3.5">
        <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
          <NcInputNumber
            defaultValue={qualitySelected}
            onChange={setQualitySelected}
          />
        </div>
        <ButtonPrimary
          className="flex-1 flex-shrink-0 !ring-transparent"
          onClick={handleAddToCart}
        >
          <span className="ml-3">{titleFunction}</span>
        </ButtonPrimary>
      </div>
    </div>
  );
}
