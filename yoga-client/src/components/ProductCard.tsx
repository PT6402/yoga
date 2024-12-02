import Prices from "./Prices";
import { Link } from "react-router-dom";
import NcImage from "../shared/NcImage/NcImage";
import { ProductUser } from "../context/type_stores";

export interface ProductCardProps {
  className?: string;
  data: ProductUser;
  isLiked?: boolean;
}

export default function ProductCard({
  className = "",
  data,
}: // isLiked,
ProductCardProps) {
  const { name, price, brand, image } = data;
  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link
          to={`/product-detail/${data.id}`}
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={`/product-detail/${data.id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={`${import.meta.env.VITE_SERVER_URL}/images/${image}`}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {brand}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />
          </div>
        </div>
      </div>
    </>
  );
}
