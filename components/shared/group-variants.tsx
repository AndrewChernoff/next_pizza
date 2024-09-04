'use client'

import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

type PropsType = {
  items: readonly Variant[];
  defaultValue?: string;
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  value?: Variant['value'];
  className?: string;
};

export const GroupVariants = ({ className, items, selectedValue, onClick, value }: PropsType) => {
  return (
    <div
      className={cn(
        className,
        "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
      )}
    >
        {items.map(el => (
            <button key={el.name} onClick={() => onClick?.(el.value)}
            className={cn(
                'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                {
                  'bg-white shadow': el.value === selectedValue,
                  'text-gray-500 opacity-50 pointer-events-none': el.disabled,
                },
              )}
            >
                {el.name}
            </button>
        ))}
    </div>
  );
};
