import { cn } from "@/shared/lib/utils";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface PropsType extends CartItemProps {
  className?: string;
  imageUrl: string;
  onClick: (id: number, quantity: number) => void;
  removeItem: () => void;
}

export const CartDrawerItem = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  className,
  disabled,
  onClick,
  removeItem,
}: PropsType) => {
  const changeQuantity = (type: "plus" | "minus") => {
    console.log(type);
    if (type === "plus") {
      const updatedQuantity = quantity + 1;
      onClick(id, updatedQuantity);
    } else if (type === "minus") {
      const updatedQuantity = quantity - 1;
      onClick(id, updatedQuantity);
    }
  };

  
  return (
    <div className={cn("flex bg-white p-5 gap-6 mt-4", className,  {"pointer-events-none opacity-50": disabled})}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton
            onClick={changeQuantity}
            value={quantity}
          />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              aria-disabled={disabled}
              onClick={removeItem}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
