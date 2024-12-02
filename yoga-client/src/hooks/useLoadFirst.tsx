import { useCategoryAdmin, useProductAdmin, useVariantAdmin } from "./admin";
import useOrderAdmin from "./admin/useOrderAdmin";

import { useCategory, useProduct } from "./user";
import useInfoApp from "./user/useInfoApp";

export const useLoadFirst = () => {
  const { getAllCategoryByAdmin } = useCategoryAdmin();
  const { getAllVariant } = useVariantAdmin();
  const { getAllProductByAdmin } = useProductAdmin();
  const { getAllCategory } = useCategory();
  const { getAllProduct, getAllNewArrival } = useProduct();
  const { getAllOrder } = useOrderAdmin();
  const { getInfo } = useInfoApp();
  const load = async () => {
    try {
      await getInfo();
      await getAllCategory();
      await getAllProduct();
      await getAllNewArrival();
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  const loadAdmin = async () => {
    try {
      await getInfo();
      await getAllCategoryByAdmin();
      await getAllVariant();
      await getAllProductByAdmin();
      await getAllOrder();

      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  return { load, loadAdmin };
};
