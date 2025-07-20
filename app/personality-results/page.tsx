"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChatBot } from "@/components/chat-bot"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Download,
  Share2,
  Brain,
  Heart,
  Zap,
  Target,
  Users,
  TrendingUp,
  BookOpen,
  DollarSign,
  Clock,
  MapPin,
  Award,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Star,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { FeedbackSection } from "@/components/feedback-section"

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

export default function PersonalityResults() {
  const [personalityScores, setPersonalityScores] = useState<any>(null)
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userName, setUserName] = useState("User")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)


const handleDownloadPDF = () => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  })

  let y = 40

  // Title
  pdf.setFontSize(22)
  pdf.text("Personality Survey Report", 40, y)
  y += 30

  // User Name
  pdf.setFontSize(14)
  pdf.text(`Name: ${userName}`, 40, y)
  y += 20

  // Overall Profile
  pdf.setFontSize(16)
  pdf.text("Overall Profile", 40, y)
  y += 18
  pdf.setFontSize(12)
  pdf.text(`Level: ${overallProfile.level}`, 60, y)
  y += 16
  pdf.text(`Description: ${overallProfile.description}`, 60, y)
  y += 24

  // Dominant & Secondary Traits
  pdf.setFontSize(16)
  pdf.text("Dominant Trait", 40, y)
  y += 18
  pdf.setFontSize(12)
  pdf.text(`${dominant.trait} (${dominant.score}%)`, 60, y)
  y += 16
  pdf.text("Secondary Trait", 40, y)
  y += 16
  pdf.text(`${secondary.trait} (${secondary.score}%)`, 60, y)
  y += 24

  // Top Strengths
  pdf.setFontSize(16)
  pdf.text("Top Strengths", 40, y)
  y += 18
  pdf.setFontSize(12)
  personalityTraits
    .filter(trait => trait.score >= 75)
    .forEach(trait => {
      pdf.text(`${trait.trait}: ${trait.strengths.join(", ")}`, 60, y)
      y += 14
    })
  y += 10

  // Growth Opportunities
  pdf.setFontSize(16)
  pdf.text("Growth Opportunities", 40, y)
  y += 18
  pdf.setFontSize(12)
  personalityTraits
    .filter(trait => trait.score < 75)
    .forEach(trait => {
      pdf.text(`${trait.trait}: ${(trait.lackingAreas.length > 0 ? trait.lackingAreas : trait.improvements).slice(0, 2).join(", ")}`, 60, y)
      y += 14
    })
  y += 10

  // Personalized Action Plan
  pdf.setFontSize(16)
  pdf.text("Personalized Action Plan", 40, y)
  y += 18
  pdf.setFontSize(12)
  pdf.text("Immediate Actions:", 60, y)
  y += 14
  personalityTraits
    .filter(trait => trait.score < 70)
    .slice(0, 1)
    .flatMap(trait => trait.lackingAreas.slice(0, 2))
    .forEach(action => {
      pdf.text(`- ${action}`, 80, y)
      y += 12
    })
  y += 8
  pdf.text("Short-term Goals:", 60, y)
  y += 14
  personalityTraits
    .filter(trait => trait.score >= 70 && trait.score < 85)
    .slice(0, 1)
    .flatMap(trait => trait.improvements.slice(0, 2))
    .forEach(goal => {
      pdf.text(`- ${goal}`, 80, y)
      y += 12
    })
  y += 8
  pdf.text("Long-term Vision:", 60, y)
  y += 14
  personalityTraits
    .filter(trait => trait.score >= 80)
    .slice(0, 1)
    .flatMap(trait => trait.recommendations.slice(0, 2))
    .forEach(vision => {
      pdf.text(`- ${vision}`, 80, y)
      y += 12
    })
  y += 16

  // Top 3 Career Matches
  pdf.setFontSize(16)
  pdf.text("Top Career Matches", 40, y)
  y += 18
  pdf.setFontSize(12)
  careerRecommendations.slice(0, 3).forEach(career => {
    pdf.text(`${career.title} (${career.match}% match): ${career.description}`, 60, y)
    y += 16
  })

  pdf.save("personality-survey-report.pdf")
}

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
    const scores = localStorage.getItem("personalityScores")
     const userData = sessionStorage.getItem("user")

    if (scores) {
      setPersonalityScores(JSON.parse(scores))
    } else {
      // Default scores for demo
      setPersonalityScores({
        openness: 85,
        conscientiousness: 72,
        extraversion: 68,
        agreeableness: 78,
        neuroticism: 35,
      })
    }


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
  }, [])

  if (!personalityScores) return <div>Loading...</div>

  const personalityTraits = [
    {
      trait: "Openness",
      score: personalityScores.openness,
      description: "Your creativity and openness to new experiences",
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
      strengths: ["Creative thinking", "Adaptability", "Curiosity", "Innovation"],
      improvements: [
        "Focus on practical applications of creative ideas",
        "Balance innovation with execution and follow-through",
        "Set structured goals for creative projects",
        "Practice turning ideas into actionable plans",
      ],
      lackingAreas:
        personalityScores.openness < 70
          ? [
              "Try new experiences regularly",
              "Explore different perspectives and viewpoints",
              "Engage in creative hobbies or activities",
              "Read diverse books and materials",
            ]
          : [],
      recommendations:
        personalityScores.openness >= 80
          ? [
              "Consider careers in design, research, or innovation",
              "Lead creative projects in your current role",
              "Mentor others in creative thinking",
              "Start a side project or creative venture",
            ]
          : [
              "Take on more creative tasks at work",
              "Join brainstorming sessions and contribute ideas",
              "Learn new skills outside your comfort zone",
              "Practice creative problem-solving techniques",
            ],
    },
    {
      trait: "Conscientiousness",
      score: personalityScores.conscientiousness,
      description: "Your organization and goal-oriented nature",
      icon: Target,
      color: "from-green-500 to-emerald-600",
      strengths: ["Reliability", "Planning", "Attention to detail", "Self-discipline"],
      improvements: [
        "Allow flexibility in plans when circumstances change",
        "Embrace spontaneity occasionally for better work-life balance",
        "Delegate tasks when appropriate to avoid burnout",
        "Practice saying no to overcommitment",
      ],
      lackingAreas:
        personalityScores.conscientiousness < 70
          ? [
              "Use task management tools and calendars",
              "Set specific, measurable goals",
              "Create daily and weekly routines",
              "Practice time-blocking for important tasks",
            ]
          : [],
      recommendations:
        personalityScores.conscientiousness >= 80
          ? [
              "Excel in project management or leadership roles",
              "Become a mentor for organization and planning",
              "Take on complex, long-term projects",
              "Consider roles requiring high attention to detail",
            ]
          : [
              "Improve organizational systems and habits",
              "Set clearer deadlines and stick to them",
              "Break large tasks into smaller, manageable steps",
              "Use productivity techniques like Pomodoro",
            ],
    },
    {
      trait: "Extraversion",
      score: personalityScores.extraversion,
      description: "Your social energy and assertiveness",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      strengths: ["Leadership", "Communication", "Team collaboration", "Networking"],
      improvements: [
        "Practice active listening in conversations",
        "Value quiet reflection time for better decision-making",
        "Develop one-on-one relationship skills",
        "Balance speaking with listening in meetings",
      ],
      lackingAreas:
        personalityScores.extraversion < 70
          ? [
              "Practice public speaking or presentation skills",
              "Join networking events or professional groups",
              "Take on leadership roles in small projects",
              "Engage more in team discussions and meetings",
            ]
          : [],
      recommendations:
        personalityScores.extraversion >= 80
          ? [
              "Pursue leadership and management positions",
              "Excel in sales, marketing, or client-facing roles",
              "Become a team lead or project coordinator",
              "Consider careers in public relations or communications",
            ]
          : [
              "Build confidence in social and professional settings",
              "Practice assertiveness in appropriate situations",
              "Develop networking and relationship-building skills",
              "Take on more visible projects at work",
            ],
    },
    {
      trait: "Agreeableness",
      score: personalityScores.agreeableness,
      description: "Your empathy and cooperation with others",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      strengths: ["Empathy", "Teamwork", "Conflict resolution", "Supportiveness"],
      improvements: [
        "Practice assertiveness when your needs aren't being met",
        "Set healthy boundaries in personal and professional relationships",
        "Learn to say no when necessary without feeling guilty",
        "Balance helping others with self-care",
      ],
      lackingAreas:
        personalityScores.agreeableness < 70
          ? [
              "Practice active listening and empathy",
              "Work on collaborative problem-solving",
              "Show more appreciation for others' contributions",
              "Develop conflict resolution skills",
            ]
          : [],
      recommendations:
        personalityScores.agreeableness >= 80
          ? [
              "Excel in counseling, teaching, or healthcare roles",
              "Become a team mediator or HR professional",
              "Lead diversity and inclusion initiatives",
              "Consider careers in social work or non-profit sector",
            ]
          : [
              "Improve interpersonal and relationship skills",
              "Practice giving constructive feedback kindly",
              "Work on building trust with colleagues",
              "Develop emotional intelligence further",
            ],
    },
    {
      trait: "Emotional Stability",
      score: 100 - personalityScores.neuroticism,
      description: "Your resilience and emotional regulation",
      icon: Users,
      color: "from-purple-500 to-violet-600",
      strengths: ["Stress management", "Emotional balance", "Resilience", "Calm under pressure"],
      improvements: [
        "Develop additional coping strategies for high-stress situations",
        "Practice mindfulness and stress-reduction techniques",
        "Build stronger support networks for challenging times",
        "Learn to recognize early signs of stress or burnout",
      ],
      lackingAreas:
        100 - personalityScores.neuroticism < 70
          ? [
              "Practice stress management techniques daily",
              "Develop emotional regulation strategies",
              "Build resilience through mindfulness or meditation",
              "Seek support when feeling overwhelmed",
            ]
          : [],
      recommendations:
        100 - personalityScores.neuroticism >= 80
          ? [
              "Excel in high-pressure roles like emergency services",
              "Consider leadership positions during crisis situations",
              "Become a mentor for stress management",
              "Pursue careers requiring emotional stability",
            ]
          : [
              "Work on building emotional resilience",
              "Practice stress management techniques",
              "Develop healthy coping mechanisms",
              "Consider therapy or counseling for support",
            ],
    },
  ]

  // Detailed career recommendations based on personality
  const careerRecommendations = [
    {
      id: "ux-designer",
      title: "UX/UI Designer",
      match: Math.round(
        personalityScores.openness * 0.4 +
          personalityScores.conscientiousness * 0.3 +
          personalityScores.agreeableness * 0.3,
      ),
      description: "Perfect blend of creativity, user empathy, and systematic thinking",
      salaryRange: "$65,000 - $130,000",
      growthRate: "13% (Much faster than average)",
      education: {
        degree: "Bachelor's in Design, Psychology, or Computer Science",
        duration: "4 years",
        alternatives: ["Bootcamp (6-12 months)", "Self-taught + Portfolio", "Associate Degree (2 years)"],
      },
      skills: ["User Research", "Prototyping", "Visual Design", "Usability Testing", "Design Systems"],
      universities: [
        {
          name: "Stanford University",
          program: "Human-Computer Interaction",
          duration: "4 years",
          fees: "$56,169/year",
          location: "California, USA",
          ranking: "#1 in Design",
        },
        {
          name: "Carnegie Mellon University",
          program: "Design",
          duration: "4 years",
          fees: "$58,924/year",
          location: "Pennsylvania, USA",
          ranking: "#2 in Design",
        },
        {
          name: "Rhode Island School of Design",
          program: "Graphic Design",
          duration: "4 years",
          fees: "$53,820/year",
          location: "Rhode Island, USA",
          ranking: "#3 in Design",
        },
      ],
      roadmap: [
        {
          phase: "Foundation (Months 1-6)",
          tasks: [
            "Learn design fundamentals and color theory",
            "Master Figma, Sketch, and Adobe Creative Suite",
            "Study user psychology and behavior",
            "Create first 3 design projects for portfolio",
          ],
        },
        {
          phase: "Skill Building (Months 7-18)",
          tasks: [
            "Complete Google UX Design Certificate",
            "Build 5-7 comprehensive case studies",
            "Learn user research methodologies",
            "Practice wireframing and prototyping",
            "Study accessibility and inclusive design",
          ],
        },
        {
          phase: "Professional Entry (Months 19-24)",
          tasks: [
            "Apply for junior UX/UI positions",
            "Network with design professionals",
            "Contribute to open-source design projects",
            "Attend design conferences and workshops",
            "Seek mentorship from senior designers",
          ],
        },
      ],
      personalityFit: {
        openness: "High creativity needed for innovative design solutions",
        conscientiousness: "Systematic approach to user research and testing",
        agreeableness: "Empathy crucial for understanding user needs",
      },
    },
    {
      id: "product-manager",
      title: "Product Manager",
      match: Math.round(
        personalityScores.conscientiousness * 0.4 +
          personalityScores.extraversion * 0.3 +
          personalityScores.agreeableness * 0.3,
      ),
      description: "Strategic leadership combining organization, communication, and user focus",
      salaryRange: "$90,000 - $180,000",
      growthRate: "19% (Much faster than average)",
      education: {
        degree: "Bachelor's in Business, Engineering, or Computer Science + MBA",
        duration: "4 years + 2 years MBA",
        alternatives: [
          "Product Management Bootcamp",
          "Google Product Management Certificate",
          "Internal transition from other roles",
        ],
      },
      skills: [
        "Strategic Planning",
        "Data Analysis",
        "Stakeholder Management",
        "Agile Methodologies",
        "Market Research",
      ],
      universities: [
        {
          name: "Harvard Business School",
          program: "MBA with Product Management Focus",
          duration: "2 years",
          fees: "$73,440/year",
          location: "Massachusetts, USA",
          ranking: "#1 in Business",
        },
        {
          name: "Stanford Graduate School of Business",
          program: "MBA",
          duration: "2 years",
          fees: "$74,706/year",
          location: "California, USA",
          ranking: "#2 in Business",
        },
        {
          name: "UC Berkeley Haas",
          program: "MBA",
          duration: "2 years",
          fees: "$68,444/year",
          location: "California, USA",
          ranking: "#7 in Business",
        },
      ],
      roadmap: [
        {
          phase: "Foundation (Months 1-12)",
          tasks: [
            "Learn product management fundamentals",
            "Study market research and competitive analysis",
            "Understand agile and scrum methodologies",
            "Practice data analysis with SQL and Excel",
            "Build understanding of user experience principles",
          ],
        },
        {
          phase: "Experience Building (Year 2-3)",
          tasks: [
            "Work as Associate Product Manager or similar role",
            "Lead cross-functional projects",
            "Develop product roadmaps and strategies",
            "Master product analytics tools",
            "Build stakeholder management skills",
          ],
        },
        {
          phase: "Senior Role Preparation (Year 4-5)",
          tasks: [
            "Pursue MBA or advanced product management courses",
            "Lead major product launches",
            "Mentor junior team members",
            "Develop expertise in specific industry vertical",
            "Build network of product management professionals",
          ],
        },
      ],
      personalityFit: {
        conscientiousness: "Essential for managing complex product roadmaps",
        extraversion: "Critical for stakeholder communication and team leadership",
        agreeableness: "Important for building consensus and managing conflicts",
      },
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      match: Math.round(
        personalityScores.openness * 0.4 +
          personalityScores.conscientiousness * 0.4 +
          (100 - personalityScores.neuroticism) * 0.2,
      ),
      description: "Analytical problem-solving with creative insights from complex data",
      salaryRange: "$95,000 - $165,000",
      growthRate: "22% (Much faster than average)",
      education: {
        degree: "Bachelor's in Mathematics, Statistics, Computer Science, or related field",
        duration: "4 years",
        alternatives: [
          "Data Science Bootcamp (6-9 months)",
          "Online Master's in Data Science",
          "Self-taught + Kaggle competitions",
        ],
      },
      skills: ["Python/R Programming", "Machine Learning", "Statistical Analysis", "Data Visualization", "SQL"],
      universities: [
        {
          name: "MIT",
          program: "Computer Science with AI/ML Focus",
          duration: "4 years",
          fees: "$53,790/year",
          location: "Massachusetts, USA",
          ranking: "#1 in Computer Science",
        },
        {
          name: "Stanford University",
          program: "Data Science",
          duration: "4 years",
          fees: "$56,169/year",
          location: "California, USA",
          ranking: "#2 in Computer Science",
        },
        {
          name: "University of California, Berkeley",
          program: "Data Science",
          duration: "4 years",
          fees: "$44,007/year",
          location: "California, USA",
          ranking: "#3 in Computer Science",
        },
      ],
      roadmap: [
        {
          phase: "Technical Foundation (Months 1-8)",
          tasks: [
            "Master Python programming and libraries (pandas, numpy, scikit-learn)",
            "Learn SQL for database management",
            "Study statistics and probability theory",
            "Complete online courses in machine learning",
            "Practice with real datasets on Kaggle",
          ],
        },
        {
          phase: "Specialization (Months 9-18)",
          tasks: [
            "Choose specialization (NLP, Computer Vision, etc.)",
            "Build 3-5 comprehensive data science projects",
            "Learn advanced ML techniques and deep learning",
            "Master data visualization tools (Tableau, Power BI)",
            "Contribute to open-source data science projects",
          ],
        },
        {
          phase: "Professional Development (Months 19-30)",
          tasks: [
            "Apply for data scientist positions",
            "Participate in data science competitions",
            "Build professional network in data community",
            "Develop domain expertise in specific industry",
            "Consider advanced degree or specialized certifications",
          ],
        },
      ],
      personalityFit: {
        openness: "Creativity needed for finding insights in complex data",
        conscientiousness: "Systematic approach essential for accurate analysis",
        emotionalStability: "Resilience needed for handling ambiguous problems",
      },
    },
    {
      id: "marketing-director",
      title: "Marketing Director",
      match: Math.round(
        personalityScores.extraversion * 0.4 + personalityScores.openness * 0.3 + personalityScores.agreeableness * 0.3,
      ),
      description: "Creative leadership in brand strategy and customer engagement",
      salaryRange: "$85,000 - $150,000",
      growthRate: "10% (Faster than average)",
      education: {
        degree: "Bachelor's in Marketing, Business, Communications, or related field",
        duration: "4 years",
        alternatives: ["Digital Marketing Bootcamp", "Google Digital Marketing Certificate", "MBA in Marketing"],
      },
      skills: ["Brand Strategy", "Digital Marketing", "Content Creation", "Analytics", "Team Leadership"],
      universities: [
        {
          name: "Northwestern Kellogg",
          program: "Marketing",
          duration: "4 years",
          fees: "$56,232/year",
          location: "Illinois, USA",
          ranking: "#1 in Marketing",
        },
        {
          name: "University of Pennsylvania Wharton",
          program: "Marketing",
          duration: "4 years",
          fees: "$57,770/year",
          location: "Pennsylvania, USA",
          ranking: "#2 in Marketing",
        },
        {
          name: "University of Michigan Ross",
          program: "Marketing",
          duration: "4 years",
          fees: "$51,200/year",
          location: "Michigan, USA",
          ranking: "#3 in Marketing",
        },
      ],
      roadmap: [
        {
          phase: "Marketing Fundamentals (Months 1-6)",
          tasks: [
            "Learn marketing principles and consumer psychology",
            "Master digital marketing channels (SEO, SEM, Social Media)",
            "Study brand management and positioning",
            "Practice with marketing analytics tools",
            "Create personal brand and portfolio",
          ],
        },
        {
          phase: "Experience & Specialization (Year 2-4)",
          tasks: [
            "Work in marketing coordinator or specialist roles",
            "Lead marketing campaigns and measure ROI",
            "Develop expertise in specific marketing channels",
            "Build cross-functional collaboration skills",
            "Study advanced marketing strategies and trends",
          ],
        },
        {
          phase: "Leadership Development (Year 5-7)",
          tasks: [
            "Transition to marketing manager role",
            "Lead marketing teams and budgets",
            "Develop strategic marketing plans",
            "Build relationships with external partners",
            "Pursue advanced marketing certifications or MBA",
          ],
        },
      ],
      personalityFit: {
        extraversion: "Essential for team leadership and external relationship building",
        openness: "Creativity crucial for innovative marketing campaigns",
        agreeableness: "Important for building consensus and managing diverse teams",
      },
    },
  ]

  const getPersonalityInsights = () => {
    const dominant = personalityTraits.reduce((prev, current) => (prev.score > current.score ? prev : current))

    const secondary = personalityTraits
      .filter((trait) => trait.trait !== dominant.trait)
      .reduce((prev, current) => (prev.score > current.score ? prev : current))

    return { dominant, secondary }
  }

  const { dominant, secondary } = getPersonalityInsights()

  const getOverallPersonalityProfile = () => {
    const scores = personalityTraits.map((trait) => trait.score)
    const average = scores.reduce((a, b) => a + b, 0) / scores.length

    if (average >= 80)
      return {
        level: "Exceptional",
        color: "text-green-600",
        description: "You have a very well-balanced and strong personality profile",
      }
    if (average >= 70)
      return {
        level: "Strong",
        color: "text-blue-600",
        description: "You have a solid personality foundation with room for targeted growth",
      }
    if (average >= 60)
      return {
        level: "Developing",
        color: "text-yellow-600",
        description: "You have good potential with several areas for focused improvement",
      }
    return {
      level: "Growing",
      color: "text-orange-600",
      description: "You have significant opportunities for personality development and growth",
    }
  }

  const overallProfile = getOverallPersonalityProfile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        
        <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center mb-12">
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
              <Award className="w-6 h-6" />
              Assessment Complete!
            </div>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6"
          >
            Your Personality Dashboard
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover your unique traits, personalized insights, and actionable recommendations for growth.
          </motion.p>
          <div ref={reportRef}></div>
        </motion.div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-2">
            <TabsTrigger value="dashboard" className="rounded-xl">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="personality" className="rounded-xl">
              Personality Map
            </TabsTrigger>
            <TabsTrigger value="careers" className="rounded-xl">
              Career Matches
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="rounded-xl">
              Career Roadmap
            </TabsTrigger>
            <TabsTrigger value="improvement" className="rounded-xl">
              Growth Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              {/* Overall Profile Summary */}
              <motion.div variants={fadeInUp} className="mb-8">
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white to-purple-50">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Personality Profile</h3>
                      <div className={`text-2xl font-bold ${overallProfile.color} mb-2`}>{overallProfile.level}</div>
                      <p className="text-gray-600 text-lg">{overallProfile.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Dominant Trait</h4>
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${dominant.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        >
                          <dominant.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{dominant.trait}</div>
                        <div className="text-lg text-purple-600 font-semibold">{dominant.score}%</div>
                      </div>

                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Secondary Trait</h4>
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${secondary.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        >
                          <secondary.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{secondary.trait}</div>
                        <div className="text-lg text-blue-600 font-semibold">{secondary.score}%</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        You are primarily <span className="font-bold text-purple-600">{dominant.trait}</span> with
                        strong <span className="font-bold text-blue-600">{secondary.trait}</span> tendencies. This
                        combination makes you well-suited for roles that require both {dominant.trait.toLowerCase()} and{" "}
                        {secondary.trait.toLowerCase()}.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Personalized Insights & Recommendations */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Strengths */}
                <motion.div variants={fadeInUp}>
                  <Card className="border-0 shadow-lg rounded-3xl bg-white h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Your Top Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {personalityTraits
                          .filter((trait) => trait.score >= 75)
                          .map((trait, index) => (
                            <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                              <div className="flex items-center gap-3 mb-2">
                                <div
                                  className={`w-8 h-8 bg-gradient-to-r ${trait.color} rounded-full flex items-center justify-center`}
                                >
                                  <trait.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800">{trait.trait}</h4>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  {trait.score}%
                                </Badge>
                              </div>
                              <div className="ml-11">
                                <div className="flex flex-wrap gap-2">
                                  {trait.strengths.map((strength, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-white rounded-full text-xs font-medium text-green-700"
                                    >
                                      {strength}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Areas for Growth */}
                <motion.div variants={fadeInUp}>
                  <Card className="border-0 shadow-lg rounded-3xl bg-white h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <TrendingUp className="w-6 h-6 text-orange-500" />
                        Growth Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {personalityTraits
                          .filter((trait) => trait.score < 75)
                          .map((trait, index) => (
                            <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl">
                              <div className="flex items-center gap-3 mb-2">
                                <div
                                  className={`w-8 h-8 bg-gradient-to-r ${trait.color} rounded-full flex items-center justify-center`}
                                >
                                  <trait.icon className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800">{trait.trait}</h4>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                  {trait.score}%
                                </Badge>
                              </div>
                              <div className="ml-11">
                                <p className="text-sm text-gray-600 mb-2">Areas to focus on:</p>
                                <div className="space-y-1">
                                  {(trait.lackingAreas.length > 0 ? trait.lackingAreas : trait.improvements)
                                    .slice(0, 2)
                                    .map((area, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <ArrowRight className="w-3 h-3 text-orange-500" />
                                        <span className="text-xs text-gray-700">{area}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Personalized Action Plan */}
              <motion.div variants={fadeInUp} className="mb-8">
                <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Target className="w-6 h-6 text-blue-500" />
                      Your Personalized Action Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Immediate Actions (This Week)</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          {personalityTraits
                            .filter((trait) => trait.score < 70)
                            .slice(0, 1)
                            .flatMap((trait) => trait.lackingAreas.slice(0, 2))
                            .map((action, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{action}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Short-term Goals (This Month)</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          {personalityTraits
                            .filter((trait) => trait.score >= 70 && trait.score < 85)
                            .slice(0, 1)
                            .flatMap((trait) => trait.improvements.slice(0, 2))
                            .map((goal, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Target className="w-3 h-3 text-blue-500" />
                                <span>{goal}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Long-term Vision (3-6 Months)</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          {personalityTraits
                            .filter((trait) => trait.score >= 80)
                            .slice(0, 1)
                            .flatMap((trait) => trait.recommendations.slice(0, 2))
                            .map((vision, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span>{vision}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="personality">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              {/* Personality Overview */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white to-purple-50">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Personality Profile</h3>
                        <p className="text-gray-600">
                          You are primarily <span className="font-bold text-purple-600">{dominant.trait}</span> with
                          strong <span className="font-bold text-blue-600">{secondary.trait}</span> tendencies.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {personalityTraits.map((trait, index) => (
                          <motion.div key={trait.trait} variants={fadeInUp}>
                            <Card className="border-0 shadow-md rounded-2xl bg-white hover:shadow-lg transition-all duration-300 h-full">
                              <CardHeader className="text-center pb-4">
                                <motion.div
                                  className={`w-16 h-16 bg-gradient-to-r ${trait.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  <trait.icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <CardTitle className="text-lg font-bold text-gray-800">{trait.trait}</CardTitle>
                              </CardHeader>
                              <CardContent className="text-center">
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Score</span>
                                    <span>{trait.score}%</span>
                                  </div>
                                  <Progress value={trait.score} className="h-3 bg-gray-200" />
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">{trait.description}</p>
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-sm text-gray-800">Strengths:</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {trait.strengths.map((strength, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {strength}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="careers">
              <motion.div initial="initial" animate="animate" variants={staggerContainer}>
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  Your Top Career Matches
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {careerRecommendations.map((career, index) => (
                    <motion.div
                      key={career.id}
                      variants={fadeInUp}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className="border-0 shadow-lg rounded-3xl bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedCareer(career.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
                              <p className="text-gray-600 mt-1">{career.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">{career.match}%</div>
                              <div className="text-xs text-gray-600">Match</div>
                            </div>
                          </div>

                          <Progress value={career.match} className="h-2 bg-gray-200 mb-4" />

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-500" />
                              <span>{career.salaryRange}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              <span>{career.growthRate}</span>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {career.skills.slice(0, 3).map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="roadmap">
              <motion.div initial="initial" animate="animate" variants={staggerContainer}>
                {selectedCareer ? (
                  <motion.div variants={fadeInUp}>
                    {(() => {
                      const career = careerRecommendations.find((c) => c.id === selectedCareer)!
                      return (
                        <div className="space-y-8">
                          <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Career Roadmap</h2>
                            <h3 className="text-2xl text-purple-600 font-semibold">{career.title}</h3>
                          </div>

                          {/* Education Section */}
                          <Card className="border-0 shadow-lg rounded-3xl bg-white">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-blue-500" />
                                Education Requirements
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Primary Path:</h4>
                                  <p className="text-gray-700 mb-2">{career.education.degree}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{career.education.duration}</span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Alternative Paths:</h4>
                                  <ul className="space-y-1">
                                    {career.education.alternatives.map((alt, idx) => (
                                      <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                        {alt}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Universities */}
                          <Card className="border-0 shadow-lg rounded-3xl bg-white">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Award className="w-6 h-6 text-purple-500" />
                                Top Universities
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-4">
                                {career.universities.map((uni, idx) => (
                                  <div key={idx} className="border rounded-2xl p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-semibold text-lg">{uni.name}</h4>
                                      <Badge variant="secondary">{uni.ranking}</Badge>
                                    </div>
                                    <p className="text-gray-600 mb-2">{uni.program}</p>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{uni.duration}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        <span>{uni.fees}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{uni.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Roadmap Timeline */}
                          <Card className="border-0 shadow-lg rounded-3xl bg-white">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Target className="w-6 h-6 text-green-500" />
                                Step-by-Step Roadmap
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-6">
                                {career.roadmap.map((phase, idx) => (
                                  <div key={idx} className="relative">
                                    <div className="flex items-center gap-4 mb-4">
                                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {idx + 1}
                                      </div>
                                      <h4 className="text-lg font-semibold">{phase.phase}</h4>
                                    </div>
                                    <div className="ml-12 space-y-2">
                                      {phase.tasks.map((task, taskIdx) => (
                                        <div key={taskIdx} className="flex items-start gap-2">
                                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-gray-700">{task}</span>
                                        </div>
                                      ))}
                                    </div>
                                    {idx < career.roadmap.length - 1 && (
                                      <div className="absolute left-4 top-12 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )
                    })()}
                  </motion.div>
                ) : (
                  <motion.div variants={fadeInUp} className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Career</h3>
                    <p className="text-gray-500">
                      Choose a career from the Career Matches tab to see the detailed roadmap.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="improvement">
              <motion.div initial="initial" animate="animate" variants={staggerContainer}>
                <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  Personality Growth Plan
                </motion.h2>

                <div className="grid gap-6">
                  {personalityTraits.map((trait, index) => (
                    <motion.div key={trait.trait} variants={fadeInUp}>
                      <Card className="border-0 shadow-lg rounded-3xl bg-white">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${trait.color} rounded-xl flex items-center justify-center`}
                            >
                              <trait.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span>{trait.trait}</span>
                              <div className="text-sm font-normal text-gray-600">Current Score: {trait.score}%</div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                {trait.score < 70 ? (
                                  <>
                                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                                    Priority Areas to Develop
                                  </>
                                ) : (
                                  <>
                                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                                    Areas for Growth
                                  </>
                                )}
                              </h4>
                              <ul className="space-y-2">
                                {(trait.score < 70 ? trait.lackingAreas : trait.improvements).map((improvement, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Current Strengths
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {trait.strengths.map((strength, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                                    {strength}
                                  </Badge>
                                ))}
                              </div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Star className="w-4 h-4 text-purple-500" />
                                Recommendations
                              </h4>
                              <ul className="space-y-1">
                                {trait.recommendations.slice(0, 3).map((rec, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <Star className="w-3 h-3 text-purple-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center space-y-4 mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleDownloadPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-3 text-lg font-semibold shadow-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Complete Report
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleShareResults}
                  variant="outline"
                  className="rounded-2xl px-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 bg-white"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Results
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push("/")}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-2xl px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Share Feedback
                </Button>
              </motion.div>
            </div>
            <div className="pt-4">
              <Link href="/career-suggestions">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    Explore More Careers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          

          </motion.div>

        {/* Feedback Section */}
      {showFeedback && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
          <FeedbackSection />
        </motion.div>
      )}
      </div>
      
      <ChatBot />
    </div>
  )
}
