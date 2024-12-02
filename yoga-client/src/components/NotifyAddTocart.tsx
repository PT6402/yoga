import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Prices from "./Prices";
import { ProductItemCart } from "../context/type_stores";
import { Fragment } from "react";

interface Props {
  show: boolean;
  item: ProductItemCart;
}
export default function NotifyAddTocart({ show, item }: Props) {
  const { product, price, variants, quantity } = item;

  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${
              product.image.mainImage
            }`}
            alt={product.name}
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {variants.map((item, index) => (
                    <Fragment key={index}>
                      <span>{item}</span>
                      {index != variants.length - 1 && (
                        <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                      )}
                    </Fragment>
                  ))}
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty ${quantity}`}</p>

            <div className="flex">
              <Link
                to={"/cart"}
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <p className="block text-base font-semibold leading-none">
        Added to cart!
      </p>

      <hr className=" border-slate-200 dark:border-slate-700 my-4" />
      {renderProductCartOnNotify()}
    </Transition>
  );
}
