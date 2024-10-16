import { addCartItem } from './../services/cart';
import { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { CartStateItem } from "../lib/get-cart-details";
import { CartDTO, CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
    items: CartStateItem[];  
    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValues) => Promise<CartDTO>;
    removeCartItemHandler: (id: number) => void;
    changeQuantity: (id: number, quantity: number) => void
    totalAmount: number
    loading: boolean
};

export const useCart = (): ReturnProps => {
  const [
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    items,
    loading
  ] = useCartStore((state) => [
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
    state.totalAmount,
    state.items,
    state.loading
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const changeQuantity = (id: number, quantity: number) => {
    updateItemQuantity(id, quantity);
  };
  const removeCartItemHandler = (id: number) => {
    removeCartItem(id);
  };

  return {
    loading,
    fetchCartItems,
    addCartItem,
    updateItemQuantity,
    totalAmount,
    items,
    changeQuantity,
    removeCartItemHandler,
  };
};
