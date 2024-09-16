'use client';

import { ReviewsSchema } from '@/types/reviews-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { addReview } from '@/server/actions/add-review';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '../ui/input';
import { LoaderCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';

const ReviewsForm = ({ productId }: { productId: string }) => {
  const [popOverOpen, setPopOverOpen] = useState(false);
  const form = useForm<z.infer<typeof ReviewsSchema>>({
    resolver: zodResolver(ReviewsSchema),
    defaultValues: { rating: 0, comment: '', productId: '' },
  });

  const { execute, status } = useAction(addReview, {
    onSuccess(result) {
      if (result.data?.error) {
        console.log('ERROR: ', result.data.error);
        toast.error(result.data.error);
      }
      if (result.data?.success) {
        console.log('SUCCESS: ', result.data.success);
        toast.success('Review Added 👌');
        form.reset();
      }
      setPopOverOpen(false);
    },
  });

  const onSubmit = (values: z.infer<typeof ReviewsSchema>) => {
    execute({
      comment: values.comment,
      rating: values.rating,
      productId: productId as string,
    });
  };

  return (
    <Popover open={popOverOpen}>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button
            onClick={() => setPopOverOpen(true)}
            className="font-medium w-full bg-SBP_RED"
            variant={'default'}
          >
            Leave a review
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How would you describe this product?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your Rating</FormLabel>
                  <FormControl>
                    <Input type="hidden" placeholder="Star Rating" {...field} />
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <motion.div
                          className="relative cursor-pointer"
                          whileTap={{ scale: 0.8 }}
                          whileHover={{ scale: 1.2 }}
                          key={value}
                        >
                          <Star
                            key={value}
                            onClick={() => {
                              form.setValue('rating', value, {
                                shouldValidate: true,
                              });
                            }}
                            className={cn(
                              'text-primary bg-transparent transition-all duration-300 ease-in-out',
                              form.getValues('rating') >= value
                                ? 'fill-primary'
                                : 'fill-muted'
                            )}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </FormItem>
              )}
            />
            <Button
              disabled={status === 'executing'}
              className="w-full"
              type="submit"
            >
              {status === 'executing' ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                'Add Review'
              )}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewsForm;
