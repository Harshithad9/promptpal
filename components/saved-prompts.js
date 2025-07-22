"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Search, Star, TrendingUp, Copy, ExternalLink, Trash2, Heart } from "lucide-react"
import { usePromptContext } from "../contexts/prompt-context"
import { useToast } from "../hooks/use-toast"

export function SavedPrompts() {
  const { state, dispatch } = usePromptContext()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredPrompts = state.savedPrompts
    .filter((prompt) => {
      const matchesSearch =
        prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory =
        filterCategory === "all" ||
        prompt.category === filterCategory ||
        (filterCategory === "favorites" && prompt.isFavorite)

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "usage":
          return b.usageCount - a.usageCount
        case "favorites":
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
        default:
          return 0
      }
    })

  const handleCopy = async (prompt, id) => {
    try {
      await navigator.clipboard.writeText(prompt)
      dispatch({ type: "UPDATE_USAGE", payload: id })
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PROMPT", payload: id })
    toast({
      title: "Deleted",
      description: "Prompt removed from library",
    })
  }

  const handleToggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id })
  }

  const handleTryInChatGPT = (prompt, id) => {
    dispatch({ type: "UPDATE_USAGE", payload: id })
    const encodedPrompt = encodeURIComponent(prompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  if (state.savedPrompts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">📚</div>
        <h3 className="text-2xl font-semibold mb-4">Your Prompt Library is Empty</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start generating and saving prompts to build your personal AI assistant library
        </p>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Generate Your First Prompt</Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 items-start justify-between">
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Prompt Library</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {state.savedPrompts.length} prompts • {state.analytics.favoritePrompts} favorites
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-3 sm:py-2 border border-gray-300 rounded-md bg-white text-base sm:text-sm touch-manipulation"
            >
              <option value="all">All Categories</option>
              <option value="favorites">Favorites</option>
              <option value="photo-generation">Photo Generation</option>
              <option value="resume-builder">Resume Builder</option>
              <option value="coding">Code Assistant</option>
              <option value="writing">Content Writer</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-3 sm:py-2 border border-gray-300 rounded-md bg-white text-base sm:text-sm touch-manipulation"
            >
              <option value="recent">Most Recent</option>
              <option value="usage">Most Used</option>
              <option value="favorites">Favorites First</option>
            </select>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 h-12 sm:h-10 touch-manipulation">
              <span className="sm:hidden">Filter</span>
              <span className="hidden sm:inline">Apply Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm">Total Prompts</p>
                <p className="text-xl sm:text-2xl font-bold">{state.savedPrompts.length}</p>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Total Usage</p>
                <p className="text-xl sm:text-2xl font-bold">{state.analytics.totalUsage}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs sm:text-sm">Favorites</p>
                <p className="text-xl sm:text-2xl font-bold">{state.analytics.favoritePrompts}</p>
              </div>
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm">Categories</p>
                <p className="text-xl sm:text-2xl font-bold">{Object.keys(state.analytics.categoriesUsed).length}</p>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prompts List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredPrompts.map((savedPrompt) => (
          <Card key={savedPrompt.id} className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs sm:text-sm w-fit">
                    {savedPrompt.categoryTitle}
                  </Badge>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date(savedPrompt.createdAt).toLocaleDateString()}
                  </span>
                  {savedPrompt.usageCount > 0 && (
                    <Badge variant="outline" className="text-xs w-fit">
                      {savedPrompt.usageCount} uses
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(savedPrompt.id)}
                    className={`${savedPrompt.isFavorite ? "text-red-500" : "text-gray-400"} p-2 touch-manipulation`}
                  >
                    <Heart className={`h-4 w-4 ${savedPrompt.isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(savedPrompt.id)}
                    className="text-red-500 hover:text-red-700 p-2 touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <p className="text-sm text-gray-700 line-clamp-3 sm:line-clamp-4">{savedPrompt.prompt}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleCopy(savedPrompt.prompt, savedPrompt.id)}
                  variant="outline"
                  className="flex-1 h-12 sm:h-10 touch-manipulation"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>

                <Button
                  onClick={() => handleTryInChatGPT(savedPrompt.prompt, savedPrompt.id)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 sm:h-10 touch-manipulation"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Try in ChatGPT
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
