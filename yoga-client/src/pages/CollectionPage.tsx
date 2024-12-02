import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import TabFilters from "../components/TabFilters";
import Pagination from "../shared/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
export interface PageCollectionProps {
  className?: string;
}

export default function CollectionPage({
  className = "",
}: PageCollectionProps) {
  const { products } = useSelector((state: RootState) => state.product);

  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Collection || Yoga - Equips</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          <main>
            {/* TABS FILTER */}
            <TabFilters />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {products.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>
    </div>
  );
}
