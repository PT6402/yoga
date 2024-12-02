import FormInfo from "./FormInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderAdmin } from "../../../../context/type_stores";
import { useOrderAdmin } from "../../../../hooks/admin";
import ProductInfo from "./ProductInfo";

export default function OrderEditPage() {
  const { id } = useParams();
  const { getOneOrder } = useOrderAdmin();
  const [dataDetail, setDataDetail] = useState<OrderAdmin>();
  const reloadPage = () => {
    getOneOrder(Number(id)).then((res) => {
      if (res) {
        setDataDetail(res);
      }
    });
  };
  useEffect(() => {
    reloadPage();
  }, [id]);

  return (
    <div>
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="flex flex-col ">
          <div className="flex-1  ">
            <div id="ShippingAddress" className="scroll-mt-24 sticky top-28">
              {dataDetail && (
                <FormInfo dataDetail={dataDetail} reloadPage={reloadPage} />
              )}
            </div>
          </div>
          <ProductInfo dataDetail={dataDetail} reloadPage={reloadPage} />
        </div>
        <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>
      </main>
    </div>
  );
}
