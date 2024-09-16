'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React from 'react';

const LoginLoadingPage = () => {
  return (
    <div className="flex justify-center items-center pt-10">
      <Card className="flex flex-col lg:w-1/2 md:w-full w-full shadow-2xl shadow-black/30">
        <CardHeader>
          <Skeleton className="h-8 rounded-md bg-black/15 w-52" />
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="pt-1 pb-0">
              <div className="py-2">
                <Skeleton className="h-8 rounded-md bg-black/15 w-28" />
              </div>
              <Skeleton className="h-8 rounded-md bg-black/15 w-full" />
            </div>
            <div className="pt-1 pb-2">
              <div className="py-2">
                <Skeleton className="h-8 rounded-md bg-black/15 w-28" />
              </div>
              <Skeleton className="h-8 rounded-md bg-black/15 w-full" />
            </div>
            <div className="pt-3">
              <Button size={'sm'} className="px-0" variant={'link'} asChild>
                <Skeleton className="h-8 rounded-md bg-black/15 w-52" />
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full my-4">
            <Skeleton className="h-8 rounded-md w-52" />
          </Button>
        </CardContent>
        <CardFooter>
          <Button asChild variant={'link'} className="font-medium w-full">
            <Link aria-label={'#'} href={'#'}>
              <Skeleton className="h-8 rounded-md bg-black/15 w-52" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginLoadingPage;
