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
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient";
import { useSet } from "react-use";
import { useTotalPizzaPrice } from "@/shared/hooks/use-total-pizza-price";
import { useFilterAvaliablePizzas } from "@/shared/hooks/use-filter-avaliable-pizzas";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

type PropsType = {
  imageUrl?: string;
  name?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAdd?: () => void;
  onAddToCart: (values: CreateCartItemValues) => void; ///
  className?: string;
  productId: number;
  loading: boolean;
};

export const ChoosePPizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  className,
  onAddToCart,
  loading,
  productId
}: PropsType) => {
  

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const {avaliableSizes, setType, setSize, size, type, currentItemId} = useFilterAvaliablePizzas(items)

  const textDetaills = `${mapPizzaSize[size]} (${size} см), традиционное тесто ${mapPizzaType[type]}`;


  const {totalPrice} = useTotalPizzaPrice({items, ingredients, type, size, selectedIngredients})

  const onClickAdd = (value: number) => addIngredient(value);
  console.log(currentItemId);

  const handleClickAdd = (/* productItemId: number */) => {
    console.log({ size, type, ingredients, totalPrice });
    onAddToCart({ingredients: Array.from(selectedIngredients), productItemId: currentItemId as number })
  };

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
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
