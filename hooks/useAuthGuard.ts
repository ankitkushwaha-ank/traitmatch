"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuthGuard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (!userData) {
      router.replace("/login")
    } else {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
      } catch {
        sessionStorage.removeItem("user")
        router.replace("/login")
      }
    }
    setLoading(false)
  }, [router])

  return { user, loading }
}
