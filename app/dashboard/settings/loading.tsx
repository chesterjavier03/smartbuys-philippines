import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle } from 'lucide-react';

const SettingsLoadingPage = () => {
  return (
    <Skeleton className="h-[75vh] w-full rounded-lg bg-black/5 flex justify-center items-center">
      <LoaderCircle className="animate-spin h-8 w-8 text-SBP_RED" />
    </Skeleton>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>
    //       <Skeleton className="h-8 w-80 rounded-md bg-black/15" />
    //     </CardTitle>
    //     <CardDescription>
    //       <Skeleton className="h-8 w-96 rounded-md bg-black/15" />
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="flex flex-col gap-2">
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //       <Skeleton className="h-8 w-2/4 rounded-md bg-black/15" />
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default SettingsLoadingPage;
