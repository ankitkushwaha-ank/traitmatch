"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Send, Heart } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export function FeedbackSection() {
  const [rating, setRating] = useState("")
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setRating("")
        setFeedback("")
        setEmail("")
      }, 3000)
    }, 1000)
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Thank You!</h3>
        <p className="text-neutral-600">Your feedback helps us improve Evolvify for everyone.</p>
      </motion.div>
    )
  }

  return (
    <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg rounded-3xl bg-white">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-base font-medium text-neutral-700 mb-3 block">
                How would you rate your experience with Evolvify?
              </Label>
              <RadioGroup value={rating} onValueChange={setRating} className="flex flex-col space-y-3">
                {[
                  { value: "excellent", label: "Excellent - Exceeded my expectations!", icon: "🌟" },
                  { value: "good", label: "Good - Very helpful and insightful", icon: "😊" },
                  { value: "average", label: "Average - It was okay", icon: "😐" },
                  { value: "poor", label: "Poor - Needs improvement", icon: "😞" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="feedback" className="text-base font-medium text-neutral-700">
                Tell us more about your experience
              </Label>
              <Textarea
                id="feedback"
                placeholder="What did you like? What could we improve? Any suggestions for new features?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="mt-2 border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-medium text-neutral-700">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-neutral-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-sm text-neutral-500 mt-1">
                We'll only use this to follow up on your feedback if needed.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!rating || isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-2xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
