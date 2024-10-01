import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getCartItemDetailes } from '../lib';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { Api } from '../services/api-client';


export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
  
    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;
  
    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  
    /* Запрос на добавление товара в корзину */
    addCartItem: (values: any) => Promise<void>;
  
    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
  
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set({ loading: false });
          }
    },
  
    updateItemQuantity: async (id: number, quantity: number) => {
      try {
        set({loading: true, error: false})
        const data = await Api.cart.updateCart(id, quantity)
        set(getCartDetails(data))
      } catch (error) {
        console.error(error);
        set({ error: true });
      }
    },
    
    removeCartItem: async (id: number) => {
      try {
        set({loading: true, error: false})
        const data = await Api.cart.deleteCartItem(id)
        set(getCartDetails(data))
      } catch (error) {
        console.error(error);
        set({ error: true });
      }
    },
  
    addCartItem: async (values: any) => {
     
    },
  }));
