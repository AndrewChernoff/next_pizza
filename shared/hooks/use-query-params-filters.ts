import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import qs from "qs";


export const useQueryParamsFilters = ({price, pizzaTypes, sizes, selectedIngredientsIds}: any) => {

    const router = useRouter()

    const searchParams = useSearchParams()
  
    useEffect(() => {

        const filters = {
          ...price,
          pizzaTypes: Array.from(pizzaTypes),
          sizes: Array.from(sizes),
          ingredients: Array.from(selectedIngredientsIds)
        }
    
    
        const query = qs.stringify(filters, {
          arrayFormat: 'comma',
        });
    
        router.push(`?${query}`, {
          scroll: false
        });
    
      }, [pizzaTypes, price, router, selectedIngredientsIds, sizes])
    

    return {searchParams}
}
