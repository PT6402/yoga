import { useState } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../context/type_stores";
import http, { ResultUtil } from "../../utils/http";
import { HttpStatusCode } from "axios";
import { setCategoryStore } from "../../context/slice.category";

export default function useCategory() {
  const dispatch = useDispatch();
  const urlCategory = "/category";
  const [loading, setLoading] = useState<boolean>();
  const getAllCategory = async () => {
    setLoading(true);
    try {
      const res = await http.get<
        ResultUtil<{ categorys: Category[]; brands: string[]; price: number[] }>
      >(`${urlCategory}`);
      if (
        res.status == HttpStatusCode.Ok &&
        res.data != null &&
        res.data.model != undefined
      ) {
        dispatch(setCategoryStore(res.data.model));
        return res.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getAllCategory,
  };
}
