// PROMPTPAL PRO - Main JavaScript File
// Professional AI Prompt Engineering Suite

class PromptPalPro {
  constructor() {
    this.currentCategory = null
    this.formData = {}
    this.generatedPrompt = ""
    this.savedPrompts = this.loadFromStorage("promptpal-prompts", [])
    this.analytics = this.loadFromStorage("promptpal-analytics", {
      totalPrompts: 0,
      totalUsage: 0,
      categoriesUsed: {},
      dailyUsage: {},
      favoritePrompts: 0,
    })
    this.settings = this.loadFromStorage("promptpal-settings", {
      autoSave: true,
      showAnalytics: true,
      darkMode: false,
    })

    this.categories = [
      {
        id: "photo-generation",
        title: "AI Photo Generator",
        description: "Create stunning images with detailed prompts for Midjourney, DALL-E, Stable Diffusion",
        icon: "📸",
        gradient: "from-violet-500 to-purple-500",
        tags: ["Midjourney", "DALL-E", "Art"],
        trending: true,
        hot: true,
        fields: [
          {
            name: "platform",
            label: "AI Platform",
            type: "select",
            options: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Leonardo AI", "Adobe Firefly"],
            required: true,
          },
          {
            name: "style",
            label: "Art Style",
            type: "select",
            options: [
              "Photorealistic",
              "Digital Art",
              "Oil Painting",
              "Watercolor",
              "Anime/Manga",
              "Cyberpunk",
              "Fantasy",
              "Minimalist",
            ],
          },
          {
            name: "subject",
            label: "Main Subject",
            type: "text",
            placeholder: "e.g., a majestic dragon, futuristic cityscape, portrait of a woman",
            required: true,
          },
          {
            name: "mood",
            label: "Mood/Atmosphere",
            type: "select",
            options: [
              "Dramatic",
              "Peaceful",
              "Mysterious",
              "Energetic",
              "Romantic",
              "Dark & Moody",
              "Bright & Cheerful",
            ],
          },
          {
            name: "lighting",
            label: "Lighting",
            type: "select",
            options: [
              "Golden Hour",
              "Studio Lighting",
              "Natural Light",
              "Neon Lighting",
              "Candlelight",
              "Dramatic Shadows",
            ],
          },
          {
            name: "composition",
            label: "Composition & Camera",
            type: "select",
            options: ["Close-up Portrait", "Wide Shot", "Aerial View", "Low Angle", "Macro Photography", "Panoramic"],
          },
          {
            name: "colors",
            label: "Color Palette",
            type: "text",
            placeholder: "e.g., vibrant blues and purples, warm earth tones, monochrome",
          },
          {
            name: "details",
            label: "Additional Details",
            type: "textarea",
            placeholder: "Any specific details, objects, background elements, or technical specifications...",
          },
          {
            name: "quality",
            label: "Quality Settings",
            type: "select",
            options: ["Standard Quality", "High Quality", "Ultra High Quality", "RAW/Unprocessed"],
          },
        ],
      },
      {
        id: "resume-builder",
        title: "Resume & CV Builder",
        description: "Professional resume content, cover letters, LinkedIn optimization",
        icon: "📄",
        gradient: "from-emerald-500 to-green-500",
        tags: ["Resume", "CV", "LinkedIn"],
        trending: true,
        hot: true,
        fields: [
          {
            name: "resumeType",
            label: "Resume Type",
            type: "select",
            options: [
              "Professional Resume",
              "Creative Resume",
              "ATS-Optimized",
              "Executive Resume",
              "Cover Letter",
              "LinkedIn Profile",
            ],
            required: true,
          },
          {
            name: "experienceLevel",
            label: "Experience Level",
            type: "select",
            options: [
              "Entry Level (0-2 years)",
              "Mid Level (3-5 years)",
              "Senior Level (6-10 years)",
              "Executive (10+ years)",
              "Career Change",
            ],
            required: true,
          },
          {
            name: "targetRole",
            label: "Target Job Title",
            type: "text",
            placeholder: "e.g., Senior Software Engineer, Marketing Manager, Data Scientist",
            required: true,
          },
          {
            name: "industry",
            label: "Industry",
            type: "select",
            options: [
              "Technology",
              "Healthcare",
              "Finance & Banking",
              "Marketing & Advertising",
              "Education",
              "Retail & E-commerce",
              "Consulting",
              "Manufacturing",
            ],
          },
          {
            name: "companySize",
            label: "Target Company Size",
            type: "select",
            options: ["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)", "Enterprise (5000+)"],
          },
          {
            name: "keySkills",
            label: "Key Skills & Technologies",
            type: "textarea",
            placeholder: "List your most relevant skills, technologies, certifications, and tools...",
            required: true,
          },
          {
            name: "achievements",
            label: "Key Achievements",
            type: "textarea",
            placeholder: "Describe your major accomplishments, quantifiable results, awards, or recognitions...",
          },
          {
            name: "workHistory",
            label: "Work History Summary",
            type: "textarea",
            placeholder: "Brief overview of your work experience, key roles, and career progression...",
          },
          {
            name: "education",
            label: "Education Level",
            type: "select",
            options: [
              "High School",
              "Associate Degree",
              "Bachelor's Degree",
              "Master's Degree",
              "PhD/Doctorate",
              "Bootcamp/Certificate",
            ],
          },
          {
            name: "jobType",
            label: "Job Type Preference",
            type: "select",
            options: ["Full-time", "Part-time", "Contract", "Freelance", "Remote", "Hybrid"],
          },
          {
            name: "specialRequests",
            label: "Special Requirements",
            type: "textarea",
            placeholder:
              "Any specific requirements like salary expectations, location preferences, or unique circumstances...",
          },
        ],
      },
      {
        id: "coding",
        title: "Code Assistant",
        description: "Programming help, debugging, code reviews, and optimization",
        icon: "💻",
        gradient: "from-blue-500 to-cyan-500",
        tags: ["Programming", "Debug", "Review"],
        trending: true,
        fields: [
          {
            name: "language",
            label: "Programming Language",
            type: "select",
            options: ["JavaScript", "TypeScript", "Python", "Java", "C++", "React", "Node.js", "Go", "Rust"],
            required: true,
          },
          {
            name: "skillLevel",
            label: "Skill Level",
            type: "select",
            options: ["Beginner", "Intermediate", "Advanced", "Expert"],
            required: true,
          },
          {
            name: "problemType",
            label: "Problem Type",
            type: "select",
            options: [
              "Debugging",
              "Algorithm Design",
              "Code Optimization",
              "System Architecture",
              "Testing Strategy",
              "Code Refactoring",
            ],
          },
          {
            name: "description",
            label: "Problem Description",
            type: "textarea",
            placeholder: "Describe your coding challenge in detail...",
            required: true,
          },
          {
            name: "requirements",
            label: "Specific Requirements",
            type: "textarea",
            placeholder: "Any specific requirements, constraints, or preferences...",
          },
        ],
      },
      {
        id: "writing",
        title: "Content Writer",
        description: "Blog posts, articles, copywriting, and creative content",
        icon: "✍️",
        gradient: "from-purple-500 to-pink-500",
        tags: ["Blog", "Copy", "Creative"],
        fields: [
          {
            name: "contentType",
            label: "Content Type",
            type: "select",
            options: [
              "Blog Post",
              "Article",
              "Social Media",
              "Email Campaign",
              "Landing Page",
              "Product Description",
              "Press Release",
            ],
            required: true,
          },
          {
            name: "tone",
            label: "Tone",
            type: "select",
            options: ["Professional", "Casual", "Friendly", "Authoritative", "Conversational", "Humorous"],
            required: true,
          },
          {
            name: "audience",
            label: "Target Audience",
            type: "text",
            placeholder: "e.g., young professionals, small business owners, tech enthusiasts",
            required: true,
          },
          { name: "wordCount", label: "Word Count", type: "range", min: 100, max: 3000, step: 100, default: 500 },
          {
            name: "objective",
            label: "Content Objective",
            type: "textarea",
            placeholder: "What do you want to achieve with this content?",
            required: true,
          },
          { name: "keywords", label: "SEO Keywords", type: "text", placeholder: "Enter keywords separated by commas" },
        ],
      },
      {
        id: "business",
        title: "Business Strategist",
        description: "Business plans, market analysis, and strategic planning",
        icon: "💼",
        gradient: "from-emerald-500 to-teal-500",
        tags: ["Strategy", "Analysis", "Planning"],
        fields: [
          {
            name: "industry",
            label: "Industry",
            type: "select",
            options: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Consulting"],
            required: true,
          },
          {
            name: "stage",
            label: "Business Stage",
            type: "select",
            options: ["Startup", "Growth Stage", "Established", "Enterprise"],
            required: true,
          },
          {
            name: "targetMarket",
            label: "Target Market",
            type: "text",
            placeholder: "Describe your target market or customer segment",
            required: true,
          },
          {
            name: "challenges",
            label: "Key Challenges",
            type: "textarea",
            placeholder: "What are the main challenges you're facing?",
            required: true,
          },
          {
            name: "goals",
            label: "Business Goals",
            type: "textarea",
            placeholder: "What are your primary business objectives?",
            required: true,
          },
          {
            name: "request",
            label: "Specific Request",
            type: "textarea",
            placeholder: "What specific business guidance do you need?",
            required: true,
          },
        ],
      },
      {
        id: "marketing",
        title: "Marketing Expert",
        description: "Social media, ads, email campaigns, and brand strategy",
        icon: "📈",
        gradient: "from-orange-500 to-red-500",
        tags: ["Social", "Ads", "Branding"],
        trending: true,
        fields: [
          {
            name: "marketingChannel",
            label: "Marketing Channel",
            type: "select",
            options: [
              "Social Media",
              "Email Marketing",
              "Content Marketing",
              "Paid Advertising",
              "SEO",
              "Influencer Marketing",
              "Multi-Channel",
            ],
            required: true,
          },
          {
            name: "budget",
            label: "Budget Range",
            type: "select",
            options: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $50,000", "$50,000+"],
          },
          {
            name: "targetAudience",
            label: "Target Audience",
            type: "text",
            placeholder: "Describe your ideal customer",
            required: true,
          },
          {
            name: "objective",
            label: "Campaign Objective",
            type: "select",
            options: ["Brand Awareness", "Lead Generation", "Sales Conversion", "Engagement", "Customer Retention"],
            required: true,
          },
          {
            name: "timeline",
            label: "Campaign Timeline",
            type: "text",
            placeholder: "e.g., 3 months, Q1 2024, ongoing",
          },
          {
            name: "challenge",
            label: "Marketing Challenge",
            type: "textarea",
            placeholder: "What specific marketing challenge are you trying to solve?",
            required: true,
          },
        ],
      },
      {
        id: "education",
        title: "Learning Coach",
        description: "Lesson plans, study guides, and educational content",
        icon: "🎓",
        gradient: "from-indigo-500 to-purple-500",
        tags: ["Teaching", "Learning", "Education"],
        fields: [
          {
            name: "subject",
            label: "Subject/Topic",
            type: "text",
            placeholder: "e.g., Mathematics, History, Science",
            required: true,
          },
          {
            name: "level",
            label: "Grade Level",
            type: "select",
            options: ["Elementary", "Middle School", "High School", "College", "Adult Learning"],
            required: true,
          },
          {
            name: "objectives",
            label: "Learning Objectives",
            type: "textarea",
            placeholder: "What should students learn or achieve?",
            required: true,
          },
          {
            name: "method",
            label: "Teaching Method",
            type: "select",
            options: ["Interactive", "Lecture", "Hands-on", "Discussion", "Project-based"],
            required: true,
          },
          {
            name: "duration",
            label: "Lesson Duration",
            type: "select",
            options: ["30 minutes", "45 minutes", "1 hour", "90 minutes", "2+ hours"],
          },
        ],
      },
      {
        id: "productivity",
        title: "Productivity Guru",
        description: "Workflow optimization, time management, and efficiency",
        icon: "⚡",
        gradient: "from-yellow-500 to-orange-500",
        tags: ["Workflow", "Efficiency", "Time"],
        fields: [
          {
            name: "area",
            label: "Focus Area",
            type: "select",
            options: [
              "Time Management",
              "Task Organization",
              "Workflow Automation",
              "Goal Setting",
              "Habit Building",
              "Team Productivity",
            ],
            required: true,
          },
          {
            name: "challenge",
            label: "Current Challenge",
            type: "textarea",
            placeholder: "What productivity challenge are you facing?",
            required: true,
          },
          {
            name: "tools",
            label: "Current Tools",
            type: "text",
            placeholder: "What tools or systems do you currently use?",
          },
          {
            name: "goals",
            label: "Productivity Goals",
            type: "textarea",
            placeholder: "What do you want to achieve?",
            required: true,
          },
        ],
      },
    ]

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.renderCategories()
    this.updateStats()
    this.loadSettings()
    this.showToast("Welcome to PROMPTPAL PRO! 🚀", "Your AI prompt engineering suite is ready.", "success")
  }

  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener("click", (e) => this.switchTab(e.target.id))
    })

    // Mobile menu
    document.getElementById("mobile-menu-btn").addEventListener("click", this.toggleMobileMenu)

    // Category search
    document.getElementById("category-search").addEventListener("input", (e) => this.filterCategories(e.target.value))

    // Back button
    document.getElementById("back-to-categories").addEventListener("click", this.showCategorySelection.bind(this))

    // Generate button
    document.getElementById("generate-prompt-btn").addEventListener("click", this.generatePrompt.bind(this))

    // Action buttons
    document.getElementById("copy-prompt-btn").addEventListener("click", this.copyPrompt.bind(this))
    document.getElementById("save-prompt-btn").addEventListener("click", this.savePrompt.bind(this))
    document.getElementById("try-chatgpt-btn").addEventListener("click", this.tryInChatGPT.bind(this))

    // Export buttons
    document.getElementById("export-btn").addEventListener("click", this.exportData.bind(this))
    document.getElementById("mobile-export-btn").addEventListener("click", this.exportData.bind(this))

    // Dark mode toggles
    document.getElementById("dark-mode-toggle").addEventListener("click", this.toggleDarkMode.bind(this))
    document.getElementById("mobile-dark-mode-toggle").addEventListener("click", this.toggleDarkMode.bind(this))

    // Settings toggles
    document
      .getElementById("autosave-toggle")
      .addEventListener("change", (e) => this.updateSetting("autoSave", e.target.checked))
    document
      .getElementById("analytics-toggle")
      .addEventListener("change", (e) => this.updateSetting("showAnalytics", e.target.checked))
    document
      .getElementById("theme-toggle")
      .addEventListener("change", (e) => this.updateSetting("darkMode", e.target.checked))

    // Start generating button
    document.getElementById("start-generating-btn").addEventListener("click", () => this.switchTab("generate-tab"))

    // Keyboard navigation
    document.addEventListener("keydown", this.handleKeyboardNavigation.bind(this))

    // Form validation
    document.addEventListener("input", this.validateForm.bind(this))
    document.addEventListener("change", this.validateForm.bind(this))
  }

  switchTab(tabId) {
    // Remove active state from all tabs and panels
    document.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.classList.remove("active")
      tab.setAttribute("aria-selected", "false")
    })

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.remove("active")
      panel.classList.add("hidden")
    })

    // Activate selected tab
    const activeTab = document.getElementById(tabId)
    const panelId = activeTab.getAttribute("aria-controls")

    activeTab.classList.add("active")
    activeTab.setAttribute("aria-selected", "true")

    const activePanel = document.getElementById(panelId)
    activePanel.classList.add("active")
    activePanel.classList.remove("hidden")

    // Update mobile tabs if needed
    if (tabId.includes("mobile-")) {
      const desktopTabId = tabId.replace("mobile-", "")
      const desktopTab = document.getElementById(desktopTabId)
      if (desktopTab) {
        desktopTab.classList.add("active")
        desktopTab.setAttribute("aria-selected", "true")
      }
    }

    // Focus management for accessibility
    activeTab.focus()
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu")
    const menuBtn = document.getElementById("mobile-menu-btn")
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true"

    if (isExpanded) {
      mobileMenu.classList.add("hidden")
      menuBtn.setAttribute("aria-expanded", "false")
    } else {
      mobileMenu.classList.remove("hidden")
      menuBtn.setAttribute("aria-expanded", "true")
    }
  }

  renderCategories() {
    const grid = document.getElementById("categories-grid")
    grid.innerHTML = ""

    this.categories.forEach((category) => {
      const categoryCard = this.createCategoryCard(category)
      grid.appendChild(categoryCard)
    })
  }

  createCategoryCard(category) {
    const card = document.createElement("div")
    card.className =
      "category-card bg-white/80 backdrop-blur-sm rounded-lg border-2 shadow-sm p-6 space-y-4 transition-all duration-300 hover:shadow-xl hover:border-purple-200 focus-within:ring-2 focus-within:ring-purple-500"
    card.setAttribute("role", "gridcell")
    card.setAttribute("tabindex", "0")
    card.setAttribute("aria-label", `${category.title}: ${category.description}`)

    const usage = this.analytics.categoriesUsed[category.id] || 0

    card.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-2xl shadow-lg">
                    ${category.icon}
                </div>
                <div class="flex flex-col items-end gap-1">
                    ${category.hot ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 animate-pulse">🔥 HOT</span>' : ""}
                    ${category.trending && !category.hot ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700"><svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Trending</span>' : ""}
                    ${usage > 0 ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700">${usage} uses</span>` : ""}
                </div>
            </div>
            <div class="space-y-3">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">${category.title}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">${category.description}</p>
            </div>
            <div class="flex flex-wrap gap-1">
                ${category.tags.map((tag) => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">${tag}</span>`).join("")}
            </div>
        `

    card.addEventListener("click", () => this.selectCategory(category.id))
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.selectCategory(category.id)
      }
    })

    return card
  }

  filterCategories(searchTerm) {
    const cards = document.querySelectorAll(".category-card")
    const term = searchTerm.toLowerCase()

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const description = card.querySelector("p").textContent.toLowerCase()
      const tags = Array.from(card.querySelectorAll(".bg-gray-100")).map((tag) => tag.textContent.toLowerCase())

      const matches = title.includes(term) || description.includes(term) || tags.some((tag) => tag.includes(term))

      if (matches) {
        card.style.display = "block"
        card.classList.add("animate-fade-in")
      } else {
        card.style.display = "none"
      }
    })
  }

  selectCategory(categoryId) {
    this.currentCategory = this.categories.find((cat) => cat.id === categoryId)
    this.formData = {}

    this.showPromptWorkspace()
    this.renderCategoryInfo()
    this.renderForm()
    this.updatePreview()
  }

  showCategorySelection() {
    document.getElementById("category-selection").classList.remove("hidden")
    document.getElementById("prompt-workspace").classList.add("hidden")
    this.currentCategory = null
    this.formData = {}
  }

  showPromptWorkspace() {
    document.getElementById("category-selection").classList.add("hidden")
    document.getElementById("prompt-workspace").classList.remove("hidden")
  }

  renderCategoryInfo() {
    const infoContainer = document.getElementById("selected-category-info")
    infoContainer.innerHTML = `
            <div class="w-12 h-12 rounded-xl bg-gradient-to-r ${this.currentCategory.gradient} flex items-center justify-center text-2xl shadow-lg">
                ${this.currentCategory.icon}
            </div>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">${this.currentCategory.title}</h1>
                <p class="text-gray-600">${this.currentCategory.description}</p>
            </div>
        `
  }

  renderForm() {
    const form = document.getElementById("prompt-form")
    form.innerHTML = ""

    this.currentCategory.fields.forEach((field) => {
      const fieldElement = this.createFormField(field)
      form.appendChild(fieldElement)
    })
  }

  createFormField(field) {
    const fieldContainer = document.createElement("div")
    fieldContainer.className = "space-y-2"

    const label = document.createElement("label")
    label.htmlFor = field.name
    label.className = "block text-sm font-medium text-gray-700"
    label.textContent = field.label
    if (field.required) {
      label.innerHTML += ' <span class="text-red-500" aria-label="required">*</span>'
    }

    let input
    switch (field.type) {
      case "select":
        input = document.createElement("select")
        input.className =
          "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"

        const defaultOption = document.createElement("option")
        defaultOption.value = ""
        defaultOption.textContent = `Select ${field.label.toLowerCase()}`
        input.appendChild(defaultOption)

        field.options.forEach((option) => {
          const optionElement = document.createElement("option")
          optionElement.value = option.toLowerCase().replace(/\s+/g, "-")
          optionElement.textContent = option
          input.appendChild(optionElement)
        })
        break

      case "textarea":
        input = document.createElement("textarea")
        input.className =
          "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
        input.rows = 4
        if (field.placeholder) input.placeholder = field.placeholder
        break

      case "range":
        const rangeContainer = document.createElement("div")
        rangeContainer.className = "space-y-2"

        input = document.createElement("input")
        input.type = "range"
        input.min = field.min
        input.max = field.max
        input.step = field.step
        input.value = field.default || field.min
        input.className = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"

        const valueDisplay = document.createElement("div")
        valueDisplay.className = "text-sm text-gray-600 text-center"
        valueDisplay.textContent = `${field.label}: ${input.value}`

        input.addEventListener("input", () => {
          valueDisplay.textContent = `${field.label}: ${input.value}`
          this.updateFormData(field.name, input.value)
        })

        rangeContainer.appendChild(input)
        rangeContainer.appendChild(valueDisplay)

        fieldContainer.appendChild(label)
        fieldContainer.appendChild(rangeContainer)
        return fieldContainer

      default:
        input = document.createElement("input")
        input.type = field.type || "text"
        input.className =
          "w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
        if (field.placeholder) input.placeholder = field.placeholder
    }

    input.id = field.name
    input.name = field.name
    if (field.required) {
      input.required = true
      input.setAttribute("aria-required", "true")
    }

    input.addEventListener("input", () => this.updateFormData(field.name, input.value))
    input.addEventListener("change", () => this.updateFormData(field.name, input.value))

    fieldContainer.appendChild(label)
    fieldContainer.appendChild(input)

    // Add error message container
    const errorContainer = document.createElement("div")
    errorContainer.className = "error-message hidden"
    errorContainer.id = `${field.name}-error`
    fieldContainer.appendChild(errorContainer)

    return fieldContainer
  }

  updateFormData(fieldName, value) {
    this.formData[fieldName] = value
    this.updatePreview()
    this.validateField(fieldName, value)
  }

  validateField(fieldName, value) {
    const field = this.currentCategory.fields.find((f) => f.name === fieldName)
    const input = document.getElementById(fieldName)
    const errorContainer = document.getElementById(`${fieldName}-error`)

    let isValid = true
    let errorMessage = ""

    if (field.required && (!value || value.trim() === "")) {
      isValid = false
      errorMessage = `${field.label} is required`
    }

    if (isValid) {
      input.classList.remove("form-error")
      errorContainer.classList.add("hidden")
    } else {
      input.classList.add("form-error")
      errorContainer.textContent = errorMessage
      errorContainer.classList.remove("hidden")
    }

    return isValid
  }

  validateForm() {
    if (!this.currentCategory) return true

    let isFormValid = true
    this.currentCategory.fields.forEach((field) => {
      const value = this.formData[field.name] || ""
      const fieldValid = this.validateField(field.name, value)
      if (!fieldValid) isFormValid = false
    })

    const generateBtn = document.getElementById("generate-prompt-btn")
    generateBtn.disabled = !isFormValid

    return isFormValid
  }

  updatePreview() {
    const filledFields = Object.keys(this.formData).filter((key) => this.formData[key]?.trim())
    const totalFields = this.currentCategory ? this.currentCategory.fields.length : 1
    const completeness = Math.round((filledFields.length / totalFields) * 100)
    const estimatedLength = Math.max(200, filledFields.length * 50)
    const complexity = filledFields.length > 3 ? "Advanced" : filledFields.length > 1 ? "Intermediate" : "Basic"

    document.getElementById("completeness-percent").textContent = `${completeness}%`
    document.getElementById("estimated-length").textContent = estimatedLength

    const complexityBadge = document.getElementById("complexity-badge")
    complexityBadge.textContent = complexity
    complexityBadge.className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      complexity === "Advanced"
        ? "bg-green-100 text-green-800"
        : complexity === "Intermediate"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
    }`

    // Update optimization tips
    const tipsContainer = document.getElementById("optimization-tips")
    const tips = []

    if (completeness < 50) {
      tips.push("• Fill in more fields for a more detailed prompt")
    }
    if (!this.formData.description && this.currentCategory?.fields.some((f) => f.name === "description")) {
      tips.push("• Add a detailed description for better results")
    }
    if (completeness >= 80) {
      tips.push("• Great! Your prompt will be highly detailed and specific")
    }
    if (tips.length === 0) {
      tips.push("• Your prompt is looking good! Consider adding more details for even better results")
    }

    tipsContainer.innerHTML = tips.join("\n")
  }

  async generatePrompt() {
    if (!this.validateForm()) {
      this.showToast("Validation Error", "Please fill in all required fields", "error")
      return
    }

    const generateBtn = document.getElementById("generate-prompt-btn")
    const btnText = document.getElementById("generate-btn-text")
    const loadingOverlay = document.getElementById("loading-overlay")

    // Show loading state
    generateBtn.disabled = true
    btnText.textContent = "Generating..."
    loadingOverlay.classList.remove("hidden")
    loadingOverlay.classList.add("flex")

    try {
      // Simulate AI generation delay
      await new Promise((resolve) => setTimeout(resolve, 2500))

      this.generatedPrompt = this.createAdvancedPrompt()

      // Display the generated prompt
      document.getElementById("generated-prompt-text").value = this.generatedPrompt
      document.getElementById("generated-prompt-section").classList.remove("hidden")

      // Scroll to the generated prompt
      document.getElementById("generated-prompt-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      this.showToast("Success!", "Your AI-optimized prompt has been generated", "success")
    } catch (error) {
      console.error("Error generating prompt:", error)
      this.showToast("Error", "Failed to generate prompt. Please try again.", "error")
    } finally {
      // Reset button state
      generateBtn.disabled = false
      btnText.textContent = "Generate Prompt"
      loadingOverlay.classList.add("hidden")
      loadingOverlay.classList.remove("flex")
    }
  }

  createAdvancedPrompt() {
    const templates = {
      "photo-generation": `Create a detailed ${this.formData.platform || "AI image generation"} prompt for generating high-quality images.

**Image Specifications:**
- Platform: ${this.formData.platform || "Universal AI"}
- Art Style: ${this.formData.style || "Photorealistic"}
- Main Subject: ${this.formData.subject || "Not specified"}
- Mood/Atmosphere: ${this.formData.mood || "Balanced"}
- Lighting: ${this.formData.lighting || "Natural"}
- Composition: ${this.formData.composition || "Standard"}
- Color Palette: ${this.formData.colors || "Natural colors"}
- Quality: ${this.formData.quality || "High quality"}

**Additional Details:**
${this.formData.details || "Standard composition"}

**Generate a comprehensive prompt that includes:**
1. **Main Prompt**: Detailed description optimized for ${this.formData.platform || "AI image generation"}
2. **Technical Parameters**: Recommended settings, aspect ratios, and quality modifiers
3. **Style Modifiers**: Specific artistic techniques and visual elements
4. **Negative Prompts**: What to avoid in the generation
5. **Alternative Variations**: 3-5 prompt variations for different results
6. **Platform-Specific Tips**: Best practices for ${this.formData.platform || "your chosen platform"}

**Format the output as:**
- Clear, descriptive language
- Comma-separated keywords and phrases
- Technical parameters in brackets
- Weight modifiers where applicable

Make the prompt highly detailed and optimized for professional-quality image generation.`,

      "resume-builder": `You are a professional career coach and ATS optimization expert. Create comprehensive resume content for:

**Position Details:**
- Target Role: ${this.formData.targetRole || "Not specified"}
- Industry: ${this.formData.industry || "Not specified"}
- Experience Level: ${this.formData.experienceLevel || "Not specified"}
- Company Size: ${this.formData.companySize || "Any size"}
- Job Type: ${this.formData.jobType || "Full-time"}
- Education: ${this.formData.education || "Not specified"}

**Candidate Profile:**
- Key Skills: ${this.formData.keySkills || "Not specified"}
- Major Achievements: ${this.formData.achievements || "Not specified"}
- Work History: ${this.formData.workHistory || "Not specified"}
- Special Requirements: ${this.formData.specialRequests || "None"}

**Resume Type:** ${this.formData.resumeType || "Professional Resume"}

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

      coding: `You are a senior software engineer and code mentor with expertise in ${this.formData.language || "multiple programming languages"}.

**Context:**
- Programming Language: ${this.formData.language || "Not specified"}
- Problem Type: ${this.formData.problemType || "General coding"}
- Skill Level: ${this.formData.skillLevel || "Intermediate"}
- Specific Requirements: ${this.formData.requirements || "None specified"}

**Task:**
${this.formData.description || "Provide coding assistance"}

**Please provide:**
1. **Solution**: Clean, well-commented code that follows best practices
2. **Explanation**: Step-by-step breakdown of the approach
3. **Optimization**: Performance considerations and potential improvements
4. **Testing**: Suggest test cases and edge cases to consider
5. **Best Practices**: Industry standards and conventions to follow
6. **Alternative Approaches**: Different ways to solve the same problem

**Additional Requirements:**
- Use clear variable names and proper code structure
- Include error handling where appropriate
- Explain any complex algorithms or logic
- Provide examples of usage if applicable`,

      writing: `You are a professional content strategist and copywriter with expertise in ${this.formData.contentType || "various content formats"}.

**Content Brief:**
- Content Type: ${this.formData.contentType || "Not specified"}
- Target Audience: ${this.formData.audience || "General audience"}
- Tone: ${this.formData.tone || "Professional"}
- Word Count: ${this.formData.wordCount || "Flexible"}
- SEO Keywords: ${this.formData.keywords || "None specified"}

**Objective:**
${this.formData.objective || "Create engaging content"}

**Please deliver:**
1. **Compelling Headline**: 3-5 attention-grabbing title options
2. **Content Structure**: Detailed outline with main points
3. **Opening Hook**: Engaging introduction that captures attention
4. **Main Content**: Well-researched, valuable information
5. **Call-to-Action**: Clear next steps for readers
6. **SEO Optimization**: Natural keyword integration and meta description
7. **Engagement Elements**: Questions, statistics, or interactive elements

**Style Guidelines:**
- Match the specified tone throughout
- Use active voice and clear, concise language
- Include relevant examples and case studies
- Ensure content is scannable with headers and bullet points`,

      business: `You are a senior business consultant and strategic advisor with expertise in ${this.formData.industry || "business strategy"}.

**Business Context:**
- Industry: ${this.formData.industry || "Not specified"}
- Business Stage: ${this.formData.stage || "Not specified"}
- Target Market: ${this.formData.targetMarket || "Not specified"}
- Key Challenges: ${this.formData.challenges || "Not specified"}
- Goals: ${this.formData.goals || "Not specified"}

**Consultation Request:**
${this.formData.request || "Provide business guidance"}

**Please provide:**
1. **Situation Analysis**: Current state assessment and key insights
2. **Strategic Recommendations**: Actionable strategies and tactics
3. **Implementation Plan**: Step-by-step execution roadmap
4. **Risk Assessment**: Potential challenges and mitigation strategies
5. **Success Metrics**: KPIs and measurement frameworks
6. **Resource Requirements**: Budget, team, and tool considerations
7. **Timeline**: Realistic milestones and deadlines

**Deliverable Format:**
- Executive summary for stakeholders
- Detailed analysis with supporting data
- Visual frameworks where applicable
- Next steps and action items`,

      marketing: `You are a senior marketing strategist and growth expert specializing in ${this.formData.marketingChannel || "digital marketing"}.

**Campaign Brief:**
- Marketing Channel: ${this.formData.marketingChannel || "Multi-channel"}
- Target Audience: ${this.formData.targetAudience || "Not specified"}
- Campaign Objective: ${this.formData.objective || "Brand awareness"}
- Budget Range: ${this.formData.budget || "Flexible"}
- Timeline: ${this.formData.timeline || "Not specified"}

**Challenge:**
${this.formData.challenge || "Develop marketing strategy"}

**Please create:**
1. **Campaign Strategy**: Overall approach and positioning
2. **Target Audience Analysis**: Demographics, psychographics, and behaviors
3. **Channel Strategy**: Platform selection and content adaptation
4. **Content Calendar**: Posting schedule and content themes
5. **Creative Concepts**: Ad copy, visuals, and messaging variations
6. **Performance Metrics**: KPIs and tracking mechanisms
7. **Budget Allocation**: Resource distribution across channels
8. **A/B Testing Plan**: Optimization and iteration strategy

**Success Criteria:**
- Measurable ROI and conversion goals
- Brand awareness and engagement metrics
- Customer acquisition and retention targets`,
    }

    return (
      templates[this.currentCategory.id] ||
      `You are an expert assistant specializing in ${this.currentCategory.title}. Please help with: ${this.formData.description || "the requested task"}.`
    )
  }

  async copyPrompt() {
    try {
      await navigator.clipboard.writeText(this.generatedPrompt)

      const copyBtn = document.getElementById("copy-prompt-btn")
      const copyBtnText = document.getElementById("copy-btn-text")
      const originalText = copyBtnText.textContent

      copyBtnText.textContent = "Copied!"
      copyBtn.classList.add("bg-green-50", "border-green-300", "text-green-700")

      setTimeout(() => {
        copyBtnText.textContent = originalText
        copyBtn.classList.remove("bg-green-50", "border-green-300", "text-green-700")
      }, 2000)

      this.showToast("Copied!", "Prompt copied to clipboard", "success")
    } catch (error) {
      console.error("Failed to copy:", error)
      this.showToast("Error", "Failed to copy prompt", "error")
    }
  }

  savePrompt() {
    if (!this.generatedPrompt) return

    const promptData = {
      id: Date.now().toString(),
      prompt: this.generatedPrompt,
      category: this.currentCategory.id,
      categoryTitle: this.currentCategory.title,
      tags: Object.keys(this.formData).filter((key) => this.formData[key]),
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      formData: { ...this.formData },
    }

    // Check for duplicates
    const isDuplicate = this.savedPrompts.some((p) => p.prompt === this.generatedPrompt)
    if (isDuplicate) {
      this.showToast("Already saved", "This prompt is already in your library", "error")
      return
    }

    this.savedPrompts.unshift(promptData)
    this.updateAnalytics("save")
    this.saveToStorage()
    this.updateStats()

    this.showToast("Saved!", "Prompt saved to your library", "success")
  }

  tryInChatGPT() {
    if (!this.generatedPrompt) return

    this.updateAnalytics("usage")
    const encodedPrompt = encodeURIComponent(this.generatedPrompt)
    window.open(`https://chat.openai.com/?q=${encodedPrompt}`, "_blank")

    this.showToast("Opening ChatGPT", "Your prompt is ready to use!", "success")
  }

  updateAnalytics(action) {
    const today = new Date().toISOString().split("T")[0]

    switch (action) {
      case "save":
        this.analytics.totalPrompts = this.savedPrompts.length
        this.analytics.categoriesUsed[this.currentCategory.id] =
          (this.analytics.categoriesUsed[this.currentCategory.id] || 0) + 1
        break
      case "usage":
        this.analytics.totalUsage += 1
        this.analytics.dailyUsage[today] = (this.analytics.dailyUsage[today] || 0) + 1
        break
    }

    this.analytics.favoritePrompts = this.savedPrompts.filter((p) => p.isFavorite).length
    this.saveToStorage()
  }

  updateStats() {
    document.getElementById("prompt-count").textContent = `${this.savedPrompts.length} Prompts`
    document.getElementById("usage-count").textContent = `${this.analytics.totalUsage} Uses`
    document.getElementById("mobile-prompt-count").textContent = `${this.savedPrompts.length} Prompts`
    document.getElementById("mobile-usage-count").textContent = `${this.analytics.totalUsage} Uses`
  }

  exportData() {
    const exportData = {
      prompts: this.savedPrompts,
      analytics: this.analytics,
      settings: this.settings,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `promptpal-backup-${new Date().toISOString().split("T")[0]}.json`
    link.click()

    URL.revokeObjectURL(url)
    this.showToast("Exported!", "Your data has been downloaded", "success")
  }

  toggleDarkMode() {
    this.settings.darkMode = !this.settings.darkMode
    document.body.classList.toggle("dark", this.settings.darkMode)
    document.getElementById("theme-toggle").checked = this.settings.darkMode
    this.saveToStorage()

    this.showToast(
      this.settings.darkMode ? "Dark mode enabled" : "Light mode enabled",
      "Theme preference saved",
      "success",
    )
  }

  updateSetting(key, value) {
    this.settings[key] = value
    this.saveToStorage()
    this.showToast("Settings updated", `${key} preference saved`, "success")
  }

  loadSettings() {
    document.getElementById("autosave-toggle").checked = this.settings.autoSave
    document.getElementById("analytics-toggle").checked = this.settings.showAnalytics
    document.getElementById("theme-toggle").checked = this.settings.darkMode

    if (this.settings.darkMode) {
      document.body.classList.add("dark")
    }
  }

  handleKeyboardNavigation(e) {
    // Tab navigation
    if (e.key === "Tab") {
      // Let browser handle default tab behavior
      return
    }

    // Arrow key navigation for category grid
    if (document.activeElement?.classList.contains("category-card")) {
      const cards = Array.from(document.querySelectorAll(".category-card"))
      const currentIndex = cards.indexOf(document.activeElement)

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          const nextIndex = (currentIndex + 1) % cards.length
          cards[nextIndex].focus()
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          const prevIndex = (currentIndex - 1 + cards.length) % cards.length
          cards[prevIndex].focus()
          break
      }
    }

    // Escape key to go back
    if (e.key === "Escape" && this.currentCategory) {
      this.showCategorySelection()
    }
  }

  showToast(title, message, type = "success") {
    const toastContainer = document.getElementById("toast-container")
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.setAttribute("role", "alert")
    toast.setAttribute("aria-live", "polite")

    const icon =
      type === "success"
        ? '<svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        : '<svg class="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

    toast.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                    ${icon}
                </div>
                <div class="flex-1">
                    <p class="font-medium text-gray-900">${title}</p>
                    <p class="text-sm text-gray-600">${message}</p>
                </div>
                <button class="flex-shrink-0 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `

    toastContainer.appendChild(toast)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add("removing")
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove()
          }
        }, 300)
      }
    }, 5000)
  }

  loadFromStorage(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error)
      return defaultValue
    }
  }

  saveToStorage() {
    if (!this.settings.autoSave) return

    try {
      localStorage.setItem("promptpal-prompts", JSON.stringify(this.savedPrompts))
      localStorage.setItem("promptpal-analytics", JSON.stringify(this.analytics))
      localStorage.setItem("promptpal-settings", JSON.stringify(this.settings))
    } catch (error) {
      console.error("Error saving to storage:", error)
      this.showToast("Storage Error", "Failed to save data locally", "error")
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.promptPalPro = new PromptPalPro()
})

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
