import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4 h-full ">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[550px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
