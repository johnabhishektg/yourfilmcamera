import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex items-center h-full px-12">
          <Skeleton className="h-36 rounded w-full" />
        </div>
        <div className="flex justify-center items-center text-center">
          <div className="space-y-2 mt-8 px-24">
            <Skeleton className="h-14 rounded w-[470px]" />
            <Skeleton className="h-14 rounded w-[450px] mx-2 mb-2" />
            <div className="mt-32">
              <Skeleton className="h-6 rounded w-[475px] " />
              <Skeleton className="inline-flex h-12 rounded w-[120px] mt-6" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0 py-16 px-12 space-x-1.5">
          <Skeleton className="h-[142px] w-[310px]" />
          <Skeleton className="h-[142px] w-[310px]" />
          <Skeleton className="h-[142px] w-[310px]" />
          <Skeleton className="h-[142px] w-[310px]" />
        </div>
      </div>
    </>
  );
}
