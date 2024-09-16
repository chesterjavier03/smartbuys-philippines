import { Skeleton } from '@/components/ui/skeleton';

const ProductLoadingPage = () => {
  return (
    <main className="p-5">
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-12">
        <div className="flex-1">
          <div className="border-[1px] border-solid rounded-lg hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer">
            <Skeleton className="rounded-lg bg-black/15 flex justify-center items-center w-full sm:h-[600px] h-[35vh]" />
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5">
          <h2 className="text-2xl font-bold">
            <Skeleton className="h-8 rounded-md bg-black/15 w-52" />
          </h2>
          <div className="py-5">
            <Skeleton className="h-8 rounded-md bg-black/15 w-28" />
          </div>
          <Skeleton />
          <p className="flex cursor-pointer justify-between text-SBP_BLUE text-5xl font-medium tracking-normal py-2">
            <Skeleton className="h-8 rounded-md bg-black/15 w-36" />
          </p>
          <div className="py-5">
            <Skeleton className="h-8 rounded-md bg-black/15 w-3/4" />
          </div>
          <div className="py-5">
            <Skeleton className="h-8 rounded-md bg-black/15 w-3/4" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductLoadingPage;
