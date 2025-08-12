"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, MapPin, Phone, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [copiedOtp, setCopiedOtp] = useState(false)

  // Mock order data - in real app, fetch based on orderId
  const order = {
    id: orderId,
    date: "2024-01-15",
    status: "out_for_delivery",
    total: 1855.0,
    items: [
      { name: "Premium Petrol", quantity: 10, unit: "litres", price: 95.5 },
      { name: "Castrol GTX Engine Oil", quantity: 2, unit: "litres", price: 450 },
    ],
    deliveryAddress: "123 Main Street, Sector 15, City - 123456",
    customerPhone: "+91 98765 43210",
    otp: "5847",
    deliveryBoy: "Rajesh Kumar",
    estimatedDelivery: "Today, 4:30 PM",
    orderTime: "2024-01-15 10:30 AM",
    paymentMethod: "Cash on Delivery",
    deliverySlot: "2:00 PM - 4:00 PM",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      case "processing":
        return "bg-yellow-500"
      case "out_for_delivery":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      case "processing":
        return "Processing"
      case "out_for_delivery":
        return "Out for Delivery"
      default:
        return "Unknown"
    }
  }

  const copyOtp = () => {
    navigator.clipboard.writeText(order.otp)
    setCopiedOtp(true)
    setTimeout(() => setCopiedOtp(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Status</CardTitle>
                  <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Time:</span>
                    <span>{order.orderTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Slot:</span>
                    <span>{order.deliverySlot}</span>
                  </div>
                  {order.deliveryBoy && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Partner:</span>
                      <span>{order.deliveryBoy}</span>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium">{order.estimatedDelivery}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Items Ordered */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Items Ordered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} {item.unit} × ₹{item.price}
                        </div>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900">{order.deliveryAddress}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {order.customerPhone}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* OTP Card */}
            {(order.status === "out_for_delivery" || order.status === "delivered") && order.otp && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Delivery OTP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-3">
                      Share this OTP with the delivery partner to complete delivery
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-900 bg-white px-4 py-2 rounded border">
                        {order.otp}
                      </span>
                      <Button variant="outline" size="sm" onClick={copyOtp} className="bg-white">
                        {copiedOtp ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>₹{(order.total / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%):</span>
                  <span>₹{(order.total - order.total / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/track-order">
                  <Button variant="outline" className="w-full bg-transparent">
                    Track Order
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  Reorder Items
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Support
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
