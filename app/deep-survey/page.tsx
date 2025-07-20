"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DeepSurveyPage() {
    const [userName, setUserName] = useState("User")
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [userData, setUserData] = useState<any>(null)
    const [progress, setProgress] = useState(0)
      const [userId, setUserId] = useState<string | null>(null)
  
  
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
        }, [router])
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Card className="border-2 border-[#7928CA] rounded-xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white p-6 rounded-t-xl">
            <CardTitle className="text-3xl font-playfair font-semibold">Deep Profiling & AI Mentor</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-6xl">✨</div>
            <p className="text-gray-700 text-lg font-normal">
              This feature includes a comprehensive 45+ question psychological profiling, interactive AI mentor
              guidance, career fit tests, personalized roadmaps, and course suggestions.
            </p>
            <p className="text-gray-600 text-sm font-normal">
              This advanced assessment and personalized guidance will be available in a future update. Thank you for
              your patience!
            </p>
            <Link href="/">
              <Button className="genz-gradient-3 text-base py-5 rounded-xl font-semibold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
      <ChatBot />
    </div>
  )
}
