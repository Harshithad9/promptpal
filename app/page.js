"use client"

import { useState } from "react"
import { PromptProvider } from "../contexts/prompt-context"
import { Header } from "../components/header"
import { CategoryGrid } from "../components/category-grid"
import { PromptWorkspace } from "../components/prompt-workspace"
import { SavedPrompts } from "../components/saved-prompts"
import { Analytics } from "../components/analytics"
import { Settings } from "../components/settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <PromptProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />

        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm h-12 sm:h-10">
              <TabsTrigger
                value="generate"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-3 touch-manipulation"
              >
                Generate
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-3 touch-manipulation"
              >
                Library
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-3 touch-manipulation sm:block hidden"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-3 touch-manipulation sm:block hidden"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Mobile-only secondary tabs for Analytics & Settings */}
            <TabsList className="sm:hidden mb-4 flex gap-2 justify-center bg-transparent">
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs px-4 py-2 rounded-full border touch-manipulation"
              >
                📊 Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs px-4 py-2 rounded-full border touch-manipulation"
              >
                ⚙️ Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-8">
              {!selectedCategory ? (
                <CategoryGrid onCategorySelect={setSelectedCategory} />
              ) : (
                <PromptWorkspace categoryId={selectedCategory} onBack={() => setSelectedCategory(null)} />
              )}
            </TabsContent>

            <TabsContent value="saved">
              <SavedPrompts />
            </TabsContent>

            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PromptProvider>
  )
}
