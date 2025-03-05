"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { getFeed } from "@/lib/actions"
import type { FeedItem } from "@/lib/types"
import FeedItemCard from "./feed-item-card"
import { FeedSkeleton } from "./feed-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import TokenForm from "./token-form"
import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FeedContainer() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("")
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const { ref, inView } = useInView()
  const searchParams = useSearchParams()

  useEffect(() => {
    const storedToken = localStorage.getItem("github_token")
    const storedUsername = localStorage.getItem("github_username")
    if (storedToken) setToken(storedToken)
    if (storedUsername) setUsername(storedUsername)
  }, [])

  useEffect(() => {
    if (token && username && inView && hasMore && !loading) {
      loadMoreItems()
    }
  }, [inView, token, username, hasMore, loading])

  const loadMoreItems = async () => {
    if (!token || !username) return

    setLoading(true)
    try {
      const newItems = await getFeed(username, token, page)
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setItems((prev) => [...prev, ...newItems])
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch feed")
    } finally {
      setLoading(false)
    }
  }

  const handleTokenSubmit = (newToken: string, newUsername: string) => {
    localStorage.setItem("github_token", newToken)
    localStorage.setItem("github_username", newUsername)
    setToken(newToken)
    setUsername(newUsername)
    setItems([])
    setPage(1)
    setHasMore(true)
    setError(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("github_token")
    localStorage.removeItem("github_username")
    setToken(null)
    setUsername("")
    setItems([])
  }

  const filteredItems = items.filter((item) => {
    // Apply type filter
    if (filter !== "all" && item.type !== filter) return false

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.repository.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
    }

    return true
  })

  if (!token || !username) {
    return <TokenForm onSubmit={handleTokenSubmit} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Your Activity Feed</h2>
          <p className="text-sm text-muted-foreground">Showing activity for {username}</p>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search in feed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48">
          <Label htmlFor="filter">Filter by type</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger id="filter">
              <SelectValue placeholder="All activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All activities</SelectItem>
              <SelectItem value="PushEvent">Commits</SelectItem>
              <SelectItem value="IssuesEvent">Issues</SelectItem>
              <SelectItem value="PullRequestEvent">Pull Requests</SelectItem>
              <SelectItem value="CreateEvent">Created</SelectItem>
              <SelectItem value="ForkEvent">Forks</SelectItem>
              <SelectItem value="WatchEvent">Stars</SelectItem>
              <SelectItem value="ReleaseEvent">Releases</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {filteredItems.length === 0 && !loading && !error ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No activity found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <FeedItemCard key={`${item.id}-${index}`} item={item} />
          ))}

          {hasMore && (
            <div ref={ref} className="py-4">
              {loading && <FeedSkeleton count={3} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

