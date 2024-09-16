import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle } from 'lucide-react';

const DashboardLoadingPage = () => {
  return (
    <Skeleton className="h-[75vh] w-full rounded-lg bg-black/5 flex justify-center items-center">
      <LoaderCircle className="animate-spin h-8 w-8 text-SBP_RED" />
    </Skeleton>
  );
};

export default DashboardLoadingPage;
