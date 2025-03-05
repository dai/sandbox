import type { FeedItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitCommitHorizontal, GitPullRequest, GitFork, Star, Package, AlertCircle, FileCode } from "lucide-react"
import Link from "next/link"

interface FeedItemCardProps {
  item: FeedItem
}

export default function FeedItemCard({ item }: FeedItemCardProps) {
  const getIcon = () => {
    switch (item.type) {
      case "PushEvent":
        return <GitCommitHorizontal className="h-4 w-4" />
      case "PullRequestEvent":
        return <GitPullRequest className="h-4 w-4" />
      case "IssuesEvent":
        return <AlertCircle className="h-4 w-4" />
      case "ForkEvent":
        return <GitFork className="h-4 w-4" />
      case "WatchEvent":
        return <Star className="h-4 w-4" />
      case "ReleaseEvent":
        return <Package className="h-4 w-4" />
      case "CreateEvent":
        return <FileCode className="h-4 w-4" />
      default:
        return <FileCode className="h-4 w-4" />
    }
  }

  const getTypeLabel = () => {
    switch (item.type) {
      case "PushEvent":
        return "Commit"
      case "PullRequestEvent":
        return "Pull Request"
      case "IssuesEvent":
        return "Issue"
      case "ForkEvent":
        return "Fork"
      case "WatchEvent":
        return "Star"
      case "ReleaseEvent":
        return "Release"
      case "CreateEvent":
        return "Created"
      default:
        return item.type.replace("Event", "")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            <Link href={item.link} target="_blank" className="hover:underline">
              {item.title}
            </Link>
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            {getIcon()}
            {getTypeLabel()}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <span className="font-medium">{item.repository}</span>
          <span>•</span>
          <time dateTime={item.date.toISOString()}>{formatDistanceToNow(item.date, { addSuffix: true })}</time>
        </CardDescription>
      </CardHeader>
      {item.description && (
        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
        </CardContent>
      )}
    </Card>
  )
}

