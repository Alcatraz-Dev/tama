import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ProductCardSkeleton() {
  return (
    <div className="group relative block rounded-t-3xl rounded-b-4xl overflow-hidden shadow-lg bg-gradient-luxury animate-pulse">
      <div className="relative w-full aspect-square rounded-t-3xl rounded-b-[50px] bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
      </div>
      <div className="mt-6 mb-6 mx-6 flex flex-col items-center rounded-b-3xl">
        <Skeleton className="h-4 bg-gray-600 rounded w-3/4 my-3" />
        <Skeleton className="h-3 bg-gray-700 rounded w-1/2 my-2" />
        <div className="flex items-center justify-between gap-3 mt-3 w-full px-3">
          <div className="flex gap-2">
            <Skeleton className="w-4 h-4 bg-gray-600 rounded-full" />
            <Skeleton className="w-4 h-4 bg-gray-600 rounded-full" />
            <Skeleton className="w-4 h-4 bg-gray-600 rounded-full" />
          </div>
          <Skeleton className="h-5 bg-fashion-gold rounded w-16" />
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-2xl bg-gray-200" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                <Skeleton className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="w-5 h-5 bg-gray-200 rounded" />
                  ))}
                </div>
                <Skeleton className="h-4 bg-gray-200 rounded w-full" />
                <Skeleton className="h-4 bg-gray-200 rounded w-2/3" />
                <Skeleton className="h-6 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, ProductCardSkeleton, ProductGridSkeleton, ProductDetailsSkeleton }