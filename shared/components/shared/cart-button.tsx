'use client';

import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { MoveRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";

type PropsType = {
  className?: string;
};

export const CartButton = ({ className }: PropsType) => {

  const [items, totalAmount, loading] = useCartStore( state => [state.items, state.totalAmount, state.loading])

  return (
    <CartDrawer>
      <Button loading={loading} className={cn("group relative", className)}>
        <b>{totalAmount} P</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" />
          <b>{items.length}</b>
        </div>
        <MoveRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
