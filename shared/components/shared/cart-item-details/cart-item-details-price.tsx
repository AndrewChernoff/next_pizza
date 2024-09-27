import { cn } from '@/shared/lib/utils';

type PropsType =  {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice = ({ value, className } : PropsType) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};