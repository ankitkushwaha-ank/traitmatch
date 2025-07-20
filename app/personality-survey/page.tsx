"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Brain, Heart, Zap, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function PersonalitySurvey() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [userName, setUserName] = useState("User")
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  // const [progress, setProgress] = useState(0)
  const [scores, setScores] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  })
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const uid = sessionStorage.getItem("user")
    if (uid) setUserId(uid)

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
      }, [router])

  const questions = [
      {
        id: 1,
        text: "When facing a new challenge, I prefer to:",
        type: "radio",
        trait: "openness",
        icon: Lightbulb,
        options: [
          { text: "Stick to proven methods that work", value: 1 },
          { text: "Try a mix of old and new approaches", value: 3 },
          { text: "Experiment with completely new solutions", value: 5 },
        ],
      },
      {
        id: 2,
        text: "How organized is your workspace?",
        type: "slider",
        trait: "conscientiousness",
        icon: Target,
        min: 1,
        max: 5,
        labels: ["Very messy", "Somewhat organized", "Very organized"],
      },
      {
        id: 3,
        text: "At a party, you're most likely to:",
        type: "radio",
        trait: "extraversion",
        icon: Zap,
        options: [
          { text: "Find a quiet corner to chat with one person", value: 1 },
          { text: "Mingle with a few close friends", value: 3 },
          { text: "Be the center of attention, meeting everyone", value: 5 },
        ],
      },
      {
        id: 4,
        text: "When someone disagrees with you, you:",
        type: "radio",
        trait: "agreeableness",
        icon: Heart,
        options: [
          { text: "Stand firm on your position", value: 1 },
          { text: "Try to find middle ground", value: 3 },
          { text: "Easily adapt to their viewpoint", value: 5 },
        ],
      },
      {
        id: 5,
        text: "How often do you worry about things?",
        type: "slider",
        trait: "neuroticism",
        icon: Brain,
        min: 1,
        max: 5,
        labels: ["Never worry", "Sometimes worry", "Worry frequently"],
      },
      {
        id: 6,
        text: "Your ideal weekend involves:",
        type: "radio",
        trait: "openness",
        icon: Lightbulb,
        options: [
          { text: "Relaxing at home with familiar activities", value: 1 },
          { text: "A mix of routine and something new", value: 3 },
          { text: "Exploring new places or trying new experiences", value: 5 },
        ],
      },
      {
        id: 7,
        text: "How do you approach deadlines?",
        type: "radio",
        trait: "conscientiousness",
        icon: Target,
        options: [
          { text: "I often work right up to the deadline", value: 1 },
          { text: "I plan ahead but sometimes run late", value: 3 },
          { text: "I always finish well before the deadline", value: 5 },
        ],
      },
      {
        id: 8,
        text: "In group projects, you typically:",
        type: "radio",
        trait: "extraversion",
        icon: Zap,
        options: [
          { text: "Prefer to work independently on your part", value: 1 },
          { text: "Collaborate when needed", value: 3 },
          { text: "Take charge and coordinate the team", value: 5 },
        ],
      },
      {
        id: 9,
        text: "When making decisions, you prioritize:",
        type: "radio",
        trait: "agreeableness",
        icon: Heart,
        options: [
          { text: "What's best for you personally", value: 1 },
          { text: "Balancing personal and others' needs", value: 3 },
          { text: "What's best for everyone involved", value: 5 },
        ],
      },
      {
        id: 10,
        text: "How do you handle stress?",
        type: "slider",
        trait: "neuroticism",
        icon: Brain,
        min: 1,
        max: 5,
        labels: ["Stay very calm", "Manage reasonably well", "Get overwhelmed easily"],
      },
      {
        id: 11,
        text: "Your approach to learning new skills:",
        type: "radio",
        trait: "openness",
        icon: Lightbulb,
        options: [
          { text: "Focus on mastering what I already know", value: 1 },
          { text: "Learn new skills when necessary", value: 3 },
          { text: "Constantly seek to learn new things", value: 5 },
        ],
      },
      {
        id: 12,
        text: "How detailed are your plans?",
        type: "slider",
        trait: "conscientiousness",
        icon: Target,
        min: 1,
        max: 5,
        labels: ["Very spontaneous", "Some planning", "Highly detailed plans"],
      },
      {
        id: 13,
        text: "In social situations, you feel energized by:",
        type: "radio",
        trait: "extraversion",
        icon: Zap,
        options: [
          { text: "Deep conversations with few people", value: 1 },
          { text: "Balanced mix of interaction", value: 3 },
          { text: "Meeting lots of new people", value: 5 },
        ],
      },
      {
        id: 14,
        text: "When someone needs help, you:",
        type: "radio",
        trait: "agreeableness",
        icon: Heart,
        options: [
          { text: "Help if it's convenient for you", value: 1 },
          { text: "Usually try to help when possible", value: 3 },
          { text: "Drop everything to help them", value: 5 },
        ],
      },
      {
        id: 15,
        text: "How do you react to unexpected changes?",
        type: "slider",
        trait: "neuroticism",
        icon: Brain,
        min: 1,
        max: 5,
        labels: ["Adapt easily", "Some difficulty adjusting", "Find it very stressful"],
      },
      {
        id: 16,
        text: "Your preferred type of movies/books:",
        type: "radio",
        trait: "openness",
        icon: Lightbulb,
        options: [
          { text: "Familiar genres I know I'll enjoy", value: 1 },
          { text: "Mix of familiar and new genres", value: 3 },
          { text: "Experimental or unconventional content", value: 5 },
        ],
      },
      {
        id: 17,
        text: "How do you maintain your living space?",
        type: "radio",
        trait: "conscientiousness",
        icon: Target,
        options: [
          { text: "Clean when it gets too messy", value: 1 },
          { text: "Regular cleaning routine", value: 3 },
          { text: "Everything has its place, always tidy", value: 5 },
        ],
      },
      {
        id: 18,
        text: "Your communication style is:",
        type: "radio",
        trait: "extraversion",
        icon: Zap,
        options: [
          { text: "Thoughtful and reserved", value: 1 },
          { text: "Balanced between listening and talking", value: 3 },
          { text: "Expressive and outgoing", value: 5 },
        ],
      },
      {
        id: 19,
        text: "In conflicts, you tend to:",
        type: "radio",
        trait: "agreeableness",
        icon: Heart,
        options: [
          { text: "Stand your ground firmly", value: 1 },
          { text: "Seek compromise", value: 3 },
          { text: "Avoid conflict, prioritize harmony", value: 5 },
        ],
      },
      {
        id: 20,
        text: "How confident do you feel about your future?",
        type: "slider",
        trait: "neuroticism",
        icon: Brain,
        min: 1,
        max: 5,
        labels: ["Very confident", "Moderately confident", "Often uncertain"],
      },
    ]
  

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isAnswered = answers[currentQ.id] !== undefined

  const handleAnswer = (value: any) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)
    const newScores = { ...scores }
    newScores[currentQ.trait as keyof typeof scores] += value
    setScores(newScores)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  "use client"


