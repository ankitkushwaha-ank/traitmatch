"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, Share2, Bookmark, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChatBot } from "@/components/chat-bot"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CareerDetails() {
  const params = useParams()
  const careerId = params.id as string
  const [isSaved, setIsSaved] = useState(false)

  // Mock data - in a real app, this would be fetched based on the career ID
  const careerDetails = {
    id: careerId,
    title:
      careerId === "ux-designer"
        ? "UX Designer"
        : careerId === "data-scientist"
          ? "Data Scientist"
          : careerId === "marketing-manager"
            ? "Marketing Manager"
            : careerId === "clinical-psychologist"
              ? "Clinical Psychologist"
              : careerId === "art-director"
                ? "Art Director"
                : careerId === "content-creator"
                  ? "Content Creator"
                  : "Environmental Scientist",
    description:
      "Design digital products with a focus on user experience and interface design. UX Designers work closely with UI designers, developers, and product managers to create intuitive and enjoyable user experiences.",
    match: 95,
    averageSalary: "$85,000 - $120,000",
    growthOutlook: "Faster than average (15% growth over the next decade)",
    workEnvironment: "Tech companies, design agencies, in-house design teams, freelance",
    educationRequired: "Bachelor's degree in Design, HCI, or related field (some positions require only a portfolio)",
    image: "/placeholder.svg?height=300&width=300",
    personalityFit: [
      { trait: "Openness", reason: "High openness allows for creative thinking and innovative solutions", score: 4.5 },
      {
        trait: "Conscientiousness",
        reason: "Attention to detail and organization helps in creating polished designs",
        score: 4.0,
      },
      { trait: "Extraversion", reason: "Collaboration with team members and stakeholders is important", score: 3.5 },
      { trait: "Agreeableness", reason: "Empathy helps in understanding user needs and perspectives", score: 4.5 },
      { trait: "Neuroticism", reason: "Emotional stability helps in handling feedback and iteration", score: 2.0 },
    ],
    learningPaths: [
      {
        name: "Formal Education",
        description: "Bachelor's degree in UX Design, Human-Computer Interaction, or related field",
        time: "3-4 years",
        cost: "$$$",
      },
      {
        name: "Bootcamps",
        description: "Intensive UX design bootcamps (10-24 weeks)",
        time: "3-6 months",
        cost: "$$",
      },
      {
        name: "Self-Learning",
        description: "Online courses, books, and building a portfolio",
        time: "6-12 months",
        cost: "$",
      },
      {
        name: "Internships",
        description: "Gain practical experience through internships or junior positions",
        time: "3-6 months",
        cost: "$",
      },
    ],
    dayInLife: [
      "Morning stand-up meeting with the product team",
      "User research sessions or analyzing user feedback",
      "Creating wireframes, prototypes, or user flows",
      "Collaborating with UI designers and developers",
      "Presenting designs to stakeholders and incorporating feedback",
      "Staying updated on UX trends and best practices",
    ],
    topCompanies: ["Google", "Apple", "Microsoft", "Facebook", "Amazon", "Airbnb", "Uber"],
  }

  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/career-suggestions">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Career Suggestions
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[1fr_2fr] gap-8 items-start"
        >
          <div className="text-center">
            <div className="rounded-xl overflow-hidden bg-purple-100 p-6 mb-4">
              <img
                src={careerDetails.image || "/placeholder.svg"}
                alt={careerDetails.title}
                className="w-full h-auto"
              />
            </div>
            <Badge className="bg-purple-600 text-white text-lg mb-4">{careerDetails.match}% Match</Badge>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="text-gray-600 rounded-xl" onClick={toggleSave}>
                <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600 rounded-xl">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-2">
              {careerDetails.title}
            </h1>
            <p className="text-gray-600 md:text-base mb-6">{careerDetails.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-600">Average Salary</h3>
                <p className="text-xl font-bold">{careerDetails.averageSalary}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Growth Outlook</h3>
                <p className="text-xl font-bold">{careerDetails.growthOutlook}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-600 mb-1">Work Environment</h3>
              <p>{careerDetails.workEnvironment}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-600 mb-1">Education Required</h3>
              <p>{careerDetails.educationRequired}</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="personality" className="mt-12">
          <TabsList className="grid grid-cols-4 mb-8 rounded-xl">
            <TabsTrigger value="personality">Personality Fit</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="dayInLife">Day in the Life</TabsTrigger>
            <TabsTrigger value="companies">Top Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="personality">
            <Card>
              <CardHeader>
                <CardTitle className="CardTitle font-playfair text-2xl font-semibold">
                  Why It Matches Your Personality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {careerDetails.personalityFit.map((fit) => (
                    <motion.div
                      key={fit.trait}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4"
                    >
                      <div className="min-w-[100px]">
                        <div className="font-semibold">{fit.trait}</div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-purple-600"
                            style={{ width: `${(fit.score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-gray-700">{fit.reason}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paths">
            <Card>
              <CardHeader>
                <CardTitle className="CardTitle font-playfair text-2xl font-semibold">Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {careerDetails.learningPaths.map((path) => (
                    <motion.div
                      key={path.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg border p-4 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-xl mb-1">{path.name}</h3>
                      <p className="text-gray-700 mb-3">{path.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">⏱️ {path.time}</span>
                        <span className="text-gray-500">💰 {path.cost}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dayInLife">
            <Card>
              <CardHeader>
                <CardTitle className="CardTitle font-playfair text-2xl font-semibold">A Day in the Life</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {careerDetails.dayInLife.map((activity, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">
                        {index + 1}
                      </div>
                      <span>{activity}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle className="CardTitle font-playfair text-2xl font-semibold">Top Companies Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {careerDetails.topCompanies.map((company, index) => (
                    <motion.div
                      key={company}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex flex-col items-center justify-center rounded-lg border p-4 text-center hover:border-purple-200 hover:bg-purple-50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-full bg-gray-100 mb-2"></div>
                      <div className="font-medium">{company}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <ExternalLink className="h-4 w-4" />
                    View All Job Openings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 gap-2 rounded-xl font-semibold">
            <MessageSquare className="h-5 w-5" />
            Talk to EvolveBot About This Career
          </Button>
        </motion.div>
      </div>

      <ChatBot />
    </div>
  )
}
