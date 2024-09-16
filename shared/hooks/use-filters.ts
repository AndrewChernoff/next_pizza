import { useState } from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const useFilters = () => {

  const searchParams = useSearchParams()

  const [sizes, { toggle: toggleSizes }] = useSet(searchParams.get('sizes')  ? new Set(searchParams.get('sizes')?.split(',')) : new Set([]));  //searchParams.get('sizes')?.split(',')
  
  const [pizzaTypes, { toggle: toggleTypes }] = useSet(searchParams.get('pizzaTypes')  ? new Set(searchParams.get('pizzaTypes')?.split(',')) : new Set([]));

  
  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  });

  return {sizes, pizzaTypes, toggleSizes, toggleTypes, price, setPrice }
};