const handleSubmit = async () => {
  const userId = sessionStorage.getItem("user") // or wherever you're storing it

  if (!userId) {
    alert("Please log in first.")
    return
  }

  const payload = {
    userId,
    answers,
    scores,
    timestamp: new Date().toISOString(),
  }

  try {
    const res = await fetch("http://localhost:5000/api/personality/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Include token if you're using JWT
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push("/personality-results")
    } else {
      let errMsg = "Something went wrong."
      try {
        const err = await res.json()
        errMsg = err.message || errMsg
      } catch {
        // fallback for HTML or non-JSON error
      }
      alert("Failed to submit: " + errMsg)
    }
  } catch (error) {
    console.error("Error:", error)
    alert("Submission failed.")
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Personality Assessment</h1>
          <p className="text-lg text-gray-600">Answer honestly - there are no right or wrong answers.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200 rounded-full" />
        </motion.div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <currentQ.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold mb-2">{currentQ.text}</CardTitle>
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-sm">Measuring: {currentQ.trait}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {currentQ.type === "radio" && (
                <RadioGroup
                  value={answers[currentQ.id]?.toString()}
                  onValueChange={(value) => handleAnswer(Number.parseInt(value))}
                  className="space-y-4"
                >
                  {currentQ.options?.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-purple-300 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option.text}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}

              {currentQ.type === "slider" && (
                <div className="space-y-6">
                  <div className="px-4">
                    <Slider
                      value={[answers[currentQ.id] || 3]}
                      onValueChange={(value) => handleAnswer(value[0])}
                      min={currentQ.min}
                      max={currentQ.max}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 px-2">
                    {currentQ.labels?.map((label, index) => (
                      <span key={index} className="text-center">{label}</span>
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-purple-600">
                      Current: {answers[currentQ.id] || 3}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <div className="p-8 pt-0 flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="px-6 py-3 rounded-xl bg-transparent"
              >
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isAnswered}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold"
                >
                  Submit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            {progress < 50
              ? "You're doing great! Keep going ✨"
              : progress < 80
              ? "Almost there! 🚀"
              : "Final stretch! 🎯"}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
