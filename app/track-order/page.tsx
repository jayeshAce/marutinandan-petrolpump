"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Truck, Clock, CheckCircle, Package, User } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingData, setTrackingData] = useState(null)

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: "MP2024001",
    status: "on_the_way",
    estimatedArrival: "15 minutes",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      photo: "/placeholder.svg?height=60&width=60",
      vehicle: "Truck - MH 12 AB 1234",
    },
    items: [
      { name: "Premium Petrol", quantity: 10, unit: "litres" },
      { name: "Castrol GTX Engine Oil", quantity: 2, unit: "litres" },
    ],
    timeline: [
      { status: "Order Placed", time: "10:30 AM", completed: true },
      { status: "Order Confirmed", time: "10:35 AM", completed: true },
      { status: "Preparing for Delivery", time: "11:00 AM", completed: true },
      { status: "On the Way", time: "11:30 AM", completed: true, current: true },
      { status: "Delivered", time: "Expected by 12:00 PM", completed: false },
    ],
    deliveryOTP: "4567",
  }

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setTrackingData(mockTrackingData)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_the_way":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "preparing":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on_the_way":
        return "On the Way"
      case "delivered":
        return "Delivered"
      case "preparing":
        return "Preparing"
      default:
        return "Processing"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        {/* Order Number Input */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  placeholder="Enter your order number (e.g., MP2024001)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleTrackOrder} className="bg-blue-600 hover:bg-blue-700 sm:mt-6">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order #{trackingData.orderNumber}</CardTitle>
                  <Badge className={getStatusColor(trackingData.status)}>{getStatusText(trackingData.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Driver Info */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Delivery Partner
                    </h3>
                    <div className="flex items-center space-x-4">
                      <img
                        src={trackingData.driver.photo || "/placeholder.svg"}
                        alt={trackingData.driver.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{trackingData.driver.name}</div>
                        <div className="text-sm text-gray-500">{trackingData.driver.vehicle}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{trackingData.driver.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ETA */}
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Estimated Arrival
                    </h3>
                    <div className="text-2xl font-bold text-blue-600">{trackingData.estimatedArrival}</div>
                    <div className="text-sm text-gray-500 mt-1">Your order is on the way!</div>
                  </div>
                </div>

                {/* Delivery OTP */}
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Delivery OTP</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-800">{trackingData.deliveryOTP}</div>
                  <div className="text-sm text-orange-700 mt-1">
                    Share this OTP with the delivery partner to complete your order
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trackingData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity} {item.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.timeline.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${step.current ? "text-blue-600" : ""}`}>{step.status}</div>
                        <div className="text-sm text-gray-500">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Truck className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <div className="text-gray-600">Live GPS tracking will be available here</div>
                    <div className="text-sm text-gray-500 mt-1">Track your delivery partner's real-time location</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No tracking data message */}
        {!trackingData && orderNumber && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-600">
                Please check your order number and try again. If you continue to have issues, contact our support team.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
