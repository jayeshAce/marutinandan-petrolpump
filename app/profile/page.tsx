"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Package, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "customer@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Sector 15, Gurgaon, Haryana 122001",
    joinDate: "January 2024",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const recentOrders = [
    {
      id: "MP2024001",
      date: "Dec 15, 2024",
      items: "Premium Petrol (10L), Engine Oil",
      amount: "₹1,855",
      status: "delivered",
      rating: 5,
    },
    {
      id: "MP2024002",
      date: "Dec 10, 2024",
      items: "Diesel (25L)",
      amount: "₹2,180",
      status: "delivered",
      rating: 4,
    },
    {
      id: "MP2024003",
      date: "Dec 5, 2024",
      items: "Car Battery, Mobil Oil",
      amount: "₹5,150",
      status: "delivered",
      rating: 5,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data logic here
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your profile and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                  <Button variant="outline" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <p className="mt-1 text-gray-900">{profileData.joinDate}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profileData.address}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">#{order.id}</span>
                        <Badge className="bg-green-500">Delivered</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{order.items}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{order.date}</span>
                          <span className="font-bold text-green-600">{order.amount}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < order.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => router.push("/orders")}>
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-bold text-green-600">₹45,230</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Loyalty Points</span>
                  <span className="font-bold text-blue-600">1,250</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/orders")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/track-order")}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/products")}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
