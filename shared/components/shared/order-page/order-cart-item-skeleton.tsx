import React from "react";
import { Skeleton } from "../../ui";

export const OrderCartItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-5 flex-1">
        <Skeleton className="w-[60px] h-[60px] rounded-[100%]" />
        <Skeleton className="w-[155px] h-10" />
      </div>
      <div className="flex items-center gap-10 ml-20">
        <Skeleton className="w-12 h-7" />
        <Skeleton className="w-32 h-7" />
      </div>
    </div>
  );
};
