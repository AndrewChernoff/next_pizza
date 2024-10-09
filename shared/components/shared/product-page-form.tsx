'use client'

import { ProductWithRelations } from '@/@types/prisma';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';
import { ChoosePPizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { cn } from '@/shared/lib/utils';
import { PizzaImageImage } from './pizza-image';
import { Title } from './title';

type PropsType = {
    product: ProductWithRelations
  };

export const ProductPageForm = ({product}:PropsType) => {
    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  
    const isPizzaForm = Boolean(product.items[0].pizzaType);
  
    
    //const productId = (product as any ).items[0].id
  
    const addCartPizzaItemHandler = async (data: CreateCartItemValues) => {
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
     }
      
  
    return (
        <>
          {isPizzaForm && product ? ( ///
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
          )}
          </>
      
    )
}