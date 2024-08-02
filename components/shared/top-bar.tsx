import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";

type PropsType = {
  className?: string;
};

export const TopBar = ({ className }: PropsType) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories activeIndex={1} />
        <SortPopup />
      </Container>
    </div>
  );
};
