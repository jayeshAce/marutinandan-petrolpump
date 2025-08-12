"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DeliveryLayout } from "@/components/delivery/delivery-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Package, CheckCircle, Phone, Navigation } from "lucide-react"

export default function DeliveryDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [deliveryBoyName, setDeliveryBoyName] = useState("")

  useEffect(() => {
    const deliveryAuth = localStorage.getItem("deliveryAuth")
    const name = localStorage.getItem("deliveryBoyName")
    if (deliveryAuth === "true" && name) {
      setIsAuthenticated(true)
      setDeliveryBoyName(name)
    } else {
      router.push("/delivery/login")
    }
  }, [router])

  const [assignedOrders] = useState([
    {
      id: "MP2024002",
      customer: "Priya Patel",
      phone: "+91 98765 43211",
      address: "456 Park Avenue, Sector 8, City - 123456",
      items: [{ name: "High Speed Diesel", quantity: 25, unit: "litres" }],
      total: 2180.0,
      status: "assigned",
      assignedTime: "11:00 AM",
      estimatedTime: "45 minutes",
      otp: "4567",
    },
    {
      id: "MP2024005",
      customer: "Amit Singh",
      phone: "+91 98765 43212",
      address: "789 Garden Road, Sector 12, City - 123456",
      items: [
        { name: "Premium Petrol", quantity: 15, unit: "litres" },
        { name: "Castrol GTX Engine Oil", quantity: 1, unit: "litre" },
      ],
      total: 1882.5,
      status: "assigned",
      assignedTime: "11:30 AM",
      estimatedTime: "60 minutes",
      otp: "8901",
    },
  ])

  const [completedToday] = useState([
    {
      id: "MP2024001",
      customer: "Rajesh Sharma",
      total: 1855.0,
      completedTime: "10:30 AM",
    },
    {
      id: "MP2024003",
      customer: "Sunita Verma",
      total: 950.0,
      completedTime: "9:15 AM",
    },
  ])

  const stats = {
    assignedOrders: assignedOrders.length,
    completedToday: completedToday.length,
    totalEarnings: completedToday.reduce((sum, order) => sum + order.total, 0),
    onTimeDeliveries: "95%",
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {deliveryBoyName}!</h1>
          <p className="text-gray-600">Here are your delivery assignments for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.assignedOrders}</div>
              <div className="text-sm text-gray-600">Assigned Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
              <div className="text-sm text-gray-600">Completed Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">₹{stats.totalEarnings.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Today's Earnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.onTimeDeliveries}</div>
              <div className="text-sm text-gray-600">On-Time Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Assigned Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {assignedOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No orders assigned at the moment</p>
                <p className="text-sm">Check back later for new assignments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignedOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Order #{order.id}</div>
                      <Badge className="bg-blue-500">Assigned</Badge>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        {order.phone}
                      </div>
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          Assigned: {order.assignedTime} • ETA: {order.estimatedTime}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Items:</div>
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          • {item.name} - {item.quantity} {item.unit}
                        </div>
                      ))}
                      <div className="text-sm font-bold text-green-600 mt-2">Total: ₹{order.total.toFixed(2)}</div>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium text-orange-800 mb-1">Delivery OTP</div>
                      <div className="text-xl font-bold text-orange-800">{order.otp}</div>
                      <div className="text-xs text-orange-700">Customer will provide this OTP upon delivery</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Navigation className="h-4 w-4 mr-2" />
                        Start Navigation
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Orders Today */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedToday.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No deliveries completed yet today</div>
            ) : (
              <div className="space-y-3">
                {completedToday.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">#{order.id}</div>
                      <div className="text-sm text-gray-600">{order.customer}</div>
                      <div className="text-xs text-gray-500">Completed at {order.completedTime}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹{order.total.toFixed(2)}</div>
                      <Badge className="bg-green-500 text-xs">Delivered</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DeliveryLayout>
  )
}
