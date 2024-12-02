import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/user";
import { Product } from "../../data_app/products";
import SectionContentProductDetail from "./SectionContentProductDetail";
import { ProductItemCartAdmin } from "../../context/type_stores";

export interface ProductQuickViewProps {
  className?: string;
  productId: number;
  defaultItem?: ProductItemCartAdmin;
  reloadPage?: () => void;
  handleClose: () => void;
  titleFunction: string;
}
export default function ProdudctQuickView({
  className = "",
  productId,
  defaultItem,
  reloadPage,
  handleClose,
  titleFunction,
}: ProductQuickViewProps) {
  const { getOne } = useProduct();
  const [productDetail, setProductDetail] = useState<Product>();
  useEffect(() => {
    getOne(productId).then((res) => {
      if (res) {
        setProductDetail(res);
      }
    });
  }, []);
  return (
    <div className={`nc-ProductQuickView ${className}`}>
      <div className="lg:flex">
        {productDetail && (
          <div className="w-full lg:w-[50%] ">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/${
                    productDetail.image.mainImage
                  }`}
                  className="w-full rounded-xl object-cover"
                  alt="product detail 1"
                />
              </div>
            </div>
          </div>
        )}
        {productDetail && (
          <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-8">
            <SectionContentProductDetail
              product={productDetail}
              defaultItem={defaultItem}
              reloadPage={reloadPage}
              handleClose={handleClose}
              titleFunction={titleFunction}
            />
          </div>
        )}
      </div>
    </div>
  );
}
