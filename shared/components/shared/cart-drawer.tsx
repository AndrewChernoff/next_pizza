"use client";

import { useEffect, type PropsWithChildren } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetailes } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import Image from "next/image";
import { Title } from ".";
import { useCart } from "@/shared/hooks/use-cart";

type PropsType = {
  className?: string;
};

export const CartDrawer = ({
  children,
}: PropsWithChildren<PropsType>) => {

  const {items, changeQuantity, removeCartItemHandler, totalAmount } = useCart()

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        {items.length === 0 && (
          <div className="flex items-center justify-center h-full flex-col">
            <Image
              src={"/empty-box.png"}
              width={100}
              height={100}
              alt="cart is empty"
            />

            <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
          </div>
        )}
        {items.length > 0 && (
          <>
            <SheetHeader>
              <SheetTitle>
                В корзине
                <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>

            <div className="-mx-6 mt-5 overflow-auto flex-1">
              <div className="mb-2">
                {items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={
                      item.pizzaSize && item.pizzaType
                        ? getCartItemDetailes(
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize,
                            item.ingredients as any
                          )
                        : ""
                    }
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onClick={changeQuantity}
                    removeItem={() => removeCartItemHandler(item.id)}
                  />
                ))}
              </div>
            </div>
            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>

                <Link href='/order'>
                  <Button
                    //onClick={() => setRedirecting(true)}
                    /* loading={redirecting} */
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
