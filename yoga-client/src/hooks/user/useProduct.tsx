import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http, { handleError, ResultUtil } from "../../utils/http";
import { HttpStatusCode } from "axios";
import {
  setNewArrivalStore,
  setProductsStore,
} from "../../context/slice.product";
import { FilterProduct, ProductUser } from "../../context/type_stores";
import { Product } from "../../data_app/products";
import { RootState } from "../../context/store";

export default function useProduct() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.product);
  const urlProduct = "/product";
  const [loading, setLoading] = useState<boolean>();
  const getAllProduct = async (page?: number) => {
    setLoading(true);
    try {
      const res = await http.get<
        ResultUtil<{ data: ProductUser[]; totalPage: number }>
      >(`${urlProduct}/page/${page || currentPage}`);
      if (res.status == HttpStatusCode.Ok) {
        if (res.data && res.data.model) {
          dispatch(
            setProductsStore({
              product: res.data.model.data,
              totalPage: res.data.model.totalPage,
            })
          );
          return res.data.model.data;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const getOne = async (id: number) => {
    setLoading(true);
    try {
      const res = await http.get<ResultUtil<Product>>(`${urlProduct}/${id}`);
      if (res.status == HttpStatusCode.Ok) {
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const searchProduct = async (search: string): Promise<ProductUser[]> => {
    setLoading(true);
    try {
      const res = await http.get<ResultUtil<ProductUser[]>>(
        `${urlProduct}/search/${search}`
      );
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        return res.data.model;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return [];
  };

  const filterProduct = async ({
    page,
    dataFilter,
  }: {
    page: number;
    dataFilter: FilterProduct;
  }) => {
    setLoading(true);
    try {
      type data = {
        categoryId: null | number;
        brand: null | string;
        price: number[];
      };
      let data = {};
      if (
        dataFilter?.price &&
        dataFilter.price[0] != null &&
        dataFilter.price[1] != null
      ) {
        data = { ...data, price: [dataFilter.price[0], dataFilter.price[1]] };
      } else {
        data = { ...data, price: [null, null] };
      }
      if (dataFilter?.category) {
        data = { ...data, categoryId: dataFilter.category.id };
      } else {
        data = { ...data, categoryId: null };
      }
      if (dataFilter?.brand) {
        data = { ...data, brand: dataFilter.brand };
      } else {
        data = { ...data, brand: null };
      }
      const res = await http.post<
        ResultUtil<{ data: ProductUser[]; totalPage: number }>
      >(`${urlProduct}/filter/${page}`, data);
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        dispatch(
          setProductsStore({
            product: res.data.model.data,
            totalPage: res.data.model.totalPage,
          })
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const getAllNewArrival = async () => {
    setLoading(true);
    try {
      const res = await http.get<ResultUtil<ProductUser[]>>(
        `${urlProduct}/new-arrival`
      );
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        dispatch(setNewArrivalStore(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return [];
  };
  return {
    loading,
    getOne,
    getAllProduct,
    searchProduct,
    filterProduct,
    getAllNewArrival,
  };
}
