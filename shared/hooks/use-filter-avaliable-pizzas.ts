import { ProductItem } from "@prisma/client";
import { PizzaSize, pizzaSizes, PizzaType } from "../constants/pizza";
import { useEffect, useState } from "react";

type PropsType = {
    items: ProductItem[];
   
    type: PizzaType;
    size: PizzaSize;
  };


export const useFilterAvaliablePizzas = (items: ProductItem[]) => {

    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const avaliablePizzas = items.filter((el) => el.pizzaType === type);

    const avaliableSizes = pizzaSizes.map((el) => ({
      name: el.name,
      value: el.value,
      disabled: !avaliablePizzas.some((item) => item.size === +el.value),
    }));
    
    const currentItemId = items.find(el => el.pizzaType === type && el.size === size)?.id 

    useEffect(() => {
      const isDisabledSize = avaliablePizzas[0].size === size;
  
      if (isDisabledSize) {
        setSize(Number(pizzaSizes[0].value) as PizzaSize);
      } else {
        setSize(Number(avaliablePizzas[0].size) as PizzaSize);
      }
    }, [type]);

    return {avaliableSizes, setType, setSize, size, type, currentItemId}
}



