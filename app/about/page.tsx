"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Target,
  Heart,
  Brain,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatBot } from "@/components/chat-bot"
import Link from "next/link"
import Image from "next/image"

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

export default function About() {
  const values = [
    {
      icon: Brain,
      title: "Science-Based",
      description:
        "Our assessments are built on decades of psychological research and validated personality models like the Big Five, ensuring 94% accuracy in career matching.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Heart,
      title: "Empathetic",
      description:
        "We understand that career decisions are deeply personal and life-changing journeys that require compassionate, personalized guidance and support.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Target,
      title: "Accurate",
      description:
        "Precision in matching personalities to careers that truly fit and fulfill individuals, with 94% accuracy rate and 89% user satisfaction.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Lightbulb,
      title: "Innovative",
      description:
        "Constantly evolving our platform with the latest in AI and career guidance technology, machine learning, and predictive analytics.",
      gradient: "from-yellow-500 to-orange-600",
    },
  ]

  const stats = [
    { number: "250,000+", label: "People Helped", icon: Users },
    { number: "94%", label: "Accuracy Rate", icon: Target },
    { number: "500+", label: "Career Paths", icon: Award },
    { number: "50+", label: "Industries Covered", icon: TrendingUp },
  ]

  const features = [
    {
      title: "AI-Powered Personality Assessment",
      description:
        "Advanced algorithms analyze your responses using the scientifically-validated Big Five personality model with 94% accuracy",
      icon: Brain,
      color: "from-purple-500 to-blue-500",
      details: [
        "15-minute comprehensive assessment",
        "Real-time AI analysis",
        "Instant detailed results",
        "Scientifically validated",
      ],
    },
    {
      title: "Personalized Career Matching",
      description:
        "Get matched with careers that align with your unique personality traits, interests, and values using machine learning",
      icon: Target,
      color: "from-green-500 to-teal-500",
      details: ["500+ career options", "Salary and growth data", "Industry insights", "Location-based matching"],
    },
    {
      title: "Expert Mentor Network",
      description:
        "Connect with industry professionals who can guide your career journey with personalized advice and insights",
      icon: Users,
      color: "from-orange-500 to-red-500",
      details: ["1000+ verified mentors", "Industry experts", "1-on-1 sessions", "Group workshops"],
    },
    {
      title: "AI Career Counselor",
      description: "24/7 AI-powered guidance and support for all your career-related questions and decision-making",
      icon: Zap,
      color: "from-pink-500 to-purple-500",
      details: ["24/7 availability", "Personalized advice", "Career planning", "Skill recommendations"],
    },
    {
      title: "Comprehensive Career Roadmaps",
      description:
        "Detailed pathways showing skills, education, certifications, and steps needed for your chosen career",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-500",
      details: ["Step-by-step guidance", "Skill requirements", "Education pathways", "Timeline planning"],
    },
    {
      title: "Progress Tracking Dashboard",
      description: "Monitor your career development journey with detailed analytics, insights, and milestone tracking",
      icon: BarChart3,
      color: "from-emerald-500 to-green-500",
      details: ["Progress analytics", "Goal tracking", "Achievement badges", "Performance insights"],
    },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Take the Assessment",
      description: "Complete our scientifically-backed personality assessment in just 15 minutes",
      icon: Brain,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      step: "2",
      title: "Get Your Results",
      description: "Receive detailed insights about your personality traits, strengths, and growth areas",
      icon: Eye,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      step: "3",
      title: "Discover Careers",
      description: "Explore personalized career recommendations with salary data and growth projections",
      icon: Target,
      gradient: "from-pink-500 to-red-500",
    },
    {
      step: "4",
      title: "Connect with Mentors",
      description: "Get matched with industry experts who can guide your career journey",
      icon: Users,
      gradient: "from-red-500 to-orange-500",
    },
    {
      step: "5",
      title: "Plan Your Path",
      description: "Create a detailed roadmap with skills, education, and milestones for your chosen career",
      icon: BookOpen,
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      step: "6",
      title: "Track Progress",
      description: "Monitor your development with our comprehensive dashboard and AI insights",
      icon: TrendingUp,
      gradient: "from-yellow-500 to-green-500",
    },
  ]

  const personalityTraits = [
    {
      name: "Openness",
      description: "Creativity, curiosity, and openness to new experiences",
      impact: "Predicts success in creative and innovative roles",
      careers: ["Designer", "Researcher", "Entrepreneur"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Conscientiousness",
      description: "Organization, discipline, and goal-oriented behavior",
      impact: "Strongest predictor of job performance across all industries",
      careers: ["Project Manager", "Accountant", "Engineer"],
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Extraversion",
      description: "Sociability, assertiveness, and energy in social situations",
      impact: "Critical for leadership and customer-facing roles",
      careers: ["Sales", "Marketing", "Management"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Agreeableness",
      description: "Cooperation, trust, and concern for others",
      impact: "Essential for teamwork and helping professions",
      careers: ["Teacher", "Counselor", "Healthcare"],
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Neuroticism",
      description: "Emotional stability and stress management",
      impact: "Affects performance under pressure and leadership potential",
      careers: ["Crisis Management", "Emergency Services"],
      color: "from-purple-500 to-indigo-500",
    },
  ]

  const articles = [
    {
      title: "The Science Behind Personality-Career Matching",
      excerpt:
        "Discover how the Big Five personality model revolutionizes career guidance and why it's 40% more accurate than traditional methods.",
      readTime: "5 min read",
      category: "Research",
      gradient: "from-blue-500 to-purple-500",
      author: "Dr. Sarah Chen",
      date: "Dec 15, 2024",
    },
    {
      title: "Why 70% of Professionals Are in Wrong Careers",
      excerpt:
        "Exploring the career mismatch crisis and how personality-based guidance can solve this $500B problem affecting global productivity.",
      readTime: "7 min read",
      category: "Analysis",
      gradient: "from-green-500 to-teal-500",
      author: "Marcus Rodriguez",
      date: "Dec 10, 2024",
    },
    {
      title: "The Future of AI in Career Counseling",
      excerpt:
        "How artificial intelligence is transforming career guidance and making personalized advice accessible to millions worldwide.",
      readTime: "6 min read",
      category: "Technology",
      gradient: "from-orange-500 to-red-500",
      author: "Emily Watson",
      date: "Dec 5, 2024",
    },
    {
      title: "Building Your Personal Brand Based on Personality",
      excerpt:
        "Learn how understanding your personality traits can help you build an authentic and powerful personal brand that attracts opportunities.",
      readTime: "8 min read",
      category: "Career Tips",
      gradient: "from-pink-500 to-purple-500",
      author: "Alex Thompson",
      date: "Nov 28, 2024",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              About <span className="font-comfortaa evolvify-gradient">Evolvify</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto mb-8">
              We believe everyone deserves a career that aligns with their true self. Our mission is to bridge the gap
              between personality and profession, helping people find work they love through science-backed insights and
              AI-powered guidance.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/field-selection">
                <Button className="genz-gradient-1 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-2xl font-semibold border-2 hover:bg-purple-50 bg-transparent"
                >
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 genz-gradient-1">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-white">
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Mismatch Problem */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
              The Career Mismatch Crisis
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <Image
                  src="/career-mismatch-chart.png"
                  alt="Career Mismatch Statistics"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-lg"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">70%</span>
                    </div>
                    <p className="text-lg text-neutral-700">
                      <strong>Students facing career dissatisfaction</strong> due to lack of personality-based guidance
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">65%</span>
                    </div>
                    <p className="text-lg text-neutral-700">
                      <strong>Professionals feel disconnected</strong> from their current career path
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">40%</span>
                    </div>
                    <p className="text-lg text-neutral-700">
                      <strong>Career switchers within 5 years</strong> of starting their first job
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    The Solution: Personality-Based Career Guidance
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Research shows that people who choose careers aligned with their personality traits are 40% more
                    satisfied, perform 25% better, and are 60% less likely to switch careers within the first 5 years.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Evolvify Works */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center"
            >
              How Evolvify Works
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="text-3xl font-bold text-neutral-900 mb-2">Step {step.step}</div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                      <p className="text-neutral-700 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                      <p className="text-neutral-700 leading-relaxed mb-6">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-neutral-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personality Traits Deep Dive */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
              Understanding Personality Traits
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
              The Big Five personality model is the most scientifically validated framework for understanding human
              personality and predicting career success
            </motion.p>

            <div className="grid gap-8">
              {personalityTraits.map((trait, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${trait.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-neutral-900 mb-3">{trait.name}</h3>
                          <p className="text-neutral-700 mb-4 leading-relaxed">{trait.description}</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-2">Career Impact:</h4>
                              <p className="text-sm text-neutral-600">{trait.impact}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-2">Best Career Matches:</h4>
                              <div className="flex flex-wrap gap-2">
                                {trait.careers.map((career, careerIndex) => (
                                  <span
                                    key={careerIndex}
                                    className="px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 rounded-full text-xs font-medium"
                                  >
                                    {career}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center"
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <value.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                      <p className="text-neutral-700 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Articles */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
              Research & Insights
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-neutral-600 text-center mb-12 max-w-3xl mx-auto">
              Stay informed with the latest research on personality psychology and career development from our expert
              team
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="hover-lift"
                >
                  <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${article.gradient}`} />
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${article.gradient} text-white`}
                        >
                          {article.category}
                        </span>
                        <span className="text-sm text-neutral-500">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{article.title}</h3>
                      <p className="text-neutral-700 leading-relaxed mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {article.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{article.author}</p>
                            <p className="text-xs text-neutral-500">{article.date}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto font-semibold"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
              Our Story
            </motion.h2>
            <motion.div variants={fadeInUp} className="prose prose-lg mx-auto text-neutral-700 leading-relaxed">
              <p className="mb-6 text-lg">
                Evolvify was born from a simple observation: too many talented people were stuck in careers that didn't
                match their personalities. Our founders, a team of psychologists and technologists, recognized that
                traditional career guidance often overlooked the crucial role of personality fit.
              </p>
              <p className="mb-6 text-lg">
                We set out to change that by combining rigorous psychological science with cutting-edge AI technology.
                Our platform uses the scientifically-validated Big Five personality model, enhanced with machine
                learning algorithms to provide personalized career guidance at scale.
              </p>
              <p className="text-lg">
                Today, we're proud to have helped over 250,000 people discover careers that truly align with who they
                are. Every success story motivates us to continue evolving and improving our platform, making career
                fulfillment accessible to everyone, everywhere.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 genz-gradient-1 relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Join thousands who discovered their perfect career match through our science-backed personality assessment
              and AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/field-selection">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 rounded-2xl font-semibold"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-2xl font-semibold"
                  >
                    View Dashboard
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <ChatBot />
    </div>
  )
}
