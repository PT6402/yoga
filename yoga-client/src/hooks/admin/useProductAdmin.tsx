import { useState } from "react";
import { handleError, ResultUtil, useHttpAuth } from "../../utils/http";
import toast from "react-hot-toast";
import { HttpStatusCode } from "axios";
import { Product, ProductItem, ProductsItem } from "../../context/type_stores";
import {
  setProductDetail,
  setProductsAdminStore,
} from "../../context/slice.product";
import {
  DataImage,
  DataInfo,
  DataVariant,
} from "../../pages/admin/page_product/create/context/type_context";
import { useDispatch } from "react-redux";
import useCategoryAdmin from "./useCategoryAdmin";
import useVariantAdmin from "./useVariantAdmin";

export default function useProductAdmin() {
  const dispatch = useDispatch();
  const { http_auth } = useHttpAuth();
  const urlProduct = "/product/admin";
  const { getAllCategoryByAdmin } = useCategoryAdmin();
  const { getAllVariant } = useVariantAdmin();
  const [loading, setLoading] = useState<boolean>();
  const checkInfo = async ({
    name,
    categoryId,
    brand,
  }: {
    name: string;
    categoryId: number;
    brand: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("productName", name);
      formData.append("categoryId", `${categoryId}`);
      formData.append("productBrand", brand);
      const res = await http_auth.post(
        `${urlProduct}/check-product-info`,
        formData
      );
      if (res.status == HttpStatusCode.Ok) {
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
  const getAllProductByAdmin = async () => {
    setLoading(true);
    try {
      const res = await http_auth.get<ResultUtil<ProductsItem[]>>(urlProduct);
      if (res.status == HttpStatusCode.Ok) {
        if (res.data && res.data.model) {
          dispatch(setProductsAdminStore(res.data.model));
          return res.data.model;
        }
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return null;
  };
  const getOneProduct = async (productId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.get<ResultUtil<ProductItem>>(
        `${urlProduct}/${productId}`
      );
      if (res.status == HttpStatusCode.Ok) {
        if (res.data.model) {
          dispatch(setProductDetail(res.data.model));
          return res.data.model;
        }
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const addProduct = async ({
    dataInfo,
    dataVariant,
    dataImage,
    dataDescription,
  }: {
    dataInfo: DataInfo;
    dataVariant: DataVariant[];
    dataImage: DataImage[];
    dataDescription: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      // DATA_INFO
      formData.append("name", dataInfo.name);
      formData.append("brand", dataInfo.brand);
      formData.append("price_base", `${dataInfo.price}`);
      if (dataInfo.category && dataInfo.category.id) {
        formData.append("category_id", `${dataInfo.category.id}`);
      }
      // DATA_VARIANT
      if (dataVariant.length > 0) {
        let variantIndex = 0; // Biến để theo dõi chỉ số của productVariants
        for (let i = 0; i < dataVariant.length; i++) {
          // Lặp qua các variantItems của mỗi variantType
          for (let j = 0; j < dataVariant[i].variantItems.length; j++) {
            const variantItem = dataVariant[i].variantItems[j];
            if (dataVariant[i].variantType.id && variantItem.variantItem.id) {
              formData.append(
                `productVariants[${variantIndex}].variantTypeId`,
                `${dataVariant[i].variantType.id}`
              );
              formData.append(
                `productVariants[${variantIndex}].variantId`,
                `${variantItem.variantItem.id}`
              );
              formData.append(
                `productVariants[${variantIndex}].price_modifier`,
                `${variantItem.priceModifier}`
              );
              variantIndex++;
            }
          }
        }
      }

      // DATA_DESCRIPTION
      formData.append("description", dataDescription);
      // DATA_IMAGE
      dataImage.forEach((item) => {
        formData.append("files", item.file);
      });

      // console.log(dataVariant);
      const res = await http_auth.post(urlProduct, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add product success");
        await getAllProductByAdmin();
        getAllCategoryByAdmin();
        getAllVariant();
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
  const removeProduct = async (productId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlProduct}/${productId}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove success ");
        await getAllProductByAdmin();
        getAllCategoryByAdmin();
        getAllVariant();
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

  const updateInfo = async (product: Product) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("category_id", `${product.category.id}`);
      formData.append("price_base", product.price_base);
      formData.append("price_base", product.price_base);
      formData.append("newArrival", `${product.newArrival}`);
      const res = await http_auth.put(`${urlProduct}/${product.id}`, formData);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update info success");
        getAllCategoryByAdmin();
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
  const removeVariantType = async ({
    productId,
    typeId,
  }: {
    productId: number;
    typeId: number;
  }) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(
        `${urlProduct}/${productId}/type/${typeId}`
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove success");
        getAllVariant();
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
  const addProductVariantItem = async ({
    productId,
    variantId,
    variantTypeId,
    price_modifier,
  }: {
    productId: number;
    variantTypeId: number;
    variantId: number;
    price_modifier: number;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("variantTypeId", `${variantTypeId}`);
      formData.append("variantId", `${variantId}`);
      formData.append("price_modifier", `${price_modifier}`);
      const res = await http_auth.post(`${urlProduct}/${productId}`, formData);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add success");
        getAllVariant();
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
  const removeProductVariantItem = async (variantId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlProduct}/variant/${variantId}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove item success");
        getAllVariant();
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

  const uploadImage = async ({
    productId,
    file,
  }: {
    productId: number;
    file: File;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await http_auth.post(
        `${urlProduct}/${productId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("add image success");
        await getAllProductByAdmin();
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
  const removeImage = async (imageId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlProduct}/image/${imageId}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove success");
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
  const updateDescriton = async ({
    productId,
    value,
  }: {
    productId: number;
    value: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", value);
      const res = await http_auth.put(
        `${urlProduct}/description/${productId}`,
        formData
      );
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update description success");
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
  const updateStatus = async (productId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.put(`${urlProduct}/status/${productId}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("update status success");
        await getAllProductByAdmin();
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
    checkInfo,
    addProduct,
    getAllProductByAdmin,
    getOneProduct,
    updateInfo,
    removeVariantType,
    addProductVariantItem,
    removeProductVariantItem,
    uploadImage,
    removeImage,
    updateDescriton,
    updateStatus,
    removeProduct,
  };
}
