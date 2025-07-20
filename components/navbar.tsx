"use client"

import { useRouter } from "next/navigation" 
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

useEffect(() => {
  const loadUser = () => {
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserName(user?.name || null)
      } catch (err) {
        console.error("Failed to parse user from sessionStorage")
        setUserName(null)
      }
    } else {
      setUserName(null)
    }
  }

  loadUser()

  // ✅ Listen for storage changes
  const handleStorageChange = () => {
    loadUser()
  }

  window.addEventListener("storage", handleStorageChange)

  return () => {
    window.removeEventListener("storage", handleStorageChange)
  }
}, [])



// Inside your component
const router = useRouter()

const handleLogout = () => {
  sessionStorage.removeItem("user")
  localStorage.removeItem("token")
  setUserName(null)
  setIsOpen(false)
  router.push("/") // ✅ redirects to home page
}

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Career Suggestions", href: "/career-suggestions" },
    ...(userName ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold font-comfortaa bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Evolvify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {!userName ? (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pre-assessment">
                  <Button className="genz-gradient-1 text-white rounded-xl font-semibold">
                    Start Assessment
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">Hi, {userName} 👋</span>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Link href="/pre-assessment">
                  <Button className="genz-gradient-1 text-white rounded-xl font-semibold">
                    Start Assessment
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t pt-4 space-y-3">
                  {!userName ? (
                    <>
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full text-left text-gray-700 hover:text-purple-600"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/pre-assessment" onClick={() => setIsOpen(false)}>
                        <Button className="w-full genz-gradient-1 text-white rounded-xl font-semibold">
                          Start Assessment
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">Hi, {userName} 👋</div>
                      <Button
                        variant="ghost"
                        className="w-full text-left text-red-500 hover:text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                      <Link href="/pre-assessment" onClick={() => setIsOpen(false)}>
                        <Button className="w-full genz-gradient-1 text-white rounded-xl font-semibold">
                          Start Assessment
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
