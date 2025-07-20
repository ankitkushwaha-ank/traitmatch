"use client"
import { useRouter } from "next/navigation"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Briefcase, GraduationCap, School, Smile, Heart, Star, Loader2 } from "lucide-react"

export default function MyProfile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [goals, setGoals] = useState("")
  const [currentStatus, setCurrentStatus] = useState("not-selected")
  const [selectedAvatar, setSelectedAvatar] = useState("/placeholder.svg?height=128&width=128")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const avatars = [
    { src: "/placeholder.svg?height=128&width=128", alt: "Default Avatar" },
    { icon: User, alt: "User Icon Avatar", displayName: "User" },
    { icon: Smile, alt: "Smile Icon Avatar", displayName: "Smile" },
    { icon: Heart, alt: "Heart Icon Avatar", displayName: "Heart" },
    { icon: Star, alt: "Star Icon Avatar", displayName: "Star" },
  ]

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUserId(parsed._id)
        // console.log("User ID:", parsed._id)
      } catch (err) {
        console.error("Error parsing user from sessionStorage:", err)
      }
    }
  }, [])

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetch("http://localhost:5000/api/my-profile", {
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId,
      },
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setName(data.name || "")
          setEmail(data.email || "")
          setPhone(data.phone || "")
          setGoals(data.goals || "")
          setCurrentStatus(data.status || "not-selected")
          setSelectedAvatar(data.avatar_url || "/placeholder.svg?height=128&width=128")
        } else {
          setError(data.error || "Failed to load profile.")
        }
      })
      .catch(() => setError("Server error while loading profile."))
      .finally(() => setLoading(false))
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const profileData = {
        name,
        email,
        phone,
        goals,
        status: currentStatus,
        avatar_url: selectedAvatar,
        updated_at: new Date().toISOString(),
      }

      const res = await fetch("http://localhost:5000/api/my-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId || "",
        },
        body: JSON.stringify(profileData),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to save profile.")
      } else {
        router.push("/dashboard") 
      }
    } catch {
      setError("Failed to save profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <Card className="mx-auto max-w-2xl shadow-lg rounded-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl p-6">
          <CardTitle className="text-3xl font-bold text-center">My Profile</CardTitle>
          <p className="text-center text-purple-100 mt-2">Manage your personal details and preferences.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Selection */}
            <div>
              <Label htmlFor="avatar" className="text-lg font-semibold text-gray-800 mb-3 block">
                Choose Your Avatar
              </Label>
              <div className="flex flex-wrap gap-4 justify-center">
                {avatars.map((avatar, index) => {
                  const avatarValue = avatar.src || (avatar.icon ? avatar.displayName : "")
                  return (
                    <div
                      key={index}
                      className={`relative p-1 rounded-full cursor-pointer transition-all duration-200 ${
                        selectedAvatar === avatarValue ? "ring-4 ring-purple-500" : "hover:ring-2 hover:ring-gray-300"
                      }`}
                      onClick={() => setSelectedAvatar(avatarValue)}
                    >
                      <Avatar className="h-20 w-20">
                        {avatar.src ? (
                          <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.alt} />
                        ) : (
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {avatar.icon && <avatar.icon className="h-10 w-10" />}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="phone" className="text-base font-medium text-gray-700">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Goals */}
            <div>
              <Label htmlFor="goals" className="text-base font-medium text-gray-700">
                Your Career Goals
              </Label>
              <Textarea
                id="goals"
                placeholder="Describe your career aspirations and what you hope to achieve with Evolvify..."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            {/* Current Status */}
            <div>
              <Label className="text-base font-medium text-gray-700 mb-2 block">What is your current status?</Label>
              <RadioGroup value={currentStatus} onValueChange={setCurrentStatus} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="school" id="school" />
                  <Label htmlFor="school" className="flex items-center gap-2">
                    <School className="h-4 w-4 text-blue-500" /> Currently in School
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="college" id="college" />
                  <Label htmlFor="college" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-500" /> Currently in College/University
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-orange-500" /> Currently Working
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-working" id="not-working" />
                  <Label htmlFor="not-working" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-red-500" /> Not Currently Working
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-md text-lg font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
