"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePPizzaForm } from "../choose-pizza-form";
import { cn } from "@/shared/lib/utils";
import { useStore } from "zustand";
import { useCartStore } from "@/shared/store/cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

type PropsType = {
  id: string;
  className?: string;
  onClose: () => void;
};

export const ChooseProductModal = ({ id, onClose, className }: PropsType) => {
  //need to remake it so component gets product

  const addCartItem = useCartStore((state) => state.addCartItem)


  const [product, setProduct] = useState<ProductWithRelations | null>(null);

  const isPizzaForm = Boolean(product?.items[0].pizzaType);

  useEffect(() => {
    Api.products
      .getProduct(id)
      .then((res) => setProduct(res))
      .catch((err) => console.log(err));
  }, [id]);
//const productId = (product as any ).items[0].id

  const addCartPizzaItemHandler = (data: CreateCartItemValues)=> addCartItem(data)
console.log(product);

const addProductItemHandler = (productItemId: number)=> addCartItem({productItemId})

  return (
    <Dialog open={Boolean(id)} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm && product ? (                                                 ///
          <ChoosePPizzaForm items={product.items} imageUrl={product.imageUrl} productId={(product as any ).items[0].id} name={product.name} ingredients={product?.ingredients} onAddToCart={addCartPizzaItemHandler}/>
        ) : (
          product && (
            <ChooseProductForm
              imageUrl={product?.imageUrl}
              name={product?.name}
              productId={(product as any ).items[0].id}
              onClickAdd={addProductItemHandler}
              totalPrice={product.items[0].price}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};
