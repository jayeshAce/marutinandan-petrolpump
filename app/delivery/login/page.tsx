"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Truck, Home } from "lucide-react"

export default function DeliveryLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple authentication check for delivery boys
    const deliveryCredentials = [
      { username: "rajesh", password: "delivery123", name: "Rajesh Kumar" },
      { username: "suresh", password: "delivery123", name: "Suresh Yadav" },
      { username: "vikash", password: "delivery123", name: "Vikash Singh" },
    ]

    const deliveryBoy = deliveryCredentials.find(
      (cred) => cred.username === formData.username && cred.password === formData.password,
    )

    if (deliveryBoy) {
      localStorage.setItem("deliveryAuth", "true")
      localStorage.setItem("deliveryBoyName", deliveryBoy.name)
      localStorage.setItem("deliveryBoyUsername", deliveryBoy.username)
      router.push("/delivery/dashboard")
    } else {
      setError("Invalid username or password")
    }
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4 bg-transparent">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Delivery Partner</h2>
          <p className="mt-2 text-sm text-gray-600">Marutinandan Petrolpump</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Delivery Login</CardTitle>
            <CardDescription className="text-center">
              Enter your delivery partner credentials to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Rajesh:</strong> rajesh / delivery123
                </div>
                <div>
                  <strong>Suresh:</strong> suresh / delivery123
                </div>
                <div>
                  <strong>Vikash:</strong> vikash / delivery123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
