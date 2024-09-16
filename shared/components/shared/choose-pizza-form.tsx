import { Ingredient, ProductItem } from "@prisma/client";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImageImage } from "./pizza-image";
import { cn } from "@/shared/lib/utils";
import { GroupVariants } from "./group-variants";
import {
  mapPizzaSize,
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { IngredientItem } from "./ingredient";
import { useSet } from "react-use";

type PropsType = {
  imageUrl?: string;
  name?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAdd?: () => void;
  className?: string;
};

export const ChoosePPizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  className,
}: PropsType) => {
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const textDetaills = `${mapPizzaSize[size]} (${size} см), традиционное тесто ${mapPizzaType[type]}`;

  const onClickAdd = (value: number) => addIngredient(value);

  const pizzaPrice = items.filter(
    (el) => el.pizzaType === type && el.size === size
  )[0]?.price || items[0].price
  const ingredientsPrice = ingredients
    .filter((el) => selectedIngredients.has(el.id))
    .reduce((sum, el) => sum + el.price, 0);

  const totalPrice = pizzaPrice + ingredientsPrice;

  const handleClickAdd = () => {
    console.log({ size, type, ingredients });
  };
  
  const avaliablePizzas = items.filter(el => el.pizzaType === type)

  const avaliableSizes = pizzaSizes.map(el => ({
    name: el.name,
    value: el.value,
    disabled: !avaliablePizzas.some(item => item.size === +el.value)
  }))

  useEffect(()=> {
    
  const isDisabledSize = avaliablePizzas[0].size === size
  
    if(isDisabledSize) {
      setSize(Number(pizzaSizes[0].value) as PizzaSize)
    } else {
      setSize(Number(avaliablePizzas[0].size) as PizzaSize)
    }
  
  }, [type])
  

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImageImage imgUrl={imageUrl as string} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title
          text={name as string}
          size="md"
          className="font-extrabold mb-1"
        />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            items={avaliableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[320px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients?.map((el) => (
              <IngredientItem
                key={el.id}
                active={selectedIngredients.has(el.id)}
                name={el.name}
                price={el.price}
                imageUrl={el.imageUrl}
                onClick={() => onClickAdd(el.id)}
              />
            ))}
          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
