import { useState } from "react";
import http, { handleError } from "../../utils/http";
import { OrderUser } from "../../context/type_stores";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderUser } from "../../context/slice.order";
import { clearCart } from "../../context/slice.cart";
import { RootState } from "../../context/store";

export default function useOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: carts } = useSelector((state: RootState) => state.cart);
  const urlOrder = "/order";
  const [loading, setLoading] = useState<boolean>();
  const sendOrder = async (data: OrderUser) => {
    setLoading(true);
    try {
      if (carts.length > 0) {
        const listCart = carts.map((item) => {
          return { ...item, productId: item.product.id };
        });
        const dataRequest = { itemCart: listCart, ...data.info };
        const res = await http.post(`${urlOrder}`, dataRequest);
        if (res.status == HttpStatusCode.Ok) {
          dispatch(clearCart());
          dispatch(setOrderUser(data));
          navigate("/thank-you");
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  return { loading, sendOrder };
}
