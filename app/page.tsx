import { Suspense } from "react"
import FeedContainer from "@/components/feed-container"
import { FeedSkeleton } from "@/components/feed-skeleton"
import { ModeToggle } from "@/components/mode-toggle"
import { GithubIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="container max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <GithubIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">GitHub Feed Reader</h1>
          </div>
          <ModeToggle />
        </header>

        <Suspense fallback={<FeedSkeleton />}>
          <FeedContainer />
        </Suspense>
      </div>
    </main>
  )
}

