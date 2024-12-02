import { useEffect, useState } from "react";
import ModalDialog from "./ModalDialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import Prices from "./Prices";
import { useDebounce } from "../hooks/util";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useProduct } from "../hooks/user";
import { ProductUser } from "../context/type_stores";
export default function SearchApp() {
  const [open, setOpen] = useState(false);
  const { searchProduct } = useProduct();
  const { products } = useSelector((state: RootState) => state.product);
  const [inputSearch, setInputSearch] = useState("");
  const [productSearch, setProductSearch] = useState(products);
  const debounceSearch = useDebounce(inputSearch, 500);

  useEffect(() => {
    if (inputSearch.trim() != "") {
      searchProduct(inputSearch).then((data) => {
        setProductSearch(data);
      });
    } else {
      setProductSearch(products);
    }
  }, [debounceSearch]);
  const renderProduct = (
    item: ProductUser,
    index: number,
    close: () => void
  ) => {
    const { id, name, image, brand, price } = item;
    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${image}`}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            to={`/product-detail/${id}`}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} to={`/product-detail/${id}`}>
                    {name}
                  </Link>
                </h3>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400 w-fit ">
                  {brand}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400 w-fit ">
                  <Prices price={price} className="mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    setInputSearch("");
    setProductSearch(products);
  }, [open]);
  return (
    <>
      <button
        className="lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ModalDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        className="lg:w-1/3 md:w-3/4 w-full max-w-[70rem] h-[calc(100vh-15rem)] min-h-[25rem] max-h-[50rem] md:mx-0 mx-4 !z-[9999] bg-white p-8 drop-shadow-2xl rounded-lg no-doc-scroll"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0"
        >
          <div className="flex-1 text-start  w-fit p-1 rounded-bl-lg rounded-tr-md  bg-red-400">
            <XMarkIcon className="w-6 h-6 text-white" />
          </div>
        </button>
        <div className="flex flex-col gap-y-4 h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // navigate("/page-search");
            }}
            className="flex-1 py-2 text-slate-900 dark:text-slate-100"
          >
            <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded-lg">
              <input
                // ref={inputRef}
                type="text"
                placeholder="Type and press enter"
                className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base py-5"
                onChange={(e) => setInputSearch(e.target.value)}
                // autoFocus
              />
              {/* <button type="button" onClick={() => setOpen(false)}>
                <XMarkIcon className="w-5 h-5" />
              </button> */}
            </div>

            <input type="submit" hidden value="" />
          </form>
          <div className="flex flex-row items-center gap-x-2 text-xs">
            <hr className="flex-1" />
            Your Search Results
            <hr className="flex-1" />
          </div>
          <div className="overflow-y-auto flex flex-col h-full scrollbar">
            {productSearch.map((item, index) =>
              renderProduct(item, index, () => setOpen(false))
            )}
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
