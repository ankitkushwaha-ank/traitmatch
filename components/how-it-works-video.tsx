"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Lightbulb, BarChart, Target, Rocket } from "lucide-react"

export function HowItWorksVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Animation steps explaining how Evolvify works
  const steps = [
    {
      title: "Discover Your Core Traits",
      description:
        "Engage with our scientifically-backed assessments to uncover your unique personality strengths and preferences.",
      color: "bg-gradient-to-br from-purple-500 to-pink-500", // Vibrant gradient
      icon: Lightbulb,
    },
    {
      title: "Visualize Your Profile",
      description:
        "Receive a comprehensive, easy-to-understand report illustrating how your traits influence your professional style.",
      color: "bg-gradient-to-br from-green-400 to-blue-500", // Vibrant gradient
      icon: BarChart,
    },
    {
      title: "Explore Tailored Career Paths",
      description:
        "Browse a curated selection of careers perfectly aligned with your personality, skills, and aspirations.",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500", // Vibrant gradient
      icon: Target,
    },
    {
      title: "Chart Your Educational Journey",
      description:
        "Access personalized roadmaps, learning resources, and mentorship opportunities to achieve your ideal career.",
      color: "bg-gradient-to-br from-red-500 to-purple-600", // Vibrant gradient
      icon: Rocket,
    },
  ]

  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 5000) // Change step every 5 seconds

    return () => clearInterval(interval) // Clean up on unmount
  }, [steps.length])

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">How Evolvify Guides Your Journey</h2>
      <Card className="overflow-hidden border-2 border-transparent shadow-xl rounded-xl relative">
        <CardContent className="p-0 relative">
          {/* Video placeholder with a more colorful, abstract background */}
          <div
            className="relative aspect-video bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=500&width=900&text=Vibrant+Educational+Journey')" }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover opacity-30" // Reduced opacity to show background
              poster="/placeholder.svg?height=500&width=900&text=Vibrant+Educational+Journey" // Updated poster
              loop
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Animated explanation overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              {" "}
              {/* Adjusted overlay opacity */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 max-w-lg"
              >
                <div
                  className={`text-5xl mb-4 mx-auto w-20 h-20 rounded-full flex items-center justify-center text-white ${steps[currentStep].color}`}
                >
                  {React.createElement(steps[currentStep].icon, { className: "h-10 w-10" })}
                </div>
                <h3 className="text-white text-3xl font-bold mb-3 leading-tight">{steps[currentStep].title}</h3>
                <p className="text-gray-200 text-lg">{steps[currentStep].description}</p>
              </motion.div>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <Button
                onClick={togglePlay}
                variant="outline"
                size="icon"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-none text-white"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                onClick={toggleMute}
                variant="outline"
                size="icon"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-none text-white"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }} // Added scale animation on hover
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${currentStep === index ? `${step.color} text-white shadow-lg` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            onClick={() => setCurrentStep(index)}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 flex justify-center">
                {React.createElement(step.icon, { className: "h-8 w-8" })}
              </div>
              <p className="text-sm font-semibold">{step.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
