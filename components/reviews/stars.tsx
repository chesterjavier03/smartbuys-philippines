'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Stars = ({
  rating,
  totalReviews,
  size = 14,
}: {
  rating: number;
  totalReviews?: number;
  size?: number;
}) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          size={size}
          key={star}
          className={cn(
            'text-primary bg-transparent transition-all duration-300 ease-in-out',
            rating >= star ? 'fill-primary' : 'fill-transparent'
          )}
        />
      ))}
      {totalReviews && pathname !== '/' ? (
        <span className={'text-secondary-foreground font-bold ml-2'}>
          {totalReviews} reviews
        </span>
      ) : null}
    </div>
  );
};

export default Stars;
