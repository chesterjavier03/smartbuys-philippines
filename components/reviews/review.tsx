'use client';

import { Card } from '../ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReviewWithUser } from '@/types/infer-types';
import dayjs from 'dayjs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { formatDistance, subMinutes } from 'date-fns';
import Stars from './stars';

const Review = ({ reviews }: { reviews: ReviewWithUser[] }) => {
  return (
    <motion.div className="flex flex-col gap-4 my-2">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4">
          <div className="flex gap-2 items-center">
            <Avatar className="w-7 h-7 text-white">
              {review.user?.image && (
                <Image
                  src={review.user?.image}
                  alt={review.user?.name!}
                  fill={true}
                />
              )}
              {!review.user?.image && (
                <AvatarFallback className="bg-[#1a3e58]">
                  <div className="font-bold">
                    {review.user?.name?.charAt(0).toUpperCase()}
                  </div>
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-bold">{review.user?.name}</p>
              <div className="flex items-center gap-2">
                <Stars rating={review.rating} />
                <p className="text-xs text-bold text-muted-foreground">
                  {formatDistance(
                    subMinutes(review.createdAt!, 0),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
          <p className="py-2 font-medium">{review.comment}</p>
        </Card>
      ))}
    </motion.div>
  );
};

export default Review;
