"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePPizzaForm } from "../choose-pizza-form";
import { cn } from "@/shared/lib/utils";
import { useCartStore } from "@/shared/store/cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import toast from "react-hot-toast";
import { ProductPageForm } from "../product-page-form";

type PropsType = {
  id: string;
  className?: string;
  onClose: () => void;
};

export const ChooseProductModal = ({ id, onClose, className }: PropsType) => {
  //need to remake it so component gets product
  //need to refactor on adding pizza and product in one function

  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const [product, setProduct] = useState<ProductWithRelations | null>(null);

  const isPizzaForm = Boolean(product?.items[0].pizzaType);

  useEffect(() => {
    Api.products
      .getProduct(id)
      .then((res) => setProduct(res))
      .catch((err) => console.log(err));
  }, [id]);
  //const productId = (product as any ).items[0].id

/*   const addCartPizzaItemHandler = async (data: CreateCartItemValues) => {
    try {
      await addCartItem(data);
      toast.success('Пицца добавлена в корзину')
    } catch (error) {
      toast.error("Не удалось добавить пиццу в корзину");
      console.error(error);
    }
  };
    

  const addProductItemHandler = async (productItemId: number) => {
    try {
      await addCartItem({ productItemId });
      toast.success('Продукт добавлен в корзину')
    } catch (error) {
      toast.error("Не удалось добавить продукт в корзину");
      console.error(error);
    }
   } */
    

  return (
    <Dialog open={Boolean(id)} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {/* {isPizzaForm && product ? ( ///
          <ChoosePPizzaForm
            items={product.items}
            imageUrl={product.imageUrl}
            productId={(product as any).items[0].id}
            name={product.name}
            ingredients={product?.ingredients}
            onAddToCart={addCartPizzaItemHandler}
            loading={loading}
          />
        ) : (
          product && (
            <ChooseProductForm
              imageUrl={product?.imageUrl}
              name={product?.name}
              productId={(product as any).items[0].id}
              onClickAdd={addProductItemHandler}
              totalPrice={product.items[0].price}
              loading={loading}
            />
          )
        )} */}
        {product && <ProductPageForm product={product}/>}
      </DialogContent>
    </Dialog>
  );
};
