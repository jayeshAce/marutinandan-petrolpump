"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch from API
    const storedOrder = localStorage.getItem("currentOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    }
  }, [])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Loading order details...</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We'll deliver it to you soon.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Order ID:</span>
                    <span className="text-blue-600 font-mono">{orderData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Method:</span>
                    <span>{orderData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Order Status:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {orderData.status === "paid" ? "Payment Confirmed" : "Order Confirmed"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery OTP:</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono text-lg font-bold">
                      {orderData.otp || "1234"}
                    </span>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Share this OTP with the delivery partner to complete your order
                      delivery.
                    </p>
                  </div>
                  {orderData.transactionId && (
                    <div className="flex justify-between">
                      <span className="font-medium">Transaction ID:</span>
                      <span className="font-mono text-sm">{orderData.transactionId}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {orderData.deliveryAddress.firstName} {orderData.deliveryAddress.lastName}
                  </p>
                  <p className="text-gray-600">{orderData.deliveryAddress.address}</p>
                  <p className="text-gray-600">
                    {orderData.deliveryAddress.city}, {orderData.deliveryAddress.pincode}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    {orderData.deliveryAddress.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Preparing Order</p>
                      <p className="text-sm text-gray-400">Within 30 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Truck className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Out for Delivery</p>
                      <p className="text-sm text-gray-400">
                        {orderData.deliveryTime === "express" ? "Within 1 hour" : "Within 2-4 hours"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} {item.unit} × ₹{item.price}
                        </div>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span>₹{orderData.total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href={`/track-order?orderId=${orderData.orderId}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Track Your Order</Button>
                    </Link>
                    <Link href="/products">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
