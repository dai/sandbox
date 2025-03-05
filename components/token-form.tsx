"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface TokenFormProps {
  onSubmit: (token: string, username: string) => void
}

export default function TokenForm({ onSubmit }: TokenFormProps) {
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!token.trim()) {
      setError("Please enter a GitHub token")
      return
    }

    if (!username.trim()) {
      setError("Please enter your GitHub username")
      return
    }

    onSubmit(token, username)
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>GitHub Authentication</CardTitle>
        <CardDescription>
          Enter your GitHub personal access token and username to access your private feed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">GitHub Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-github-username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token">Personal Access Token</Label>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Your token is stored locally in your browser and is only used to authenticate with GitHub.
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full">
            Connect to GitHub
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-xs text-muted-foreground">
        <p>
          To create a token, go to{" "}
          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">
            GitHub Settings &gt; Developer settings &gt; Personal access tokens
          </a>
        </p>
        <p className="mt-1">
          Required scopes: <code>repo</code>, <code>read:user</code>
        </p>
      </CardFooter>
    </Card>
  )
}

