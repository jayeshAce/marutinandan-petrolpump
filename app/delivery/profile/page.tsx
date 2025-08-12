"use client"

import { useState, useEffect } from "react"
import { DeliveryLayout } from "@/components/delivery/delivery-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, MapPin, Star, Award, Clock } from "lucide-react"

export default function DeliveryProfilePage() {
  const [deliveryBoyName, setDeliveryBoyName] = useState("")
  const [deliveryBoyUsername, setDeliveryBoyUsername] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("deliveryBoyName") || ""
    const username = localStorage.getItem("deliveryBoyUsername") || ""
    setDeliveryBoyName(name)
    setDeliveryBoyUsername(username)
  }, [])

  const profileData = {
    name: deliveryBoyName,
    username: deliveryBoyUsername,
    phone: "+91 98765 43210",
    email: "rajesh.kumar@marutinandan.com",
    address: "123 Delivery Street, City - 123456",
    vehicle: "Truck - MH 12 AB 1234",
    joinDate: "2023-06-15",
    status: "active",
  }

  const stats = {
    totalDeliveries: 1247,
    onTimeDeliveries: 1183,
    rating: 4.8,
    totalEarnings: 125000,
    thisMonthDeliveries: 89,
    thisMonthEarnings: 8900,
  }

  const achievements = [
    { title: "100 Deliveries", icon: Award, earned: true },
    { title: "500 Deliveries", icon: Award, earned: true },
    { title: "1000 Deliveries", icon: Award, earned: true },
    { title: "Perfect Month", icon: Star, earned: true },
    { title: "Speed Demon", icon: Clock, earned: false },
  ]

  const recentDeliveries = [
    {
      id: "MP2024001",
      customer: "Rajesh Sharma",
      date: "2024-01-15",
      time: "10:30 AM",
      amount: 1855,
      rating: 5,
    },
    {
      id: "MP2024003",
      customer: "Sunita Verma",
      date: "2024-01-15",
      time: "9:15 AM",
      amount: 950,
      rating: 5,
    },
    {
      id: "MP2023999",
      customer: "Amit Patel",
      date: "2024-01-14",
      time: "4:45 PM",
      amount: 2100,
      rating: 4,
    },
  ]

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your profile and view performance statistics</p>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profileData.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={profileData.username} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={profileData.phone} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={profileData.email} readOnly />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={profileData.address} readOnly />
                </div>
                <div>
                  <Label htmlFor="vehicle">Vehicle Details</Label>
                  <Input id="vehicle" value={profileData.vehicle} readOnly />
                </div>
                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" value={new Date(profileData.joinDate).toLocaleDateString()} readOnly />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="mt-2">
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalDeliveries}</div>
              <div className="text-sm text-gray-600">Total Deliveries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((stats.onTimeDeliveries / stats.totalDeliveries) * 100)}%
              </div>
              <div className="text-sm text-gray-600">On-Time Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">₹{stats.totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* This Month Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Month Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Deliveries Completed</span>
                  <span className="font-bold text-blue-600">{stats.thisMonthDeliveries}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Earnings</span>
                  <span className="font-bold text-green-600">₹{stats.thisMonthEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average per Delivery</span>
                  <span className="font-bold text-purple-600">
                    ₹{Math.round(stats.thisMonthEarnings / stats.thisMonthDeliveries)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Days Active</span>
                  <span className="font-bold text-orange-600">22</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        achievement.earned
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <IconComponent
                        className={`h-6 w-6 mx-auto mb-2 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                      />
                      <div
                        className={`text-sm font-medium ${achievement.earned ? "text-yellow-800" : "text-gray-500"}`}
                      >
                        {achievement.title}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">#{delivery.id}</div>
                    <div className="text-sm text-gray-600">{delivery.customer}</div>
                    <div className="text-xs text-gray-500">
                      {delivery.date} at {delivery.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">₹{delivery.amount}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{delivery.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
                <Phone className="h-6 w-6 mb-2" />
                Call Support
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
                <Mail className="h-6 w-6 mb-2" />
                Email Support
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
                <MapPin className="h-6 w-6 mb-2" />
                Visit Office
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DeliveryLayout>
  )
}
