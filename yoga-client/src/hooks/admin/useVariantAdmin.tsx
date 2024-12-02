import { useState } from "react";
import { handleError, ResultUtil, useHttpAuth } from "../../utils/http";
import { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import { Variant, VariantItem } from "../../context/type_stores";
import { setVariants } from "../../context/slice.variant";
import toast from "react-hot-toast";

export default function useVariantAdmin() {
  const dispatch = useDispatch();
  const urlVariant = "/variant/admin";
  const { http_auth } = useHttpAuth();
  const [loading, setLoading] = useState<boolean>();
  const getAllVariant = async () => {
    setLoading(true);
    try {
      const res = await http_auth.get<ResultUtil<Variant[]>>(urlVariant);
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        dispatch(setVariants(res.data.model));
        return res.data;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const addVariant = async ({
    nameVariantType,
    variants,
  }: {
    nameVariantType: string;
    variants: VariantItem[];
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (variants.length > 0) {
        formData.append("nameVariantType", nameVariantType);
        for (let i = 0; i < variants.length; i++) {
          if (variants[i].value) {
            formData.append(`valueVariants[${i}]`, variants[i].value as string);
          }
        }
      }
      const res = await http_auth.post(urlVariant, formData);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add variant success!");
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
  const removeVariant = async (idVariantType: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlVariant}/type/${idVariantType}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove variant success!");
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

  const addVariantItem = async ({
    idVariantType,
    valueVariant,
  }: {
    idVariantType: number;
    valueVariant: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("valueVariant", valueVariant);
      const res = await http_auth.post(
        `${urlVariant}/type/${idVariantType}`,
        formData
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add success!");
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
  const updateVariantItem = async ({
    idVariantItem,
    valueVariant,
  }: {
    idVariantItem: number;
    valueVariant: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("variantValue", valueVariant);
      const res = await http_auth.put(
        `${urlVariant}/${idVariantItem}`,
        formData
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update success!");
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
  const removeVariantItem = async ({ variantId }: { variantId: number }) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlVariant}/${variantId}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove success!");
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

  const updateNameVariantType = async ({
    idVariantTypeId,
    nameVariantType,
  }: {
    idVariantTypeId: number;
    nameVariantType: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("variantTypeName", nameVariantType);
      const res = await http_auth.put(
        `${urlVariant}/type/${idVariantTypeId}`,
        formData
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update name success!");
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
    getAllVariant,
    addVariant,
    removeVariant,
    addVariantItem,
    updateVariantItem,
    removeVariantItem,
    updateNameVariantType,
  };
}
