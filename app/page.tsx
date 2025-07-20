"use client"

import Link from "next/link"
import {
  ArrowRight,
  Users,
  Target,
  BarChart3,
  Sparkles,
  Star,
  Zap,
  Heart,
  Brain,
  Lightbulb,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { PricingSection } from "@/components/pricing-section"
import { ChatBot } from "@/components/chat-bot"
import { FeedbackSection } from "@/components/feedback-section"
import { MentorCard } from "@/components/mentor-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { useState } from "react"

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

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function Home() {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)
  const [showAllMentors, setShowAllMentors] = useState(false)

  const features = [
    {
      icon: Target,
      title: "Choose Your Field",
      description: "Select career domains that spark your curiosity",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: BarChart3,
      title: "Take Assessment",
      description: "Complete our scientifically-backed personality quiz",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Users,
      title: "Get Your Profile",
      description: "Discover your unique personality traits and strengths",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Sparkles,
      title: "Find Careers",
      description: "Explore careers perfectly matched to your profile",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
  ]

  const traits = [
    {
      letter: "O",
      name: "Openness",
      description: "Creativity and curiosity",
      icon: Lightbulb,
      color: "from-blue-500 to-indigo-600",
    },
    {
      letter: "C",
      name: "Conscientiousness",
      description: "Organization and discipline",
      icon: Target,
      color: "from-emerald-500 to-green-600",
    },
    {
      letter: "E",
      name: "Extraversion",
      description: "Social energy and assertiveness",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
    },
    {
      letter: "A",
      name: "Agreeableness",
      description: "Cooperation and empathy",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
    },
    {
      letter: "N",
      name: "Neuroticism",
      description: "Emotional stability",
      icon: Brain,
      color: "from-purple-500 to-violet-600",
    },
  ]

  const allTestimonials = [
    {
      name: "Priya Sharma",
      age: 20,
      role: "Engineering Student",
      quote:
        "I was so confused about which career path to choose after my B.Tech. Evolvify helped me discover that my analytical nature was perfect for data science!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Arjun Patel",
      age: 19,
      role: "Commerce Student",
      quote:
        "Being a commerce student, I thought I was limited to traditional fields. This platform opened my eyes to creative careers in marketing that match my personality perfectly!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sneha Reddy",
      age: 21,
      role: "Arts Student",
      quote:
        "I was worried about my future after BA. The personality insights were spot-on and guided me towards UX design - a field I never knew existed!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Rohit Kumar",
      age: 18,
      role: "12th Grade Student",
      quote:
        "Choosing between engineering and medicine was stressing me out. Evolvify showed me that my personality aligns better with biomedical engineering - perfect blend of both!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ananya Singh",
      age: 22,
      role: "MBA Student",
      quote:
        "Even after completing my engineering, I felt lost. The AI mentor feature gave me personalized guidance that traditional career counseling never could. Now I'm confident about product management!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Vikash Gupta",
      age: 20,
      role: "BCA Student",
      quote:
        "I was doing BCA just because everyone said IT has good scope. Evolvify helped me realize I'm more suited for creative tech roles like game development!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Kavya Nair",
      age: 19,
      role: "Psychology Student",
      quote:
        "I chose psychology but wasn't sure about specialization. The detailed personality report helped me understand I'm perfect for counseling and therapy work!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aditya Joshi",
      age: 21,
      role: "Mechanical Engineering Student",
      quote:
        "I was following the typical engineering path without passion. Evolvify showed me how my mechanical knowledge could be applied in automotive design - my true calling!",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const allMentors = [
    {
      name: "Dr. Rajesh Khanna",
      role: "Senior Software Architect",
      description:
        "15+ years in tech industry. Specializes in guiding students towards software engineering and tech leadership roles.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Meera Agarwal",
      role: "Creative Director",
      description:
        "Award-winning designer with expertise in helping students discover careers in design, advertising, and creative industries.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Dr. Suresh Iyer",
      role: "Healthcare Consultant",
      description:
        "Medical professional guiding students in healthcare, biotechnology, and life sciences career paths.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Pooja Malhotra",
      role: "Business Strategy Expert",
      description:
        "MBA from IIM with 12+ years experience. Helps students navigate business, finance, and entrepreneurship opportunities.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Amit Sharma",
      role: "Data Science Lead",
      description:
        "AI/ML expert with 10+ years at top tech companies. Guides students in data science, AI, and analytics careers.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Riya Kapoor",
      role: "Digital Marketing Head",
      description:
        "Social media and digital marketing specialist. Helps students explore modern marketing and content creation careers.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Dr. Vikram Singh",
      role: "Research Scientist",
      description:
        "PhD in Biotechnology with research experience. Guides students in scientific research and academic careers.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Neha Gupta",
      role: "HR Director",
      description:
        "Human resources expert with corporate experience. Specializes in career development and organizational psychology.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const displayedTestimonials = showAllTestimonials ? allTestimonials : allTestimonials.slice(0, 4)
  const displayedMentors = showAllMentors ? allMentors : allMentors.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-1">
        {/* Hero Section - Enhanced with hover effects */}
        <section className="relative py-8 md:py-12 lg:py-16 hero-gradient">
          {/* Floating decorative elements */}
          <motion.div
            {...floatingAnimation}
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          />
          <motion.div
            {...floatingAnimation}
            transition={{ delay: 1, duration: 5 }}
            className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          />
          <motion.div
            {...floatingAnimation}
            transition={{ delay: 2, duration: 6 }}
            className="absolute bottom-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"
          />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6"
              >
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Trusted by 250,000+ students</span>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative inline-block group mb-4">
                <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  Find Your Perfect Career Path with{" "}
                  <motion.span
                    className="relative inline-block font-comfortaa bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    Evolvify
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {"Evolve • Discover • Thrive ✨"}
                    </motion.div>
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed font-medium"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
              >
                Discover careers that match your personality with our scientifically-backed assessment. Join thousands
                of Indian students who found their ideal career.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pre-assessment">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 rounded-2xl font-semibold"
                    >
                      Start Free Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 bg-white/10 border-white/30 text-gray-900 hover:bg-white/20 backdrop-blur-sm rounded-2xl font-semibold"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Reduced padding */}
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                How It Works
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
                Four simple steps to discover your ideal career path
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card
                    className={`text-center p-6 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br ${feature.bgColor} group overflow-hidden relative cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0 relative z-10">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-xl text-neutral-900 mb-4">{feature.title}</h3>
                      <p className="text-neutral-700 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Science Section - Reduced padding */}
        <section className="py-12 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Based on Science
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
                Our assessments use the Big Five personality model, validated by decades of research
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-5 gap-4"
            >
              {traits.map((trait, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.05, rotateX: 10 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white group overflow-hidden relative cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-0 relative z-10">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${trait.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {trait.letter}
                      </motion.div>
                      <div className="mb-4">
                        <trait.icon className="w-6 h-6 mx-auto text-neutral-600" />
                      </div>
                      <h3 className="font-bold text-lg text-neutral-900 mb-2">{trait.name}</h3>
                      <p className="text-sm text-neutral-600">{trait.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Meet Our Expert Mentors
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
                Get personalized guidance from industry experts who understand your journey
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayedMentors.map((mentor, index) => (
                <MentorCard key={index} mentor={mentor} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowAllMentors(!showAllMentors)}
                variant="outline"
                className="rounded-2xl border-neutral-300 hover:bg-neutral-50 bg-transparent"
              >
                {showAllMentors ? "Show Less Mentors" : "View More Mentors"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Testimonials Section - Reduced padding */}
        <section className="py-12 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Success Stories
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
                Hear from Indian students who found their perfect career path
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                variant="outline"
                className="rounded-2xl border-neutral-300 hover:bg-neutral-50 bg-transparent"
              >
                {showAllTestimonials ? "Show Less" : "View More Stories"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* Feedback Section */}
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                We Value Your Feedback
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-neutral-600 leading-relaxed">
                Help us improve and share your experience with Evolvify
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <FeedbackSection />
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Reduced padding */}
        <section className="py-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <motion.div
            {...floatingAnimation}
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            {...floatingAnimation}
            transition={{ delay: 1, duration: 5 }}
            className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
          />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Path?</h2>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                Start your journey to a fulfilling career today. Join thousands of Indian students who discovered their
                perfect match.
              </p>
              <Link href="/pre-assessment">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 rounded-2xl font-semibold"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Animated Chatbot */}
      <ChatBot />
    </div>
  )
}
