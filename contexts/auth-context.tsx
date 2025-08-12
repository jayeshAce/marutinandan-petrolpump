"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, type AuthState, getAuthSession, clearAuthSession } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const user = getAuthSession()
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  }, [])

  const login = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const logout = () => {
    clearAuthSession()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateUser = (updates: Partial<User>) => {
    setAuthState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }))
  }

  return <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
