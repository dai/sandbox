import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Skeleton className="h-5 w-3/4" />
              <Badge variant="outline">
                <Skeleton className="h-4 w-16" />
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1 mt-2">
              <Skeleton className="h-4 w-32" />
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

