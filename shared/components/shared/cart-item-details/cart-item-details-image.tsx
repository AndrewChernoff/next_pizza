import { cn } from '@/shared/lib/utils';

type PropsType = {
  src: string;
  className?: string;
}

export const CartItemDetailsImage= ({ src, className } : PropsType) => {
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};