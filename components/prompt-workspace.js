"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, Wand2, Copy, Save, ExternalLink, Check, RefreshCw, Settings, Sparkles } from "lucide-react"
import { PromptForm } from "./prompt-form"
import { PromptPreview } from "./prompt-preview"
import { usePromptContext } from "../contexts/prompt-context"
import { useToast } from "../hooks/use-toast"

const categories = [
  {
    id: "photo-generation",
    title: "AI Photo Generator",
    description: "Create stunning images with detailed prompts for Midjourney, DALL-E, Stable Diffusion",
    icon: "📸",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "resume-builder",
    title: "Resume & CV Builder",
    description: "Professional resume content, cover letters, LinkedIn optimization",
    icon: "📄",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "coding",
    title: "Code Assistant",
    description: "Programming help, debugging, code reviews, and optimization",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "writing",
    title: "Content Writer",
    description: "Blog posts, articles, copywriting, and creative content",
    icon: "✍️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "business",
    title: "Business Strategist",
    description: "Business plans, market analysis, and strategic planning",
    icon: "💼",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "marketing",
    title: "Marketing Expert",
    description: "Social media, ads, email campaigns, and brand strategy",
    icon: "📈",
    gradient: "from-orange-500 to-red-500",
  },
]

export function PromptWorkspace({ categoryId, onBack }) {
  const [formData, setFormData] = useState({})
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const { dispatch } = usePromptContext()
  const { toast } = useToast()

  const category = categories.find((cat) => cat.id === categoryId)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const prompt = generateAdvancedPrompt(categoryId, formData)
    setGeneratedPrompt(prompt)
    setIsGenerating(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    if (!generatedPrompt) return

    const promptData = {
      id: Date.now().toString(),
      prompt: generatedPrompt,
      category: categoryId,
      categoryTitle: category?.title || "",
      tags: Object.keys(formData).filter((key) => formData[key]),
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: "SAVE_PROMPT", payload: promptData })
    toast({
      title: "Saved!",
      description: "Prompt saved to your library",
    })
  }

  const handleTryInChatGPT = () => {
    if (!generatedPrompt) return

    dispatch({ type: "UPDATE_USAGE", payload: Date.now().toString() })
    const encodedPrompt = encodeURIComponent(generatedPrompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")
  }

  if (!category) return null

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 touch-manipulation -ml-2 sm:ml-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Categories</span>
          <span className="sm:hidden">Back</span>
        </Button>

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}
          >
            {category.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{category.title}</h1>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-1">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Form Section */}
        <div className="space-y-4 sm:space-y-6 order-1">
          <Card className="bg-white/80 backdrop-blur-sm border-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                Customize Your Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <PromptForm categoryId={categoryId} formData={formData} onFormDataChange={setFormData} />

              <Button
                onClick={handleGenerate}
                className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Prompt Section */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
          {generatedPrompt && (
            <Card className="bg-white/80 backdrop-blur-sm border-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  Generated Prompt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[200px] sm:min-h-[300px] resize-none bg-gray-50 font-mono text-xs sm:text-sm touch-manipulation"
                />

                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    <Button onClick={handleCopy} variant="outline" className="bg-transparent touch-manipulation h-12">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>

                    <Button onClick={handleSave} variant="outline" className="bg-transparent touch-manipulation h-12">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>

                  <Button
                    onClick={handleTryInChatGPT}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 touch-manipulation h-12 sm:h-10"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Try in ChatGPT
                  </Button>

                  {/* Desktop buttons */}
                  <div className="hidden sm:flex sm:flex-row gap-3">
                    <Button onClick={handleCopy} variant="outline" className="flex-1 bg-transparent">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>

                    <Button onClick={handleSave} variant="outline" className="flex-1 bg-transparent">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Section */}
          <PromptPreview categoryId={categoryId} formData={formData} />
        </div>
      </div>
    </div>
  )
}

