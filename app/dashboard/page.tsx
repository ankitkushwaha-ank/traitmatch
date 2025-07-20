"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"

import Link from "next/link"
import {
  Target,
  Award,
  TrendingUp,
  Calendar,
  BookOpen,
  MessageCircle,
  Brain,
  Star,
  ArrowRight,
  Download,
  Share2,
  Zap,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatBot } from "@/components/chat-bot"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Dashboard() {
  const [userName, setUserName] = useState("User")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [progress, setProgress] = useState(0)
    const [userId, setUserId] = useState<string | null>(null)



// const handleDownloadPDF = () => {
//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "pt",
//     format: "a4",
//   })

//   let y = 50

//   // Title
//   pdf.setFontSize(22)
//   pdf.text("Personality Survey Report", 40, y)
//   y += 40

//   // Subtitle
//   pdf.setFontSize(14)
//   pdf.text(`Name: ${userName}`, 40, y)
//   y += 30

//   // Section: Personality Traits
//   pdf.setFontSize(16)
//   pdf.text("Your Personality Results", 40, y)
//   y += 28

//   personalityResults.traits.forEach((trait) => {
//     // Trait Name and Score
//     pdf.setFontSize(13)
//     pdf.setTextColor(40, 40, 40)
//     pdf.text(`${trait.name}`, 40, y)
//     pdf.setFontSize(13)
//     pdf.setTextColor(80, 80, 160)
//     pdf.text(`${trait.score}%`, 480, y, { align: "right" })
//     y += 18

//     // Progress bar (drawn as a filled rectangle)
//     const barX = 40
//     const barY = y
//     const barWidth = 400
//     const barHeight = 8
//     const fillWidth = (trait.score / 100) * barWidth

//     pdf.setFillColor(230, 230, 240) // light background
//     pdf.rect(barX, barY, barWidth, barHeight, "F")
//     pdf.setFillColor(30, 32, 50) // dark bar
//     pdf.rect(barX, barY, fillWidth, barHeight, "F")
//     y += barHeight + 8

//     // Description
//     pdf.setFontSize(11)
//     pdf.setTextColor(90, 90, 90)
//     pdf.text(trait.description, 40, y)
//     y += 24
//   })

//   // Save the PDF
//   pdf.save("personality-survey-report.pdf")
// }

const handleShareResults = async () => {
  if (navigator.share) {
    // Use the Web Share API (works on mobile and some desktop browsers)
    await navigator.share({
      title: "My Personality Results",
      text: "Check out my personality assessment results!",
      url: window.location.href,
    })
  } else {
    // Fallback: copy link to clipboard
    await navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }
}

  useEffect(() => {
    const userData = sessionStorage.getItem("user")


    if (!userData || userData === "undefined") {
      router.replace("/signin")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      if (parsedUser?.name) {
        setUserName(parsedUser.name)
      }
    } catch (err) {
      console.error("Failed to parse user from sessionStorage:", err)
      sessionStorage.removeItem("user")
      router.replace("/signin")
    }

    setLoading(false)

      const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUserId(parsed._id)
      } catch (err) {
        console.error("Error parsing user from sessionStorage:", err)
      }
    }


  fetch("http://localhost:5000/api/my-profile", {
    headers: { "x-user-id": userData ? JSON.parse(userData)._id : "" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data || typeof data !== "object") {
        console.error("Invalid profile data:", data)
        return
      }

      setUserData(data)

      // Calculate profile completion %
      const fields = ["avatar_url", "email", "goals", "name", "phone", "status"]
      const filled = fields.filter(
        (field) => data[field] !== undefined && data[field] !== ""
      ).length

      const percentage = Math.round((filled / fields.length) * 100)
      setProgress(percentage)
    })
    .catch((err) => {
      console.error("Error loading profile:", err)
    })

  }, [router])



  
  const quickStats = [
    { icon: BarChart3, label: "Assessments Taken", value: "3", gradient: "from-blue-500 to-indigo-600" },
    { icon: Target, label: "Career Matches", value: "12", gradient: "from-green-500 to-emerald-600" },
    { icon: Award, label: "Completion Rate", value: "85%", gradient: "from-yellow-500 to-orange-600" },
    { icon: TrendingUp, label: "Profile Strength", value: "92%", gradient: "from-purple-500 to-pink-600" },
  ]

  const personalityResults = {
    traits: [
      { name: "Openness", score: 85, description: "Highly creative and open to new experiences", color: "bg-blue-500" },
      { name: "Conscientiousness", score: 92, description: "Very organized and goal-oriented", color: "bg-green-500" },
      { name: "Extraversion", score: 68, description: "Moderately outgoing and social", color: "bg-yellow-500" },
      { name: "Agreeableness", score: 78, description: "Cooperative and trusting", color: "bg-pink-500" },
      { name: "Neuroticism", score: 35, description: "Emotionally stable and calm", color: "bg-purple-500" },
    ],
    strengths: [
      "Creative problem-solving",
      "Strong leadership potential",
      "Excellent analytical skills",
      "Great team collaboration",
      "Adaptable to change",
    ],
    improvements: [
      "Develop public speaking skills",
      "Practice time management",
      "Build networking abilities",
      "Enhance technical skills",
    ],
  }

  const aiMentors = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Product Management",
      experience: "15+ years at Google, Meta",
      rating: 4.9,
      sessions: 1200,
      price: "$150/hour",
      avatar: "/placeholder-user.jpg",
      match: 96,
      expertise: ["Product Strategy", "Team Leadership", "Data Analysis"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Marcus Rodriguez",
      specialty: "UX Design",
      experience: "12+ years at Apple, Airbnb",
      rating: 4.8,
      sessions: 890,
      price: "$120/hour",
      avatar: "/placeholder-user.jpg",
      match: 94,
      expertise: ["User Research", "Design Systems", "Prototyping"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Emily Watson",
      specialty: "Marketing Strategy",
      experience: "10+ years at Nike, Spotify",
      rating: 4.9,
      sessions: 750,
      price: "$130/hour",
      avatar: "/placeholder-user.jpg",
      match: 91,
      expertise: ["Brand Strategy", "Digital Marketing", "Analytics"],
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  const recentActivity = [
    { action: "Completed Advanced Personality Assessment", date: "2 days ago", type: "assessment" },
    { action: "Viewed UX Designer Career Path", date: "1 week ago", type: "career" },
    { action: "Downloaded Career Report", date: "2 weeks ago", type: "download" },
    { action: "Scheduled Mentor Session with Dr. Sarah", date: "3 weeks ago", type: "mentor" },
  ]

  const recommendations = [
    {
      title: "Product Manager",
      description: "Perfect blend of analytical thinking and leadership skills",
      match: 96,
      salary: "$120k - $180k",
      growth: "+22%",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "UX Research Lead",
      description: "Combines creativity with user empathy and data analysis",
      match: 94,
      salary: "$110k - $160k",
      growth: "+18%",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Marketing Strategy Director",
      description: "Creative thinking meets strategic business planning",
      match: 91,
      salary: "$130k - $190k",
      growth: "+15%",
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div initial="initial" animate="animate" variants={staggerContainer} className="mb-12">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Welcome back, {userName}! 👋
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600">
            Here's your career discovery progress and personalized recommendations.
          </motion.p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personality Results */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-neutral-900 mb-6">
                Your Personality Results
              </motion.h2>
              <Tabs defaultValue="traits" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="traits">Personality Traits</TabsTrigger>
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="improvements">Growth Areas</TabsTrigger>
                </TabsList>

                <TabsContent value="traits">
                  <Card className="border-0 shadow-lg rounded-3xl bg-white">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {personalityResults.traits.map((trait, index) => (
                          <motion.div key={trait.name} variants={fadeInUp} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-neutral-900">{trait.name}</h4>
                              <Badge variant="secondary" className="bg-gradient-to-r from-blue-50 to-purple-50">
                                {trait.score}%
                              </Badge>
                            </div>
                            <Progress value={trait.score} className="h-3" />
                            <p className="text-sm text-neutral-600">{trait.description}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button onClick={() => router.push("/personality-results")} className="genz-gradient-1 text-white rounded-2xl">
                          
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                        <Button onClick={handleShareResults} variant="outline" className="rounded-2xl bg-transparent">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="strengths">
                  <Card className="border-0 shadow-lg rounded-3xl bg-white">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {personalityResults.strengths.map((strength, index) => (
                          <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-neutral-900">{strength}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="improvements">
                  <Card className="border-0 shadow-lg rounded-3xl bg-white">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {personalityResults.improvements.map((improvement, index) => (
                          <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-neutral-900">{improvement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Career Recommendations */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-neutral-900 mb-6">
                Recommended Careers for You
              </motion.h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-r from-white to-slate-50 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">{rec.title}</h3>
                            <p className="text-neutral-700 mb-3">{rec.description}</p>
                            <div className="flex gap-4 text-sm text-neutral-600">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {rec.salary}
                              </span>
                              <span className="flex items-center gap-1">
                                <BarChart3 className="w-4 h-4" />
                                Growth: {rec.growth}
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-green-600">{rec.match}%</div>
                            <div className="text-xs text-neutral-600">Match</div>
                          </div>
                        </div>
                        <Progress value={rec.match} className="h-2 bg-neutral-200 mb-4" />
                        <Button
                          className={`bg-gradient-to-r ${rec.gradient} text-white rounded-2xl px-6 py-2 hover:shadow-lg transition-all duration-300`}
                        >
                          Explore Career Path
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Personalized Mentors */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-neutral-900 mb-6">
                AI-Matched Mentors for You
              </motion.h2>
              <div className="grid gap-6">
                {aiMentors.map((mentor, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold">
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-neutral-900">{mentor.name}</h3>
                                <p className="text-purple-600 font-semibold">{mentor.specialty}</p>
                                <p className="text-sm text-neutral-600">{mentor.experience}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{mentor.match}%</div>
                                <div className="text-xs text-neutral-600">AI Match</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="font-semibold">{mentor.rating}</span>
                              </div>
                              <div className="text-sm text-neutral-600">{mentor.sessions} sessions completed</div>
                              <div className="text-sm font-semibold text-green-600">{mentor.price}</div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {mentor.expertise.map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="secondary"
                                  className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex gap-3">
                              <Button
                                className={`bg-gradient-to-r ${mentor.gradient} text-white rounded-2xl px-6 hover:shadow-lg transition-all duration-300`}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Session
                              </Button>
                              <Button variant="outline" className="rounded-2xl bg-transparent">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-neutral-900 mb-6">
                Recent Activity
              </motion.h2>
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-neutral-900">{activity.action}</p>
                          <p className="text-sm text-neutral-600">{activity.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-neutral-900 mb-6">
                Quick Actions
              </motion.h2>
              <div className="space-y-4">
                {[
                  {
                    icon: BarChart3,
                    label: "Take New Assessment",
                    href: "/personality-survey",
                    gradient: "from-blue-500 to-indigo-600",
                  },
                  {
                    icon: BookOpen,
                    label: "Browse Careers",
                    href: "/career-suggestions",
                    gradient: "from-green-500 to-emerald-600",
                  },
                  {
                    icon: Calendar,
                    label: "Schedule Mentor",
                    href: "/mentors",
                    gradient: "from-purple-500 to-pink-600",
                  },
                  {
                    icon: Zap,
                    label: "AI Career Counselor",
                    href: "/ai-chat",
                    gradient: "from-orange-500 to-red-600",
                  },
                ].map((action, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={action.href}>
                      <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                            >
                              <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-medium text-neutral-900">{action.label}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Profile Completion */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-neutral-900">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-neutral-600 mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-neutral-200" />
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">
                    Complete your profile to get more accurate career recommendations and mentor matches.
                  </p>
                  <Link href="/my-profile">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
                      Complete Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-2xl">
                      <p className="text-sm text-neutral-700">
                        <strong>💡 Career Tip:</strong> Your high conscientiousness score suggests you'd excel in
                        project management roles.
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-2xl">
                      <p className="text-sm text-neutral-700">
                        <strong>🎯 Skill Focus:</strong> Consider developing your public speaking skills to unlock
                        leadership opportunities.
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-2xl">
                      <p className="text-sm text-neutral-700">
                        <strong>🚀 Growth Path:</strong> Your personality profile aligns with senior product roles in
                        3-5 years.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  )
}
