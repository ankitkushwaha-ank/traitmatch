"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"

export default function PremiumSurveyPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <Card className="border-2 border-[#FF0080] rounded-xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#FF0080] to-[#7928CA] text-white p-6 rounded-t-xl">
            <CardTitle className="text-3xl font-playfair font-semibold">Personal AI Advisor & Human Mentor</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-6xl">🌟</div>
            <p className="text-gray-700 text-lg font-normal">
              This premium experience includes 50+ gamified deep psychological tests, personalized career fit, skills,
              universities, and job suggestions, a customized EvolveBot, and a downloadable career roadmap.
            </p>
            <p className="text-gray-600 text-sm font-normal">
              This ultimate guidance package will be available soon. Stay tuned for updates!
            </p>
            <Link href="/">
              <Button className="genz-gradient-2 text-base py-5 rounded-xl font-semibold">
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
