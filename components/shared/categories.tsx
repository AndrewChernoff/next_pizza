import { cn } from "@/lib/utils";

type PropsType = {
  className?: string;
  activeIndex?: number;
};

const cats = ["Пиццы", "Комбо", "Закуски", "yo"];

export const Categories = ({ className, activeIndex }: PropsType) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {cats.map((cat, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeIndex === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  );
};
