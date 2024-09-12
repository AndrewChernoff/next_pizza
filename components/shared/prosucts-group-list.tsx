'use client'

import { cn } from "@/shared/lib/utils";
import { ProductsCard } from "./products-card";
import { Title } from "./title";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category'
import { ChooseProductModal } from "./modals";


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
    const [productId, setProductId] = useState<string | null>(null)

    const setCategoryId = useCategoryStore(state => state.setCategoryId)

    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    useEffect(() => {
      if(intersection?.isIntersecting) {
        console.log(categoryId);
        
        setCategoryId(categoryId)/// have to get an id
      }
    }, [categoryId, intersection?.isIntersecting, title])
    

  const selectProduct = (id: string) => {//m
    setProductId(id)
  }
console.log('productId');

  return (
    <>
    { productId && <ChooseProductModal onClose={() => setProductId(null)} id={productId}/>}
    <div className={className} id={title} ref={intersectionRef}>
      
        <Title text={title} size={"lg"} className="font-extrabold mb-5"/>

        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductsCard
            callBack={() => selectProduct(product.id)}
            key={`${product.id} ${product.name}`}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
    </>
  )
}
