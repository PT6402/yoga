import { formatPrice } from "../utils/productUtil";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}
export default function Prices({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}: PricesProps) {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none">
          {formatPrice(price)} vnđ
        </span>
      </div>
    </div>
  );
}
