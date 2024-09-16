"use client";

import React, { ChangeEvent, useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

type PropsType = {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (value: never/* string */) => void;
  defaultValue?: string[];
  className?: string;
  loading?: boolean;
  onAddId?: (id: never) => void
  selected?: Set<string>
  name?: string
};

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  defaultValue,
  className,
  loading,
  onAddId,
  selected,
  name
}: PropsType) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //const [ids, setIds] = useState<string[]>(defaultValue || [])
  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {[...new Array(limit)].map((__, i) => (
          <Skeleton key={i} className="h-6 mb-4 rounded-[8px]" />
        ))}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll
    ? items.filter((el) =>
        el.text.toLocaleLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.currentTarget.value);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchValue}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onAddId?.(item.value as never)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
//6 14