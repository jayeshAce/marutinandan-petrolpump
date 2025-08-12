"use client"

import { useState } from "react"
import { DeliveryLayout } from "@/components/delivery/delivery-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Phone, Navigation, CheckCircle, Clock } from "lucide-react"

export default function DeliveryOrdersPage() {
  const [orders] = useState([
    {
      id: "MP2024002",
      customer: "Priya Patel",
      phone: "+91 98765 43211",
      address: "456 Park Avenue, Sector 8, City - 123456",
      items: [{ name: "High Speed Diesel", quantity: 25, unit: "litres" }],
      total: 2180.0,
      status: "on_the_way",
      assignedTime: "11:00 AM",
      startedTime: "11:15 AM",
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
      otp: "8901",
    },
    {
      id: "MP2024001",
      customer: "Rajesh Sharma",
      phone: "+91 98765 43210",
      address: "123 Main Street, Sector 15, City - 123456",
      items: [
        { name: "Premium Petrol", quantity: 10, unit: "litres" },
        { name: "Castrol GTX Engine Oil", quantity: 2, unit: "litres" },
      ],
      total: 1855.0,
      status: "delivered",
      assignedTime: "9:30 AM",
      startedTime: "9:45 AM",
      deliveredTime: "10:30 AM",
      otp: "1234",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deliveryOtp, setDeliveryOtp] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-yellow-500"
      case "on_the_way":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "assigned":
        return "Assigned"
      case "on_the_way":
        return "On the Way"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    // In a real app, this would update the order status via API
  }

  const handleCompleteDelivery = (orderId: string, otp: string) => {
    if (otp === selectedOrder?.otp) {
      handleStatusUpdate(orderId, "delivered")
      setDeliveryOtp("")
      alert("Delivery completed successfully!")
    } else {
      alert("Invalid OTP. Please check with the customer.")
    }
  }

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Manage your assigned deliveries and track progress</p>
        </div>

        {/* Order Status Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter((o) => o.status === "assigned").length}
              </div>
              <div className="text-sm text-gray-600">Assigned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter((o) => o.status === "on_the_way").length}
              </div>
              <div className="text-sm text-gray-600">On the Way</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter((o) => o.status === "delivered").length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Order #{order.id}</div>
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
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
                        Assigned: {order.assignedTime}
                        {order.startedTime && ` • Started: ${order.startedTime}`}
                        {order.deliveredTime && ` • Delivered: ${order.deliveredTime}`}
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

                  <div className="flex space-x-2">
                    {order.status === "assigned" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleStatusUpdate(order.id, "on_the_way")}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Start Delivery
                      </Button>
                    )}

                    {order.status === "on_the_way" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete Delivery
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Complete Delivery - #{order.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-2">
                                Ask the customer for their delivery OTP and enter it below to complete the delivery:
                              </p>
                              <Input
                                placeholder="Enter customer's OTP"
                                value={deliveryOtp}
                                onChange={(e) => setDeliveryOtp(e.target.value)}
                                maxLength={4}
                                className="text-center text-lg font-mono"
                              />
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-sm text-blue-800">
                                <strong>Security Note:</strong> The customer has received a 4-digit OTP. Ask them to
                                provide it to verify the delivery.
                              </div>
                            </div>
                            <Button
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={() => handleCompleteDelivery(order.id, deliveryOtp)}
                              disabled={deliveryOtp.length !== 4}
                            >
                              Complete Delivery
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Customer
                    </Button>

                    {order.status !== "delivered" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <MapPin className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DeliveryLayout>
  )
}
