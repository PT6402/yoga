import { OrderAdmin } from "../../../../context/type_stores";
import ProductItem from "./ProductItem";
import { formatPrice } from "../../../../utils/productUtil";
import AddProductOrder from "./AddProductOrder";
import ModalQuickView from "../../../../components/ModalQuickView";
import { useState } from "react";
interface Props {
  dataDetail?: OrderAdmin;
  reloadPage: () => void;
}
export default function ProductInfo({ dataDetail, reloadPage }: Props) {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>();
  const hanldeGetProductId = (id?: number) => {
    if (id) {
      setProductId(id);
      setOpen(true);
    }
  };
  return (
    <>
      {productId && (
        <ModalQuickView
          titleFunction={"add"}
          productId={productId}
          reloadPage={reloadPage}
          show={open}
          onCloseModalQuickView={() => setOpen(false)}
        />
      )}
      <div className="w-full mt-10 border border-gray-200 bg-white rounded-2xl flex flex-col">
        <div className="p-6 flex items-center justify-between border-b">
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">products order</span>
            </h3>
          </div>
          <div className="flex gap-2">
            <AddProductOrder handleGetProductId={hanldeGetProductId} />
          </div>
        </div>
        <div className="divide-y divide-slate-200/70 dark:divide-slate-700  px-5 mt-5 w-full  ">
          {dataDetail &&
            dataDetail.item.map((item, index) => (
              <ProductItem item={item} key={index} reloadPage={reloadPage} />
            ))}
        </div>

        <div className="mt-10 mb-5 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 w-full ">
          <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4 px-5">
            <span>Order total</span>
            <span>
              {dataDetail && formatPrice(dataDetail.info.totalPrice)} vnd
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
