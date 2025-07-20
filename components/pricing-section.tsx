"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Zap, Crown } from "lucide-react"
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

export function PricingSection() {
  const plans = [
    {
      name: "Free Explorer",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with career exploration",
      features: ["Basic personality assessment", "3 career suggestions", "General career insights", "Email support"],
      icon: Sparkles,
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      popular: false,
    },
    {
      name: "Career Pro",
      price: "₹129",
      period: "one-time",
      description: "Most comprehensive career guidance for serious students",
      features: [
        "Complete personality analysis",
        "15+ detailed career matches",
        "Personalized career roadmap",
        "Industry salary insights",
        "1-on-1 mentor consultation",
        "Resume building guide",
        "Interview preparation tips",
        "Priority support",
      ],
      icon: Crown,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      popular: true,
    },
    {
      name: "Premium Plus",
      price: "₹299",
      period: "one-time",
      description: "Ultimate career transformation package",
      features: [
        "Everything in Career Pro",
        "AI-powered career coaching",
        "Monthly progress tracking",
        "Skill development plan",
        "Industry networking guide",
        "Job search strategy",
        "3 mentor consultations",
        "Lifetime updates",
      ],
      icon: Zap,
      gradient: "from-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      popular: false,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Choose Your Career Journey
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
            Invest in your future with our scientifically-backed career guidance
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    🔥 Most Popular
                  </div>
                </div>
              )}

              <Card
                className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br ${plan.bgGradient} group overflow-hidden relative ${
                  plan.popular ? "ring-2 ring-purple-300 scale-105" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="text-center p-8 relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <plan.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">{plan.description}</p>
                </CardHeader>

                <CardContent className="p-8 pt-0 relative z-10">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/pre-assessment">
                    <Button
                      className={`w-full py-6 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-purple-500/25`
                          : "bg-white border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {plan.price === "₹0" ? "Start Free" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            🔒 Secure payment • 💯 Money-back guarantee • 🇮🇳 Made for Indian students
          </p>
          <p className="text-sm text-neutral-500">All prices are in Indian Rupees. One-time payment, no hidden fees.</p>
        </motion.div>
      </div>
    </section>
  )
}
