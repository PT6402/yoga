import twFocusClass from "../utils/twFocusClass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { setCurrentPage } from "../context/slice.product";
import { useProduct } from "../hooks/user";

export interface PaginationProps {
  className?: string;
}

export default function Pagination({ className = "" }: PaginationProps) {
  const { getAllProduct, filterProduct } = useProduct();
  const dispatch = useDispatch();
  const {
    totalPage,
    currentPage,
    isFilter,
    filterProduct: dataFilter,
  } = useSelector((state: RootState) => state.product);
  const handlePagination = async (index_page: number) => {
    if (isFilter) {
      await filterProduct({ page: index_page, dataFilter });
    } else {
      await getAllProduct(index_page);
    }
    dispatch(setCurrentPage(index_page));
  };
  const renderItem = (_item: unknown, index: number) => {
    if (index + 1 === currentPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {index + 1}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => handlePagination(index + 1)}
      >
        {index + 1}
      </button>
    );
  };
  return (
    <>
      {totalPage > 0 && (
        <nav
          className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
        >
          {Array(totalPage).fill(null).map(renderItem)}
        </nav>
      )}
    </>
  );
}
