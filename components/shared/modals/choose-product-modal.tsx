"use client";

import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { prisma } from "@/prisma/prisma-client";
import { Api } from "@/services/api-client";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";

const getProduct = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: +id,
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  return product;
};

type PropsType = {
  id: string;
  className?: string;
  onClose: () => void;
};

export const ChooseProductModal = ({ id, onClose, className }: PropsType) => {
  const [product, setProduct] = useState<ProductWithRelations | null>(null);

  const isPizzaForm = Boolean(product?.items[0].pizzaType)

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
        { isPizzaForm ? 
        'Pizza Form'  
          :
            product && <ChooseProductForm
              imageUrl={product?.imageUrl}
              name={product?.name}
            />
          
        }
      </DialogContent>
    </Dialog>
  );
};
