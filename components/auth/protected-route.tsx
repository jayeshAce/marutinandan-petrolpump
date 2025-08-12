"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  role?: "customer" | "admin" | "delivery"
  redirectTo?: string
}

export function ProtectedRoute({ children, role, redirectTo }: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated(role)

      if (!authenticated) {
        const defaultRedirect = role === "admin" ? "/admin/login" : role === "delivery" ? "/delivery/login" : "/login"
        router.push(redirectTo || defaultRedirect)
        return
      }

      setHasAccess(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [role, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}
