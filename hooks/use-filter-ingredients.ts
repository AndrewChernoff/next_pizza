import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import {useSet} from 'react-use';


type ReturnProps = {
    ingredients: Ingredient[];
    loading: boolean
    selectedIngredientsIds: Set<string>
    onAddId: (id: never) => void
};

export const useIngredients = (values: string[] = []): ReturnProps => {
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngredientsIds, { toggle }] = useSet(new Set(values));
  

  useEffect(() => {
    async function fetchIngredients() {
        try {
          setLoading(true);
          const ingredients = await Api.ingredients.getAll();
          setIngredients(ingredients);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchIngredients();

  }, []);

  return { ingredients, loading, selectedIngredientsIds, onAddId: toggle };

};
