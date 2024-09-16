"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePPizzaForm } from "../choose-pizza-form";
import { cn } from "@/shared/lib/utils";

type PropsType = {
  id: string;
  className?: string;
  onClose: () => void;
};

export const ChooseProductModal = ({ id, onClose, className }: PropsType) => {
  //need to remake it so component gets product
  const [product, setProduct] = useState<ProductWithRelations | null>(null);

  const isPizzaForm = Boolean(product?.items[0].pizzaType);

  useEffect(() => {
    Api.products
      .getProduct(id)
      .then((res) => setProduct(res))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Dialog open={Boolean(id)} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm && product ? (
          <ChoosePPizzaForm items={product.items} imageUrl={product.imageUrl} name={product.name} ingredients={product?.ingredients} />
        ) : (
          product && (
            <ChooseProductForm
              imageUrl={product?.imageUrl}
              name={product?.name}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};
