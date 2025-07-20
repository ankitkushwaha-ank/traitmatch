"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBot } from "@/components/chat-bot"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  MapPin,
  Users,
  Brain,
  Heart,
  Zap,
  Target,
  ArrowRight,
  Star,
  Briefcase,
} from "lucide-react"

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

export default function CareerSuggestions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const allCareers = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      category: "Technology",
      match: 88,
      description: "Design and develop software applications and systems",
      salaryRange: "$75,000 - $150,000",
      growthRate: "22%",
      location: "Remote/Global",
      skills: ["Programming", "Problem Solving", "System Design"],
      personalityFit: ["Openness", "Conscientiousness"],
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "ux-designer",
      title: "UX/UI Designer",
      category: "Design",
      match: 92,
      description: "Create intuitive and engaging user experiences",
      salaryRange: "$65,000 - $130,000",
      growthRate: "13%",
      location: "Major Cities",
      skills: ["Design Thinking", "User Research", "Prototyping"],
      personalityFit: ["Openness", "Agreeableness"],
      icon: Heart,
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "product-manager",
      title: "Product Manager",
      category: "Business",
      match: 85,
      description: "Lead product strategy and cross-functional teams",
      salaryRange: "$90,000 - $180,000",
      growthRate: "19%",
      location: "Tech Hubs",
      skills: ["Strategy", "Leadership", "Analytics"],
      personalityFit: ["Extraversion", "Conscientiousness"],
      icon: Target,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      category: "Technology",
      match: 83,
      description: "Extract insights from complex data sets",
      salaryRange: "$95,000 - $165,000",
      growthRate: "22%",
      location: "Major Cities",
      skills: ["Statistics", "Machine Learning", "Programming"],
      personalityFit: ["Openness", "Conscientiousness"],
      icon: Brain,
      color: "from-purple-500 to-violet-600",
    },
    {
      id: "marketing-director",
      title: "Marketing Director",
      category: "Marketing",
      match: 80,
      description: "Lead marketing strategy and brand development",
      salaryRange: "$85,000 - $150,000",
      growthRate: "10%",
      location: "Major Cities",
      skills: ["Brand Strategy", "Digital Marketing", "Leadership"],
      personalityFit: ["Extraversion", "Openness"],
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "therapist",
      title: "Clinical Therapist",
      category: "Healthcare",
      match: 78,
      description: "Help people overcome mental health challenges",
      salaryRange: "$60,000 - $120,000",
      growthRate: "25%",
      location: "Everywhere",
      skills: ["Empathy", "Communication", "Psychology"],
      personalityFit: ["Agreeableness", "Emotional Stability"],
      icon: Heart,
      color: "from-teal-500 to-cyan-600",
    },
    {
      id: "teacher",
      title: "High School Teacher",
      category: "Education",
      match: 75,
      description: "Educate and inspire the next generation",
      salaryRange: "$45,000 - $75,000",
      growthRate: "8%",
      location: "Everywhere",
      skills: ["Communication", "Patience", "Subject Expertise"],
      personalityFit: ["Agreeableness", "Extraversion"],
      icon: Users,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "entrepreneur",
      title: "Entrepreneur",
      category: "Business",
      match: 87,
      description: "Start and grow your own business ventures",
      salaryRange: "$0 - $∞",
      growthRate: "Variable",
      location: "Anywhere",
      skills: ["Innovation", "Risk Taking", "Leadership"],
      personalityFit: ["Openness", "Extraversion"],
      icon: Zap,
      color: "from-orange-500 to-red-600",
    },
  ]

  const categories = ["all", "Technology", "Design", "Business", "Marketing", "Healthcare", "Education"]

  const filteredCareers = allCareers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = selectedFilter === "all" || career.category === selectedFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-center mb-12">
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6"
          >
            Career Explorer
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover careers that match your personality and interests. Each career includes detailed roadmaps, salary
            information, and growth opportunities.
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Card className="border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search careers, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-2xl border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedFilter === category ? "default" : "outline"}
                      onClick={() => setSelectedFilter(category)}
                      className={`rounded-2xl ${
                        selectedFilter === category
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "border-2 border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {category === "all" ? "All Careers" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Grid */}
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career.id}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg rounded-3xl bg-white hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${career.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <career.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-lg font-bold text-green-600">{career.match}%</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {career.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">{career.title}</CardTitle>
                    <p className="text-gray-600 leading-relaxed">{career.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Salary and Growth */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{career.salaryRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">{career.growthRate}</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700">{career.location}</span>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Personality Fit */}
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 mb-2">Personality Fit:</h4>
                        <div className="flex flex-wrap gap-1">
                          {career.personalityFit.map((trait, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl mt-4">
                        <Briefcase className="w-4 h-4 mr-2" />
                        View Career Path
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No careers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </motion.div>
        )}
      </div>
      <ChatBot />
    </div>
  )
}
