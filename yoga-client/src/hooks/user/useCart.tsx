import { useDispatch } from "react-redux";
import { ProductItemCart } from "../../context/type_stores";
import {
  addToCartStore,
  removeItemCartStore,
  updateQuantityCartStore,
} from "../../context/slice.cart";

export default function useCart() {
  const dispatch = useDispatch();
  const addToCart = (data: ProductItemCart) => {
    dispatch(addToCartStore(data));
  };
  const removeCart = (variants: string[]) => {
    dispatch(removeItemCartStore(variants));
  };
  const updateCart = (variants: string[], quantity: number) => {
    dispatch(updateQuantityCartStore({ variants, quantity }));
  };
  return { addToCart, removeCart, updateCart };
}
