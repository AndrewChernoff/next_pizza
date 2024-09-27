"use client";

import type { PropsWithChildren } from "react";
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

type PropsType = {
  className?: string;
};

export const CartDrawer = ({
  children,
  className,
}: PropsWithChildren<PropsType>) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              imgUrl={""}
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp"
              }
              details={getCartItemDetailes(2, 30, [
                { name: "Cheese" },
                { name: "Ham" },
              ])}
              name={"Pizza"}
              price={500}
              quantity={1}
            />
          </div>
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">500 ₽</span>
            </div>

            <Link href="/checkout">
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
      </SheetContent>
    </Sheet>
  );
};