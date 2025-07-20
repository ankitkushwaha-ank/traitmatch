"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

interface TestimonialCardProps {
  testimonial: {
    name: string
    age: number
    role: string
    quote: string
    image: string
  }
  index: number
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white group overflow-hidden relative cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-6 relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 ring-2 ring-purple-200">
              <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
              <p className="text-sm text-neutral-600">
                {testimonial.age} years • {testimonial.role}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <Quote className="h-8 w-8 text-purple-300 mb-3" />
            <blockquote className="text-neutral-700 leading-relaxed flex-1">"{testimonial.quote}"</blockquote>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
