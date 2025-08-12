"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Eye, RotateCcw, Star, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const orderHistory = [
  {
    id: "MP2024001",
    date: "2024-01-15",
    status: "delivered",
    total: 1855.0,
    items: [
      { name: "Premium Petrol", quantity: 10, unit: "litres", price: 95.5 },
      { name: "Castrol GTX Engine Oil", quantity: 2, unit: "litres", price: 450 },
    ],
    deliveredAt: "2024-01-15 12:30 PM",
    otp: "5847", // Added OTP for delivery verification
  },
  {
    id: "MP2024002",
    date: "2024-01-10",
    status: "out_for_delivery",
    total: 4982.0,
    items: [
      { name: "High Speed Diesel", quantity: 50, unit: "litres", price: 87.2 },
      { name: "Exide Car Battery", quantity: 1, unit: "piece", price: 4500 },
    ],
    otp: "3291", // Added OTP for current delivery
    deliveryBoy: "Rajesh Kumar",
    estimatedDelivery: "Today, 4:30 PM",
  },
  {
    id: "MP2024003",
    date: "2024-01-05",
    status: "cancelled",
    total: 531.0,
    items: [{ name: "Mobil 1 Synthetic Oil", quantity: 1, unit: "litre", price: 650 }],
    cancelledAt: "2024-01-05 11:20 AM",
    cancelReason: "Customer requested cancellation",
  },
]

export default function OrdersPage() {
  const [copiedOtp, setCopiedOtp] = useState<string | null>(null)

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

  const copyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp)
    setCopiedOtp(otp)
    setTimeout(() => setCopiedOtp(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">Continue Shopping</Button>
          </Link>
        </div>

        {orderHistory.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link href="/products">
                <Button className="bg-blue-600 hover:bg-blue-700">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Items Ordered</h4>
                      <div className="space-y-2">
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
                    </div>

                    <Separator />

                    {/* Order Total */}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold text-lg">₹{order.total.toFixed(2)}</span>
                    </div>

                    {(order.status === "out_for_delivery" || order.status === "delivered") && order.otp && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Delivery OTP</h4>
                            <p className="text-sm text-blue-700 mb-2">
                              Share this OTP with the delivery partner to complete delivery
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-blue-900 bg-white px-3 py-1 rounded border">
                                {order.otp}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyOtp(order.otp!)}
                                className="bg-white"
                              >
                                {copiedOtp === order.otp ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        {order.deliveryBoy && (
                          <div className="mt-3 text-sm text-blue-700">
                            <strong>Delivery Partner:</strong> {order.deliveryBoy}
                            {order.estimatedDelivery && (
                              <>
                                <br />
                                <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Order Status Info */}
                    {order.status === "delivered" && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800">
                          <strong>Delivered:</strong> {order.deliveredAt}
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-sm text-red-800">
                          <strong>Cancelled:</strong> {order.cancelledAt}
                          <br />
                          <strong>Reason:</strong> {order.cancelReason}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>

                      {order.status === "delivered" && (
                        <>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Star className="h-4 w-4 mr-2" />
                            Rate Order
                          </Button>
                        </>
                      )}

                      <Link href="/track-order">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Track Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
