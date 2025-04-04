import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
      </div>
    </div>
  )
}

