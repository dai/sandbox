"use server"

import Parser from "rss-parser"

import type { FeedItem } from "./types"

// Custom parser to handle Atom feeds
const parser = new Parser({
  customFields: {
    item: [
      ["title", "title"],
      ["link", "link"],
      ["pubDate", "pubDate"],
      ["content", "content"],
      ["id", "id"],
    ],
  },
})

export async function getFeed(username: string, token: string, page = 1, perPage = 20): Promise<FeedItem[]> {
  try {
    const url = `https://github.com/${username}.private.atom`
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
      next: { revalidate: 60 }, // Revalidate every minute
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid GitHub token")
      }
      throw new Error(`Failed to fetch feed: ${response.statusText}`)
    }

    const text = await response.text()
    const feed = await parser.parseString(text)

    // Calculate pagination
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedItems = feed.items.slice(startIndex, endIndex)

    return paginatedItems.map((item) => {
      // Extract repository name from the link
      const repoMatch = item.link?.match(/github\.com\/([^/]+\/[^/]+)/) || []
      const repository = repoMatch[1] || "Unknown repository"

      // Determine event type from the content or title
      let type = "Event"
      if (item.title?.includes("pushed")) type = "PushEvent"
      else if (item.title?.includes("pull request")) type = "PullRequestEvent"
      else if (item.title?.includes("issue")) type = "IssuesEvent"
      else if (item.title?.includes("forked")) type = "ForkEvent"
      else if (item.title?.includes("starred")) type = "WatchEvent"
      else if (item.title?.includes("released")) type = "ReleaseEvent"
      else if (item.title?.includes("created")) type = "CreateEvent"

      // Extract description from content if available
      let description = undefined
      if (item.content) {
        // Strip HTML tags to get plain text description
        const div = document.createElement("div")
        div.innerHTML = item.content
        description = div.textContent || undefined
      }

      return {
        id: item.id || item.link || `${Date.now()}-${Math.random()}`,
        title: item.title || "Untitled activity",
        link: item.link || "#",
        date: item.pubDate ? new Date(item.pubDate) : new Date(),
        type,
        repository,
        description,
      }
    })
  } catch (error) {
    console.error("Error fetching feed:", error)
    throw error
  }
}

