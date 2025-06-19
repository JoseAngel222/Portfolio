"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Moon, Sun, Github, Linkedin, Mail, Download, Phone, ExternalLink, MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import emailjs from "emailjs-com"

// Translations
import { translations } from "@/translations"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [language, setLanguage] = useState("es") // Default language is Spanish
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const { toast } = useToast()
  const t = translations[language as keyof typeof translations]

  // Initialize dark mode based on user preference
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }
    if (
  !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
  !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
  !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
) {
  console.error(" Variables de entorno no definidas")
  toast({
    title: "Error de configuración",
    description: "No se pudo enviar el mensaje. Variables de entorno faltantes.",
    variant: "destructive",
  })
  return
}

    emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  templateParams,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
)
      .then(() => {
        toast({
          title: "✅ " + t.contactForm.successTitle,
          description: t.contactForm.successMessage,
        })
        setFormData({ name: "", email: "", message: "" })
      })
      .catch((error) => {
        toast({
          title: "❌ " + t.contactForm.errorTitle,
          description: t.contactForm.errorMessage,
          variant: "destructive",
        })
        console.error("Error al enviar con EmailJS:", error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const frontendSkills = ["JavaScript", "React", "HTML5", "CSS3", "Thymeleaf", "Bootstrap"]
  const backendSkills = ["Java", "Spring Boot", "C#", ".Net", "SQL", "REST APIs"]
  const toolsSkills = ["Docker", "Azure DevOps", "Git", "JUnit5", "Scrum", "i18n"]

  const projects = [
    {
      title: t.projects[1].title,
      description: t.projects[1].description,
      tech: ["Java", "Thymeleaf", "Bootstrap", "i18n", "JavaScript"],
      role: t.projects[1].role,
      type: t.projects[1].type,
    },
    {
      title: t.projects[2].title,
      description: t.projects[2].description,
      tech: ["Spring Boot", "Java", "JUnit5", "Scrum", "JPA", "APIRest", "PostgreSQL", "React(Vite)", "JWT"],
      role: t.projects[2].role,
      type: t.projects[2].type,
    },
    {
      title: t.projects[0].title,
      description: t.projects[0].description,
      tech: ["Spring Boot", "Java", "JUnit5", "Scrum"],
      role: t.projects[0].role,
      type: t.projects[0].type,
    },
  ]

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center space-y-12 px-4">
        <div className="space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1
              className={`text-5xl md:text-7xl font-extralight tracking-tight mb-6 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
            >
              José Angel López
            </h1>
            <h2
              className={`text-2xl md:text-3xl font-light tracking-wide mb-8 ${darkMode ? "text-blue-200" : "text-blue-700"}`}
            >
              {t.hero.title}
            </h2>
            <div
              className={`flex items-center justify-center space-x-2 text-lg font-medium ${darkMode ? "text-blue-200" : "text-blue-600"}`}
            >
              <MapPin className="h-5 w-5" />
              <span>{t.hero.location}</span>
            </div>
          </div>

          <div
            className={`max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed font-light ${darkMode ? "text-blue-100" : "text-gray-700"}`}
          >
            <p>{t.hero.bio1}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/JoseAngel_CV.pdf"
                link.download = "JoseAngel_CV.pdf"
                link.click()
              }}
              className={`font-medium tracking-wide ${
                darkMode
                  ? "bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              } backdrop-blur-sm`}
            >
              <Download className="mr-2 h-5 w-5" />
              {t.buttons.downloadCV}
            </Button>
            <Button
              size="lg"
              onClick={() => setActiveSection("contact")}
              className={`font-medium tracking-wide ${
                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-700 text-white hover:bg-blue-800"
              } backdrop-blur-sm border-0`}
            >
              {t.buttons.contactMe}
            </Button>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/JoseAngel222" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className={`${darkMode ? "text-blue-300 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-100"}`}
              >
                <Github className="h-6 w-6" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/jos%C3%A9-angel-l%C3%B3pez-morales-61b768260/?trk=opento_sprofile_pfeditor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className={`${darkMode ? "text-blue-300 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-100"}`}
              >
                <Linkedin className="h-6 w-6" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveSection("contact")}
              className={`${darkMode ? "text-blue-300 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-100"}`}
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-extralight tracking-tight text-center mb-16 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
          >
            {t.skills.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className={`text-xl font-medium tracking-wide ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                Frontend
              </h3>
              <ul className="space-y-3">
                {frontendSkills.map((skill, index) => (
                  <li
                    key={index}
                    className={`font-light tracking-wide ${darkMode ? "text-blue-100" : "text-gray-700"} hover:${darkMode ? "text-blue-200" : "text-blue-800"} transition-colors cursor-default`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className={`text-xl font-medium tracking-wide ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                Backend
              </h3>
              <ul className="space-y-3">
                {backendSkills.map((skill, index) => (
                  <li
                    key={index}
                    className={`font-light tracking-wide ${darkMode ? "text-blue-100" : "text-gray-700"} hover:${darkMode ? "text-blue-200" : "text-blue-800"} transition-colors cursor-default`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className={`text-xl font-medium tracking-wide ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                {t.skills.tools}
              </h3>
              <ul className="space-y-3">
                {toolsSkills.map((skill, index) => (
                  <li
                    key={index}
                    className={`font-light tracking-wide ${darkMode ? "text-blue-100" : "text-gray-700"} hover:${darkMode ? "text-blue-200" : "text-blue-800"} transition-colors cursor-default`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Preview */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-extralight tracking-tight mb-6 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
            >
              {t.projectsSection.title}
            </h2>
            <p className={`text-xl font-light max-w-3xl mx-auto ${darkMode ? "text-blue-100" : "text-gray-700"}`}>
              {t.projectsSection.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`${
                  darkMode
                    ? "bg-blue-900/20 border-blue-400/20 hover:bg-blue-900/30"
                    : "bg-blue-50/80 border-blue-200 hover:bg-blue-50"
                } backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium tracking-wide ${
                          darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>
                    <h3 className={`text-xl font-medium tracking-wide ${darkMode ? "text-blue-300" : "text-blue-800"}`}>
                      {project.title}
                    </h3>
                  </div>

                  <p className={`${darkMode ? "text-blue-100" : "text-gray-700"} leading-relaxed text-sm font-light`}>
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <p className={`text-xs font-medium tracking-wide ${darkMode ? "text-blue-200" : "text-blue-600"}`}>
                      {project.role}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 text-xs rounded font-medium tracking-wide ${
                            darkMode
                              ? "bg-blue-500/10 text-blue-200 border border-blue-400/20"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setActiveSection("portfolio")}
              className={`font-medium tracking-wide ${
                darkMode
                  ? "border-blue-400/30 text-blue-300 hover:bg-blue-500/10"
                  : "border-blue-300 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {t.buttons.viewAllProjects}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPortfolio = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-extralight tracking-tight mb-6 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
          >
            {t.portfolio.title}
          </h1>
          <p className={`text-xl font-light max-w-3xl mx-auto ${darkMode ? "text-blue-100" : "text-gray-700"}`}>
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`${
                darkMode ? "bg-blue-900/20 border-blue-400/20" : "bg-blue-50/80 border-blue-200"
              } backdrop-blur-sm`}
            >
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide ${
                            darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {project.type}
                        </span>
                        <span
                          className={`text-sm font-medium tracking-wide ${darkMode ? "text-blue-200" : "text-blue-600"}`}
                        >
                          {project.role}
                        </span>
                      </div>
                      <h2
                        className={`text-2xl md:text-3xl font-extralight tracking-tight ${darkMode ? "text-blue-300" : "text-blue-800"}`}
                      >
                        {project.title}
                      </h2>
                    </div>

                    <p className={`${darkMode ? "text-blue-100" : "text-gray-700"} leading-relaxed text-lg font-light`}>
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4
                        className={`text-sm font-medium tracking-wide mb-3 ${darkMode ? "text-blue-200" : "text-blue-700"}`}
                      >
                        {t.portfolio.technologies}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-sm rounded font-medium tracking-wide ${
                              darkMode
                                ? "bg-blue-500/10 text-blue-200 border border-blue-400/20"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-extralight tracking-tight mb-6 ${darkMode ? "text-blue-300" : "text-blue-800"}`}
          >
            {t.contact.title}
          </h1>
          <p className={`text-xl font-light ${darkMode ? "text-blue-100" : "text-gray-700"}`}>{t.contact.subtitle}</p>
        </div>

        <Card
          className={`${
            darkMode ? "bg-blue-900/20 border-blue-400/20" : "bg-blue-50/80 border-blue-200"
          } backdrop-blur-sm`}
        >
          <CardContent className="p-8">
            <div className="space-y-6 mb-8">
              <div
                className={`flex items-center space-x-3 font-medium ${darkMode ? "text-blue-100" : "text-gray-700"}`}
              >
                <Mail className="h-5 w-5" />
                <span>Ljoseangel265@gmail.com</span>
              </div>
              <div
                className={`flex items-center space-x-3 font-medium ${darkMode ? "text-blue-100" : "text-gray-700"}`}
              >
                <Phone className="h-5 w-5" />
                <span>640879374</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder={t.contactForm.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`font-light ${
                    darkMode
                      ? "bg-blue-900/20 border-blue-400/20 text-blue-100 placeholder:text-blue-300/50"
                      : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                  required
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  placeholder={t.contactForm.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`font-light ${
                    darkMode
                      ? "bg-blue-900/20 border-blue-400/20 text-blue-100 placeholder:text-blue-300/50"
                      : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500"
                  }`}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Textarea
                placeholder={t.contactForm.messagePlaceholder}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`font-light ${
                  darkMode
                    ? "bg-blue-900/20 border-blue-400/20 text-blue-100 placeholder:text-blue-300/50"
                    : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500"
                }`}
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium tracking-wide ${
                  darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-700 text-white hover:bg-blue-800"
                } backdrop-blur-sm border-0 disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === "es" ? "Enviando..." : "Sending..."}
                  </>
                ) : (
                  t.contactForm.submitButton
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className={`relative ${darkMode ? "dark" : ""}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-100" : "opacity-100"}`}
          style={{
            backgroundImage: darkMode
              ? `linear-gradient(45deg, #1e293b, #334155, #475569, #1e293b)`
              : `linear-gradient(45deg, #dbeafe, #e0f2fe, #eff6ff, #dbeafe)`,
            backgroundSize: "400% 400%",
            animation: "gradientShift 20s ease infinite",
          }}
        />
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? "bg-blue-400/5" : "bg-blue-500/5"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                animation: `float ${Math.random() * 25 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${
          darkMode ? "bg-slate-900/80 border-blue-400/10" : "bg-white/80 border-blue-200/50"
        } backdrop-blur-md border-b`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {[
                { key: "home", label: t.navigation.home },
                { key: "portfolio", label: t.navigation.portfolio },
                { key: "contact", label: t.navigation.contact },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`font-medium tracking-wide transition-all duration-300 ${
                    activeSection === key
                      ? darkMode
                        ? "text-blue-400 border-b-2 border-blue-400/50 pb-1"
                        : "text-blue-800 border-b-2 border-blue-400/50 pb-1"
                      : darkMode
                        ? "text-blue-200 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${darkMode ? "text-blue-300 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-100"}`}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="font-medium">
                  <DropdownMenuItem onClick={() => changeLanguage("es")}>Español</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={`${darkMode ? "text-blue-300 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-100"}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {activeSection === "home" && renderHome()}
        {activeSection === "portfolio" && renderPortfolio()}
        {activeSection === "contact" && renderContact()}
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 py-8 border-t ${
          darkMode ? "bg-slate-900/80 border-blue-400/10 text-blue-200" : "bg-white/80 border-blue-200/50 text-blue-700"
        } backdrop-blur-md`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="font-medium tracking-wide">
            © {new Date().getFullYear()} José Angel López. {t.footer.copyright}
          </p>
          <p className="text-sm mt-2 opacity-70 font-light">{t.footer.rights}</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }
      `}</style>
    </div>
  )
}