function generateAdvancedPrompt(categoryId, formData) {
  const basePrompts = {
    "photo-generation": `Create a detailed ${formData.platform || "AI image generation"} prompt for generating high-quality images.

**Image Specifications:**
- Platform: ${formData.platform || "Universal AI"}
- Art Style: ${formData.style || "Photorealistic"}
- Main Subject: ${formData.subject || "Not specified"}
- Mood/Atmosphere: ${formData.mood || "Balanced"}
- Lighting: ${formData.lighting || "Natural"}
- Composition: ${formData.composition || "Standard"}
- Color Palette: ${formData.colors || "Natural colors"}
- Quality: ${formData.quality || "High quality"}

**Additional Details:**
${formData.details || "Standard composition"}

**Generate a comprehensive prompt that includes:**
1. **Main Prompt**: Detailed description optimized for ${formData.platform || "AI image generation"}
2. **Technical Parameters**: Recommended settings, aspect ratios, and quality modifiers
3. **Style Modifiers**: Specific artistic techniques and visual elements
4. **Negative Prompts**: What to avoid in the generation
5. **Alternative Variations**: 3-5 prompt variations for different results
6. **Platform-Specific Tips**: Best practices for ${formData.platform || "your chosen platform"}

**Format the output as:**
- Clear, descriptive language
- Comma-separated keywords and phrases
- Technical parameters in brackets
- Weight modifiers where applicable

Make the prompt highly detailed and optimized for professional-quality image generation.`,

    "resume-builder": `You are a professional career coach and ATS optimization expert. Create comprehensive resume content for:

**Position Details:**
- Target Role: ${formData.targetRole || "Not specified"}
- Industry: ${formData.industry || "Not specified"}
- Experience Level: ${formData.experienceLevel || "Not specified"}
- Company Size: ${formData.companySize || "Any size"}
- Job Type: ${formData.jobType || "Full-time"}
- Education: ${formData.education || "Not specified"}

**Candidate Profile:**
- Key Skills: ${formData.keySkills || "Not specified"}
- Major Achievements: ${formData.achievements || "Not specified"}
- Work History: ${formData.workHistory || "Not specified"}
- Special Requirements: ${formData.specialRequests || "None"}

**Resume Type:** ${formData.resumeType || "Professional Resume"}

**Please provide:**

1. **Professional Summary** (3-4 lines)
   - Compelling opening statement
   - Key value proposition
   - Years of experience highlight
   - Industry-specific keywords

2. **Core Competencies** (8-12 skills)
   - Technical skills relevant to the role
   - Soft skills that matter
   - Industry certifications
   - Tools and technologies

3. **Professional Experience** (3-4 bullet points per role)
   - Action-oriented descriptions
   - Quantifiable achievements
   - Impact-focused statements
   - ATS-friendly keywords

4. **Key Achievements Section**
   - 4-6 standout accomplishments
   - Metrics and percentages
   - Awards and recognitions
   - Project successes

5. **Skills Matrix**
   - Technical skills with proficiency levels
   - Relevant software and tools
   - Industry-specific competencies
   - Emerging technologies

6. **ATS Optimization**
   - Industry keywords to include
   - Formatting recommendations
   - Section headers that work
   - Keyword density suggestions

7. **Cover Letter Template** (if applicable)
   - Opening paragraph
   - Body paragraphs with examples
   - Closing with call-to-action

8. **LinkedIn Profile Optimization**
   - Headline suggestions
   - Summary section
   - Skills to highlight
   - Keywords for searchability

**Additional Deliverables:**
- Interview preparation talking points
- Salary negotiation key points
- Follow-up email templates
- Portfolio/work samples suggestions

Focus on making the content ATS-friendly, keyword-rich, and tailored to the specific role and industry.`,
  }

  return (
    basePrompts[categoryId] ||
    `You are an expert assistant specializing in ${categoryId}. Please help with: ${formData.description || "the requested task"}.`
  )
}
