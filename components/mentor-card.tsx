"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Star } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

interface MentorCardProps {
  mentor: {
    name: string
    role: string
    description: string
    image: string
  }
  index: number
}

export function MentorCard({ mentor, index }: MentorCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white group overflow-hidden relative cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-6 relative z-10 text-center h-full flex flex-col">
          <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-blue-200 group-hover:ring-purple-300 transition-all duration-300">
            <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <h3 className="font-bold text-xl text-neutral-900 mb-2">{mentor.name}</h3>
          <p className="text-blue-600 font-semibold mb-3">{mentor.role}</p>
          <p className="text-neutral-600 leading-relaxed flex-1 mb-6">{mentor.description}</p>

          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-neutral-600 ml-2">4.9/5</span>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold">
            <MessageCircle className="mr-2 h-4 w-4" />
            Connect
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
