import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen mx-12">
        <Skeleton className="h-[275px] w-full rounded" />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_4fr]">
          <div className="hidden w-52 lg:block">
            <Skeleton className="h-[600px] w-52" />
          </div>
          <div className="flex flex-cols ">
            <div className="flex flex-wrap gap-8 items-center justify-center lg:items-start">
              <Skeleton className="h-[300px] w-[254px]" />
              <Skeleton className="h-[300px] w-[254px]" />
              <Skeleton className="h-[300px] w-[254px]" />
              <Skeleton className="h-[300px] w-[254px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
