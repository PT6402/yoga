import { useState } from "react";
import { handleError, ResultUtil, useHttpAuth } from "../../utils/http";
import { HttpStatusCode } from "axios";
import { useDispatch } from "react-redux";
import {
  InforUser,
  OrderAdmin,
  OrderAdminList,
} from "../../context/type_stores";
import { setOrderAdmin } from "../../context/slice.order";
import toast from "react-hot-toast";

export default function useOrderAdmin() {
  const dispatch = useDispatch();
  const urlOrder = "/order/admin";
  const { http_auth } = useHttpAuth();
  const [loading, setLoading] = useState<boolean>();
  const getAllOrder = async () => {
    setLoading(true);
    try {
      const res = await http_auth.get<ResultUtil<OrderAdminList[]>>(urlOrder);
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        dispatch(setOrderAdmin(res.data.model));
        return res.data.model;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return [];
  };

  const getOneOrder = async (id: number) => {
    try {
      const res = await http_auth.get<ResultUtil<OrderAdmin>>(
        `${urlOrder}/${id}`
      );
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        return res.data.model;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const removeOrder = async (id: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlOrder}/${id}`);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("remove order success");
        await getAllOrder();
        return true;
      }
      return false;
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const updateOrderItem = async (
    idItem: number,
    data: {
      price: number;
      productId: number;
      variants: string[];
      quantity: number;
    }
  ) => {
    setLoading(true);
    try {
      const res = await http_auth.put(`${urlOrder}/item/${idItem}`, data);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const removeOrderItem = async (itemId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.delete(`${urlOrder}/item/${itemId}`);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const addOrderItem = async (
    orderId: number,
    data: {
      price: number;
      productId: number;
      variants: string[];
      quantity: number;
    }
  ) => {
    setLoading(true);
    try {
      const res = await http_auth.post(`${urlOrder}/item/${orderId}`, data);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const updateInfoOrder = async (orderId: number, data: InforUser) => {
    setLoading(true);
    try {
      const res = await http_auth.put(`${urlOrder}/info/${orderId}`, data);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const confirmOrder = async (orderId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.put(`${urlOrder}/confirm/${orderId}`);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  const readOrder = async (orderId: number) => {
    setLoading(true);
    try {
      const res = await http_auth.put(`${urlOrder}/read/${orderId}`);
      if (res.status == HttpStatusCode.Ok) {
        getAllOrder();
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  return {
    loading,
    getAllOrder,
    removeOrder,
    getOneOrder,
    updateOrderItem,
    removeOrderItem,
    addOrderItem,
    updateInfoOrder,
    readOrder,
    confirmOrder,
  };
}
