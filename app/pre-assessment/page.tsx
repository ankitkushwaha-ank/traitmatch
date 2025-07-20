"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, User, GraduationCap, Target, Heart } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function PreAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    currentStatus: "",
    academicBackground: "",
    futureGoals: "",
    mainConcerns: "",
    age: "",
    location: "",
  })

  const questions = [
    {
      id: "name",
      title: "What's your name?",
      subtitle: "Let's personalize your experience",
      icon: User,
      type: "input",
      placeholder: "Enter your full name",
    },
    {
      id: "age",
      title: "How old are you?",
      subtitle: "This helps us provide age-appropriate guidance",
      icon: User,
      type: "input",
      placeholder: "Enter your age",
    },
    {
      id: "currentStatus",
      title: "What's your current status?",
      subtitle: "Tell us about your current academic or professional situation",
      icon: GraduationCap,
      type: "radio",
      options: [
        "12th Grade Student",
        "Undergraduate Student",
        "Postgraduate Student",
        "Recent Graduate",
        "Working Professional",
        "Career Changer",
        "Other",
      ],
    },
    {
      id: "academicBackground",
      title: "What's your academic background?",
      subtitle: "Your field of study or area of expertise",
      icon: GraduationCap,
      type: "radio",
      options: [
        "Science (PCM/PCB)",
        "Commerce",
        "Arts/Humanities",
        "Engineering",
        "Medical",
        "Business/Management",
        "Computer Science/IT",
        "Other",
      ],
    },
    {
      id: "futureGoals",
      title: "What are your future goals?",
      subtitle: "Share your aspirations and what you hope to achieve",
      icon: Target,
      type: "textarea",
      placeholder: "Describe your career aspirations, dreams, and what success means to you...",
    },
    {
      id: "mainConcerns",
      title: "What are your main concerns about choosing a career?",
      subtitle: "Help us understand what's holding you back",
      icon: Heart,
      type: "textarea",
      placeholder: "Share your worries, doubts, or challenges you're facing in career selection...",
    },
    {
      id: "location",
      title: "Where are you located?",
      subtitle: "This helps us provide location-specific career insights",
      icon: User,
      type: "input",
      placeholder: "City, State",
    },
  ]

  const currentQuestion = questions[currentStep]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const isCurrentStepValid = () => {
    const currentValue = formData[currentQuestion.id as keyof typeof formData]
    return currentValue && currentValue.trim().length > 0
  }

const handleSubmit = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in first.");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/assessment/submit",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // This is required
        },
      }
    );

    console.log("✅ Submitted", res.data);
    router.push("/personality-survey");
  } catch (error: any) {
    console.error("❌ Submission error:", error.response?.data || error.message);
    alert("❌ Failed to submit assessment. Try again.");
  }
};


  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        {/* Progress Bar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Getting to Know You</h1>
            <span className="text-sm text-gray-600">
              {currentStep + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <currentQuestion.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{currentQuestion.title}</CardTitle>
                  <p className="text-white/90 mt-2">{currentQuestion.subtitle}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {currentQuestion.type === "input" && (
                <div className="space-y-4">
                  <Label htmlFor={currentQuestion.id} className="text-lg font-medium">
                    Your Answer
                  </Label>
                  <Input
                    id={currentQuestion.id}
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="text-lg p-4 rounded-xl border-2 focus:border-purple-500"
                  />
                </div>
              )}

              {currentQuestion.type === "radio" && (
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Choose one that best describes you:</Label>
                  <RadioGroup
                    value={formData[currentQuestion.id as keyof typeof formData]}
                    onValueChange={handleInputChange}
                    className="space-y-3"
                  >
                    {currentQuestion.options?.map((option) => (
                      <motion.div
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 p-4 rounded-xl border-2 hover:border-purple-300 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="flex-1 cursor-pointer text-base">
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {currentQuestion.type === "textarea" && (
                <div className="space-y-4">
                  <Label htmlFor={currentQuestion.id} className="text-lg font-medium">
                    Share your thoughts
                  </Label>
                  <Textarea
                    id={currentQuestion.id}
                    placeholder={currentQuestion.placeholder}
                    value={formData[currentQuestion.id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="min-h-[120px] text-base p-4 rounded-xl border-2 focus:border-purple-500"
                  />
                </div>
              )}
            </CardContent>

            {/* Navigation */}
            <div className="p-8 pt-0 flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="px-6 py-3 rounded-xl bg-transparent"
              >
                Previous
              </Button>

              {currentStep === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isCurrentStepValid() || loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold"
                >
                  Submit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            {formData.name && `Great job, ${formData.name.split(" ")[0]}! `}
            We're building a personalized experience just for you ✨
          </p>
        </motion.div>
      </div>
    </div>
  )
}
