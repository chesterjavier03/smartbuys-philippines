import { LoaderCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const MainLoadingPage = () => {
  return (
    <main className="">
      <main className="grid sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-5 mb-20 container">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]?.map((product) => (
          <Card
            key={product}
            className="shadow-2xl shadow-black/30 hover:scale-105 duration-200 border-[1px] border-solid border-SBP_RED"
          >
            <CardContent className="p-1">
              <Link className="py-2" key={product} href={`#`}>
                <Skeleton className="rounded-md bg-black/15 pb-2 flex justify-center items-center w-full h-52" />
                <div className="flex justify-between py-2">
                  <div className="font-medium text-sm">
                    <h2>
                      <Skeleton className="h-8 rounded-md bg-black/15 w-40" />
                    </h2>
                    <Skeleton className="h-8 rounded-md bg-black/15 w-40" />
                  </div>
                  <div>
                    <Skeleton className="h-8 rounded-md bg-SBP_RED/15 w-16" />
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </main>
    </main>
  );
};

export default MainLoadingPage;
