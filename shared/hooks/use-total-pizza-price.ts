import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

type PropsType = {
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
  type: PizzaType;
  size: PizzaSize;
};

type ReturnPropsType = { totalPrice: number };

export const useTotalPizzaPrice = ({
  items,
  ingredients,
  selectedIngredients,
  type,
  size,
}: PropsType): ReturnPropsType => {
  const pizzaPrice =
    items.filter((el) => el.pizzaType === type && el.size === size)[0]?.price ||
    items[0].price;

  const ingredientsPrice = ingredients
    .filter((el) => selectedIngredients.has(el.id))
    .reduce((sum, el) => sum + el.price, 0);

  return { totalPrice:  (pizzaPrice + ingredientsPrice)};
};
