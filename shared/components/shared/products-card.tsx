import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

type PropsType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  callBack: () => void;
  ingredients?: Ingredient[]
};

export const ProductsCard = ({
  id,
  className,
  imageUrl,
  name,
  price,
  callBack,
  ingredients
}: PropsType) => {
  
  const pizzaIngredients = ingredients?.map(el => el.name).join(', ')
  
  return (
    <div className={className} onClick={callBack}>
      {/* <Link href={`/product/${id}`}> */}
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {pizzaIngredients} {/* if it's pizza */}
          {/* Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты */}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant={"secondary"}>
            <Plus size={20} className="w-5 h-5 mr-1" />
            Добавить
          </Button>
        </div>
      {/* </Link> */}
    </div>
  );
};
