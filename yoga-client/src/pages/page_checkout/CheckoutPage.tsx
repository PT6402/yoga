import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Prices from "../../components/Prices";
import NcInputNumber from "../../components/NcInputNumber";
import FormInfo from "./FormInfo";
import { ProductItemCart } from "../../context/type_stores";
import { useCart } from "../../hooks/user";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { formatPrice } from "../../utils/productUtil";
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.cart);
  const { removeCart, updateCart } = useCart();
  const handleChangeQuantity = (quantity: number, item: ProductItemCart) => {
    updateCart(item.variants, quantity);
  };

  const renderProduct = (item: ProductItemCart, index: number) => {
    const { product, price, variants, quantity } = item;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0 ">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${
              product.image.mainImage
            }`}
            alt={product.name}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link to="/product-detail">{product.name}</Link>
                </h3>
                <div className="hidden flex-1 sm:flex justify-start">
                  <Prices price={price} className="mt-0.5" />
                </div>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  {variants.map((item, index) => (
                    <Fragment key={index}>
                      <div className="flex items-center space-x-1.5">
                        <span>{item}</span>
                      </div>
                      {index != variants.length - 1 && (
                        <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                    onChange={(e) =>
                      handleChangeQuantity(Number(e.target.value), item)
                    }
                    value={quantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={price}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              <NcInputNumber
                className="relative z-10"
                onChange={(value) => {
                  handleChangeQuantity(value, item);
                }}
                defaultValue={quantity}
              />
            </div>

            <button
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
              onClick={() => removeCart(variants)}
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  let handleSubmit: () => void;
  const handleGetSubmit = (func: () => void) => {
    handleSubmit = func;
  };
  useEffect(() => {
    if (data.length == 0) {
      navigate("/");
    }
  }, []);
  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>Checkout || Yoga - Equips</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex-1  ">
            <div id="ShippingAddress" className="scroll-mt-24 sticky top-28">
              <FormInfo
                handleSubmitOutSide={handleGetSubmit}
                productCart={data}
              />
            </div>
          </div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
          <div className="w-full lg:w-[36%]">
            <h3 className="text-lg font-semibold text-nowrap">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700  ">
              {data.map(renderProduct)}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              {/* <div className="mt-4 flex justify-between py-2.5">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $249.00
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  $5.00
                </span>
              </div> */}
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>
                  {formatPrice(
                    data.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}{" "}
                  vnd
                </span>
              </div>
            </div>
            <ButtonPrimary
              className="mt-8 w-full"
              onClick={() => {
                if (handleSubmit) {
                  handleSubmit();
                }
              }}
            >
              Confirm order
            </ButtonPrimary>
          </div>
          {/* <div className="w-full h-full border border-slate-200 dark:border-slate-700 rounded-xl "></div> */}
        </div>
        <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
      </main>
    </div>
  );
}
