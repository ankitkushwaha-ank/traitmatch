"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Palette, Stethoscope, Calculator, Users, Briefcase, Wrench, BookOpen } from "lucide-react"
import Link from "next/link"

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

export default function FieldSelection() {
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const fields = [
    {
      id: "technology",
      name: "Technology",
      description: "Software, AI, cybersecurity, and digital innovation",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: "creative",
      name: "Creative Arts",
      description: "Design, media, entertainment, and artistic expression",
      icon: Palette,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Medicine, nursing, therapy, and wellness",
      icon: Stethoscope,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      id: "business",
      name: "Business",
      description: "Management, consulting, entrepreneurship, and strategy",
      icon: Briefcase,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
    },
    {
      id: "finance",
      name: "Finance",
      description: "Banking, investment, accounting, and financial planning",
      icon: Calculator,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: "social",
      name: "Social Services",
      description: "Education, counseling, social work, and community service",
      icon: Users,
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
    },
    {
      id: "engineering",
      name: "Engineering",
      description: "Mechanical, civil, electrical, and industrial engineering",
      icon: Wrench,
      gradient: "from-gray-500 to-slate-500",
      bgGradient: "from-gray-50 to-slate-50",
    },
    {
      id: "education",
      name: "Education",
      description: "Teaching, research, curriculum development, and training",
      icon: BookOpen,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
    },
  ]

  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center mb-12">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Choose Your Fields of Interest
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Select the career fields that spark your curiosity. You can choose multiple areas to explore.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 rounded-3xl border-2 h-full ${
                  selectedFields.includes(field.id)
                    ? `border-transparent bg-gradient-to-br ${field.bgGradient} shadow-lg ring-2 ring-offset-2 ring-blue-500`
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
                }`}
                onClick={() => toggleField(field.id)}
              >
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                      selectedFields.includes(field.id) ? `bg-gradient-to-r ${field.gradient}` : "bg-neutral-100"
                    }`}
                    animate={{
                      rotate: selectedFields.includes(field.id) ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <field.icon
                      className={`w-8 h-8 ${selectedFields.includes(field.id) ? "text-white" : "text-neutral-600"}`}
                    />
                  </motion.div>
                  <h3
                    className={`font-bold text-lg mb-2 ${
                      selectedFields.includes(field.id) ? "text-neutral-900" : "text-neutral-800"
                    }`}
                  >
                    {field.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      selectedFields.includes(field.id) ? "text-neutral-700" : "text-neutral-600"
                    }`}
                  >
                    {field.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-neutral-600 mb-6">
            Selected {selectedFields.length} field{selectedFields.length !== 1 ? "s" : ""}
          </p>
          <Link href="/personality-survey">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                disabled={selectedFields.length === 0}
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
