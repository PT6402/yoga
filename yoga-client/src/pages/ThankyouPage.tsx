/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import Prices from "../components/Prices";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import { RootState } from "../context/store";
import { formatPrice } from "../utils/productUtil";
import { ProductItemCart } from "../context/type_stores";
import { Fragment, useEffect } from "react";
import qrCode from "../assets/img/QR_code_for_mobile_English_Wikipedia.svg.png";
import { useNavigate } from "react-router-dom";
export default function ThankyouPage() {
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.order);
  const { infoApp } = useSelector((state: RootState) => state.uiApp);
  const renderProductItem = (itemCart: ProductItemCart, index: number) => {
    const { price, product, quantity, variants } = itemCart;
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${
              product.image.mainImage
            }`}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">
                  {product.name}
                </h3>
                <div className=" flex-1 flex justify-start">
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
              </div>
              {/* <Prices className="mt-0.5 ml-2" price={price} /> */}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">Qty</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="ml-2">{quantity}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (data.length == 0) {
      navigate("/");
    }
  }, []);
  return (
    <section className="py-5 relative">
      <div className="w-full max-w-2xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex">
          <div className="w-full flex-col justify-start items-start lg:gap-14 gap-8 flex">
            <div className="w-full text-center text-green-600 text-3xl font-bold font-manrope leading-normal">
              Order Success!
              <p className="text-lg text-gray-500"> Thank you for shopping</p>
            </div>
            <div className="w-full p-5 rounded-xl flex-col justify-start items-center gap-4 flex">
              <div className="w-full flex flex-col-reverse justify-between items-center gap-6  sm:flex-row">
                <div className="text-gray-600 text-lg font-normal leading-8 sm:w-fit w-full">
                  <h4 className="text-black text-xl font-medium leading-8">
                    Thông tin chuyển khoản
                  </h4>
                  <h5 className="text-gray-500 text-lg font-normal leading-8">
                    Số TK: {(infoApp && infoApp.bankStk) || "000000000000"}
                  </h5>
                  <h5 className="text-gray-500 text-lg font-normal leading-8">
                    Ngân hàng:{" "}
                    {(infoApp && infoApp.bankName) || "bank vietnamese"}
                  </h5>
                  <h5 className="text-gray-500 text-lg font-normal leading-8">
                    Tên: {(infoApp && infoApp.bankOwnerName) || "Chu shop"}
                  </h5>
                </div>
                <div className="text-right text-gray-900 text-lg font-semibold leading-8">
                  <img
                    src={
                      (infoApp &&
                        infoApp.bankQRCode &&
                        `${import.meta.env.VITE_SERVER_URL}/info_app/${
                          infoApp.bankQRCode
                        }`) ||
                      qrCode
                    }
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full ">
            <div className="rounded-lg border border-gray-300 w-full p-3 mb-3">
              <div className="flex-col justify-start items-start gap-2 flex ">
                <h4 className="text-black text-xl font-medium leading-8">
                  Hello, {data && data.length > 0 && data[0].info.fullname}
                </h4>
                <h5 className="text-gray-500 text-lg font-normal">
                  Phone: {data && data.length > 0 && data[0].info.phone}
                </h5>
                <h5 className="text-gray-500 text-lg font-normal">
                  Address: {data && data.length > 0 && data[0].info.address}
                </h5>
              </div>
            </div>
            <div className="w-full justify-center items-start ">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
                <div className="border-b border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
                  {data &&
                    data.length > 0 &&
                    data[0].cart.map(renderProductItem)}
                </div>
              </div>
            </div>
            <div className="w-full p-5 rounded-xl border border-gray-200 flex-col justify-start items-center gap-4 flex mt-2">
              <div className="w-full justify-between items-center gap-6 inline-flex">
                <h5 className="text-gray-600 text-lg font-normal leading-8">
                  Total:
                </h5>
                <h5 className="text-right text-gray-900 text-lg font-semibold leading-8">
                  {data &&
                    data.length > 0 &&
                    formatPrice(
                      data[0].cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                    )}{" "}
                  vnd
                </h5>
              </div>
            </div>
          </div>
          <ButtonPrimary href="/" className="mt-8 w-full max-w-fit mx-auto">
            Back to shopping
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
}
