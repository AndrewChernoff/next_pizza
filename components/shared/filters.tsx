"use client";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters = ({ className }: PropsType) => {
  
  const router = useRouter()

  const searchParams = useSearchParams()

  //@ts-ignore
  const [sizes, { toggle: toggleSizes }] = useSet(searchParams.get('sizes')  ? new Set(searchParams.get('sizes').split(',')) : new Set([]));  //searchParams.get('sizes')?.split(',')
  //@ts-ignore
  const [pizzaTypes, { toggle: toggleTypes }] = useSet(searchParams.get('pizzaTypes')  ? new Set(searchParams.get('pizzaTypes').split(',')) : new Set([]));

  const { ingredients, loading, selectedIngredientsIds, onAddId } =
    useFilterIngredients(searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []);

  const [price, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  });

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
  

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...price, [name]: value });
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      {/*Upper checkboxes */}
      {/* <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div> */}

      <CheckboxFiltersGroup
        name="type"
        title="Тип теста"
        className="mb-5"
        onAddId={toggleTypes}
        selected={pizzaTypes}
        items={[
          {text: 'Тонокое', value: '1'},
          {text: 'Традиционное', value: '2'}
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        title="Размеры"
        className="mb-5"
        onAddId={toggleSizes}
        selected={sizes}
        items={[
          {text: '20 см', value: '20'},
          {text: '30 см', value: '30'},
          {text: '40 см', value: '40'},
        ]}
      />

      {/*Price filters */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={+price.priceFrom}
            onChange={(e) => updatePrice("priceFrom", +e.currentTarget.value)}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={+price.priceTo}
            onChange={(e) => updatePrice("priceTo", +e.currentTarget.value)}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          step={10}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
        loading={loading}
        onAddId={onAddId}
        selected={selectedIngredientsIds}
        name="ingredients"
      />
    </div>
  );
};

