import { Cart } from "@prisma/client";
import { CartDTO } from "../services/dto/cart.dto";
import { calcTotalPrice } from "./calc-cart-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    items: CartStateItem[]
    totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcTotalPrice(item),
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      disabled: false,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    })) as CartStateItem[];
  console.log(items, data); ///price * quantity
  const totalPrice = items.reduce((acc, total) => acc + total.price, 0)
  console.log(totalPrice);
  
    return {
      items,
      totalAmount: totalPrice //data.totalAmount,
    };
  };
//11 55