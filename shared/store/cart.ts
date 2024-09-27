import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: any //CartStateItem[];
  
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
        /* try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartItemDetailes(data));
          } catch (error) {
            console.error(error);
            set({ error: true });
          } finally {
            set({ loading: false });
          } */
    },
  
    updateItemQuantity: async (id: number, quantity: number) => {
    },
  
    removeCartItem: async (id: number) => {
    },
  
    addCartItem: async (values: any) => {
     
    },
  }));
