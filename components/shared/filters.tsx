import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";

type PropsType = {
  className?: string;
};

export const Filters = ({ className }: PropsType) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      {/*Upper checkboxes */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>
      {/*Price filters */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>

        <RangeSlider min={0} max={1000} step={10} />
      </div>

      <CheckboxFiltersGroup title='Ингредиенты' className="mt-5" limit={6} 
      items={[{text: 'Сыр', value: '1'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, 
        {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, ]}
      defaultItems={[{text: 'Сыр', value: '1'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, 
        {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'}, {text:'Салями', value: '2'},]}
      />
    </div>
  );
};
