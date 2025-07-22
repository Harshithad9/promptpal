"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function PromptForm({ categoryId, formData, onFormDataChange }) {
  const updateField = (field, value) => {
    onFormDataChange({ ...formData, [field]: value })
  }

  const renderFormFields = () => {
    switch (categoryId) {
      case "photo-generation":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">AI Platform</Label>
                <Select onValueChange={(value) => updateField("platform", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="midjourney" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Midjourney
                    </SelectItem>
                    <SelectItem value="dalle" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      DALL-E 3
                    </SelectItem>
                    <SelectItem
                      value="stable-diffusion"
                      className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation"
                    >
                      Stable Diffusion
                    </SelectItem>
                    <SelectItem value="leonardo" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Leonardo AI
                    </SelectItem>
                    <SelectItem value="firefly" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Adobe Firefly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Art Style</Label>
                <Select onValueChange={(value) => updateField("style", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem
                      value="photorealistic"
                      className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation"
                    >
                      Photorealistic
                    </SelectItem>
                    <SelectItem value="digital-art" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Digital Art
                    </SelectItem>
                    <SelectItem value="oil-painting" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Oil Painting
                    </SelectItem>
                    <SelectItem value="watercolor" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Watercolor
                    </SelectItem>
                    <SelectItem value="anime" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Anime/Manga
                    </SelectItem>
                    <SelectItem value="cyberpunk" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Cyberpunk
                    </SelectItem>
                    <SelectItem value="fantasy" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Fantasy
                    </SelectItem>
                    <SelectItem value="minimalist" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Minimalist
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Main Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., a majestic dragon, futuristic cityscape, portrait of a woman"
                value={formData.subject || ""}
                onChange={(e) => updateField("subject", e.target.value)}
                className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mood">Mood/Atmosphere</Label>
                <Select onValueChange={(value) => updateField("mood", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="dramatic" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Dramatic
                    </SelectItem>
                    <SelectItem value="peaceful" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Peaceful
                    </SelectItem>
                    <SelectItem value="mysterious" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Mysterious
                    </SelectItem>
                    <SelectItem value="energetic" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Energetic
                    </SelectItem>
                    <SelectItem value="romantic" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Romantic
                    </SelectItem>
                    <SelectItem value="dark" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Dark & Moody
                    </SelectItem>
                    <SelectItem value="bright" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Bright & Cheerful
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lighting">Lighting</Label>
                <Select onValueChange={(value) => updateField("lighting", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select lighting" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="golden-hour" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Golden Hour
                    </SelectItem>
                    <SelectItem value="studio" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Studio Lighting
                    </SelectItem>
                    <SelectItem value="natural" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Natural Light
                    </SelectItem>
                    <SelectItem value="neon" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Neon Lighting
                    </SelectItem>
                    <SelectItem value="candlelight" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Candlelight
                    </SelectItem>
                    <SelectItem value="dramatic" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Dramatic Shadows
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition">Composition & Camera</Label>
              <Select onValueChange={(value) => updateField("composition", value)}>
                <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                  <SelectValue placeholder="Select composition" />
                </SelectTrigger>
                <SelectContent className="touch-manipulation">
                  <SelectItem value="close-up" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Close-up Portrait
                  </SelectItem>
                  <SelectItem value="wide-shot" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Wide Shot
                  </SelectItem>
                  <SelectItem value="aerial" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Aerial View
                  </SelectItem>
                  <SelectItem value="low-angle" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Low Angle
                  </SelectItem>
                  <SelectItem value="macro" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Macro Photography
                  </SelectItem>
                  <SelectItem value="panoramic" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Panoramic
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colors">Color Palette</Label>
              <Input
                id="colors"
                placeholder="e.g., vibrant blues and purples, warm earth tones, monochrome"
                value={formData.colors || ""}
                onChange={(e) => updateField("colors", e.target.value)}
                className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Any specific details, objects, background elements, or technical specifications..."
                value={formData.details || ""}
                onChange={(e) => updateField("details", e.target.value)}
                className="min-h-[100px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality Settings</Label>
              <Select onValueChange={(value) => updateField("quality", value)}>
                <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent className="touch-manipulation">
                  <SelectItem value="standard" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Standard Quality
                  </SelectItem>
                  <SelectItem value="high" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    High Quality
                  </SelectItem>
                  <SelectItem value="ultra" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    Ultra High Quality
                  </SelectItem>
                  <SelectItem value="raw" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                    RAW/Unprocessed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "resume-builder":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resumeType">Resume Type</Label>
                <Select onValueChange={(value) => updateField("resumeType", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="professional" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Professional Resume
                    </SelectItem>
                    <SelectItem value="creative" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Creative Resume
                    </SelectItem>
                    <SelectItem
                      value="ats-optimized"
                      className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation"
                    >
                      ATS-Optimized
                    </SelectItem>
                    <SelectItem value="executive" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Executive Resume
                    </SelectItem>
                    <SelectItem value="cover-letter" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Cover Letter
                    </SelectItem>
                    <SelectItem value="linkedin" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      LinkedIn Profile
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select onValueChange={(value) => updateField("experienceLevel", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="entry" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Entry Level (0-2 years)
                    </SelectItem>
                    <SelectItem value="mid" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Mid Level (3-5 years)
                    </SelectItem>
                    <SelectItem value="senior" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Senior Level (6-10 years)
                    </SelectItem>
                    <SelectItem value="executive" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Executive (10+ years)
                    </SelectItem>
                    <SelectItem
                      value="career-change"
                      className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation"
                    >
                      Career Change
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Job Title</Label>
              <Input
                id="targetRole"
                placeholder="e.g., Senior Software Engineer, Marketing Manager, Data Scientist"
                value={formData.targetRole || ""}
                onChange={(e) => updateField("targetRole", e.target.value)}
                className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => updateField("industry", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="technology" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Technology
                    </SelectItem>
                    <SelectItem value="healthcare" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Healthcare
                    </SelectItem>
                    <SelectItem value="finance" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Finance & Banking
                    </SelectItem>
                    <SelectItem value="marketing" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Marketing & Advertising
                    </SelectItem>
                    <SelectItem value="education" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Education
                    </SelectItem>
                    <SelectItem value="retail" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Retail & E-commerce
                    </SelectItem>
                    <SelectItem value="consulting" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Consulting
                    </SelectItem>
                    <SelectItem
                      value="manufacturing"
                      className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation"
                    >
                      Manufacturing
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">Target Company Size</Label>
                <Select onValueChange={(value) => updateField("companySize", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="startup" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Startup (1-50)
                    </SelectItem>
                    <SelectItem value="small" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Small (51-200)
                    </SelectItem>
                    <SelectItem value="medium" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Medium (201-1000)
                    </SelectItem>
                    <SelectItem value="large" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Large (1000+)
                    </SelectItem>
                    <SelectItem value="enterprise" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Enterprise (5000+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keySkills">Key Skills & Technologies</Label>
              <Textarea
                id="keySkills"
                placeholder="List your most relevant skills, technologies, certifications, and tools..."
                value={formData.keySkills || ""}
                onChange={(e) => updateField("keySkills", e.target.value)}
                className="min-h-[80px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                placeholder="Describe your major accomplishments, quantifiable results, awards, or recognitions..."
                value={formData.achievements || ""}
                onChange={(e) => updateField("achievements", e.target.value)}
                className="min-h-[80px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHistory">Work History Summary</Label>
              <Textarea
                id="workHistory"
                placeholder="Brief overview of your work experience, key roles, and career progression..."
                value={formData.workHistory || ""}
                onChange={(e) => updateField("workHistory", e.target.value)}
                className="min-h-[80px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select onValueChange={(value) => updateField("education", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="high-school" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      High School
                    </SelectItem>
                    <SelectItem value="associate" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Associate Degree
                    </SelectItem>
                    <SelectItem value="bachelor" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Bachelor's Degree
                    </SelectItem>
                    <SelectItem value="master" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Master's Degree
                    </SelectItem>
                    <SelectItem value="phd" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      PhD/Doctorate
                    </SelectItem>
                    <SelectItem value="bootcamp" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Bootcamp/Certificate
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type Preference</Label>
                <Select onValueChange={(value) => updateField("jobType", value)}>
                  <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="touch-manipulation">
                    <SelectItem value="full-time" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Full-time
                    </SelectItem>
                    <SelectItem value="part-time" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Part-time
                    </SelectItem>
                    <SelectItem value="contract" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Contract
                    </SelectItem>
                    <SelectItem value="freelance" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Freelance
                    </SelectItem>
                    <SelectItem value="remote" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Remote
                    </SelectItem>
                    <SelectItem value="hybrid" className="h-12 sm:h-auto text-base sm:text-sm touch-manipulation">
                      Hybrid
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requirements</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any specific requirements like salary expectations, location preferences, or unique circumstances..."
                value={formData.specialRequests || ""}
                onChange={(e) => updateField("specialRequests", e.target.value)}
                className="min-h-[80px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you need help with..."
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                className="min-h-[100px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                placeholder="Any additional context or requirements..."
                value={formData.context || ""}
                onChange={(e) => updateField("context", e.target.value)}
                className="min-h-[80px] sm:min-h-[80px] text-base sm:text-sm touch-manipulation resize-none"
              />
            </div>
          </div>
        )
    }
  }

  return <div className="space-y-4">{renderFormFields()}</div>
}
