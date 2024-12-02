import toast from "react-hot-toast";
import BagIcon from "../../components/BagIcon";
import NcInputNumber from "../../components/NcInputNumber";
import Prices from "../../components/Prices";
import { useCart } from "../../hooks/user";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import VariantItemProductDetail from "./VariantItemProductDetail";
import NotifyAddTocart from "../../components/NotifyAddTocart";
import { ProductItemCart } from "../../context/type_stores";
import { useCallback, useState } from "react";
import { getHighestPriceVariants } from "../../utils/productUtil";
import { Product } from "../../data_app/products";

interface Props {
  product: Product;
}
export default function SectionContentProductDetail({ product }: Props) {
  const { addToCart } = useCart();
  const { price_base, variants, name } = product;
  const [qualitySelected, setQualitySelected] = useState(1);
  const [variantSelect, setVariantSelect] = useState<
    { type: string; value: string }[]
  >([]);
  const [priceProduct, setPriceProduct] = useState((): number => {
    let price = price_base;
    getHighestPriceVariants(variants).forEach((item) => {
      price = price + item.price_modifier;
    });
    return price;
  });
  const notifyAddTocart = (item: ProductItemCart) => {
    toast.custom((t) => <NotifyAddTocart show={t.visible} item={item} />, {
      position: "top-right",
      id: "nc-product-notify",
      duration: 800,
    });
  };
  const handleAddToCart = () => {
    const variantProductSelect = variantSelect.map((item) => item.value);
    addToCart({
      price: priceProduct,
      product: product!,
      quantity: qualitySelected,
      variants: variantProductSelect,
    });
    notifyAddTocart({
      price: priceProduct,
      product: product!,
      quantity: qualitySelected,
      variants: variantProductSelect,
    });
    setQualitySelected(1);
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
          <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
          <span className="ml-3">Add to cart</span>
        </ButtonPrimary>
      </div>
      <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
    </div>
  );
}
