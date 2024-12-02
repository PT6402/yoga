import { useState } from "react";
import { useDispatch } from "react-redux";
import { Category } from "../../context/type_stores";
import { handleError, ResultUtil, useHttpAuth } from "../../utils/http";
import { HttpStatusCode } from "axios";
import { setCategoryAdminStore } from "../../context/slice.category";
import toast from "react-hot-toast";

export default function useCategoryAdmin() {
  const dispatch = useDispatch();
  const urlCategory = "/category/admin";
  const { http_auth } = useHttpAuth();
  const [loading, setLoading] = useState<boolean>();
  const getAllCategoryByAdmin = async (): Promise<
    ResultUtil<Category[]> | undefined
  > => {
    setLoading(true);
    try {
      const res = await http_auth.get<ResultUtil<Category[]>>(urlCategory);
      if (
        res.status == HttpStatusCode.Ok &&
        res.data != null &&
        res.data.model != undefined
      ) {
        dispatch(setCategoryAdminStore(res.data.model));
      }
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addCategory = async ({
    name,
    file,
  }: {
    name: string;
    file: File;
  }): Promise<boolean> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const res = await http_auth.post<ResultUtil<Category[]>>(
        urlCategory,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add category success!");
        return true;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  const removeCategory = async ({ id }: { id: number }): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlCategory}/${id}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove category success!");
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  const updateCategory = async ({
    id,
    nameUpdate,
    file,
  }: {
    id: number;
    nameUpdate: string;
    file: File | null;
  }): Promise<boolean> => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", nameUpdate);
      if (file) formData.append("file", file);
      const res = await http_auth.put(`${urlCategory}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update category success!");
        return true;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  return {
    loading,
    getAllCategoryByAdmin,
    addCategory,
    removeCategory,
    updateCategory,
  };
}
