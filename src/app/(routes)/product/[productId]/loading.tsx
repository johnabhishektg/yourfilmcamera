import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen mx-auto p-6">
      <div className="block gap-8 md:flex ">
        <Skeleton className="rounded h-72 w-full md:w-1/2 md:h-96" />
        <div>
          <Skeleton className="h-[48px] w-[400px] mt-6 md:mt-0" />
          <Skeleton className="h-[24px] w-[60px] md:mt-0" />
          <Skeleton className="h-[50px] w-[100px] mt-4 md:mt-6" />
          <Skeleton className="h-[45px] w-full mt-4 md:mt-6 lg:w-[120px]" />
          <footer className="flex items-center justify-center gap-8 mt-12 lg:mt-20">
            <Skeleton className="w-[116px] h-[72px] rounded" />
            <Skeleton className="w-[116px] h-[72px] rounded" />
            <Skeleton className="w-[116px] h-[72px] rounded" />
          </footer>
        </div>
      </div>

      <div className="mt-24 space-y-4">
        <Skeleton className="w-[150px] h-[50px]" />
        <Skeleton className="w-[400px] h-[30px]" />
      </div>
    </div>
  );
}
