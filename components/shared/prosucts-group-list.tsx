'use client'

import { cn } from "@/shared/lib/utils";
import { ProductsCard } from "./products-card";
import { Title } from "./title";
import { useEffect, useRef } from "react";
import { useIntersection } from 'react-use';


type PropsType = {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    listClassName?: string;
  }
  

export const ProductsGroupList = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
  }: PropsType) => {

    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    useEffect(() => {
      if(intersection?.isIntersecting) {
        console.log(title, categoryId);
        
      }
    }, [categoryId, intersection?.isIntersecting, title])
    


  return (
    <div className={className} id={title} ref={intersectionRef}>
        <Title text={title} size={"lg"} className="font-extrabold mb-5"/>

        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductsCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}
