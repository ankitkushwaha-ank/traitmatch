"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    text: "Hi! I'm TraitBot, your career guidance assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  }])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      return "I'd be happy to help you explore career options! Have you taken our personality assessment yet?"
    }
    if (lowerMessage.includes("assessment") || lowerMessage.includes("test")) {
      return "Our personality assessment uses the Big Five model to understand your traits. Would you like to start it now?"
    }
    if (lowerMessage.includes("personality")) {
      return "We measure five key traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism."
    }
    if (lowerMessage.includes("confused") || lowerMessage.includes("help")) {
      return "It's okay to feel confused. Start with our free assessment and I'll guide you."
    }
    if (lowerMessage.includes("engineering") || lowerMessage.includes("doctor") || lowerMessage.includes("medicine")) {
      return "Have you considered UX design, data science, or marketing based on your interests?"
    }
    if (lowerMessage.includes("salary") || lowerMessage.includes("money")) {
      return "Salary matters, but aligning with your values is key to satisfaction."
    }
    if (lowerMessage.includes("thank")) {
      return "You're welcome! I'm always here to help. 🌟"
    }

    const defaultResponses = [
      "That's interesting! Tell me more about your career thoughts.",
      "What’s your biggest concern about choosing a path?",
      "Would you like to start with our personality assessment?",
      "Career planning can be tough. What would you like to explore first?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
  
    try {
      const res = await fetch("http://localhost:5000/api/gemini/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });
  
      const data = await res.json();
      const botText = data.reply || "Sorry, Its looks you are offline..";
  
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const botError: Message = {
        id: (Date.now() + 2).toString(),
        text: "Oops! Something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botError]);
    } finally {
      setIsTyping(false);
    }
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-sm h-[75vh] md:w-80"
          >
            <Card className="h-full flex flex-col shadow-2xl border border-gray-200 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <CardTitle className="text-lg">Career Assistant</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg break-words whitespace-pre-wrap text-sm leading-relaxed ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-purple-600" />}
                          {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                          <p>{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                        <Bot className="h-4 w-4 text-purple-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about careers..."
                      className="flex-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
