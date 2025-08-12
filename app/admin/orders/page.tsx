"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Truck, MapPin, Phone } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "MP2024001",
      customer: "Rajesh Sharma",
      phone: "+91 98765 43210",
      items: [
        { name: "Premium Petrol", quantity: 10, unit: "litres", price: 95.5 },
        { name: "Castrol GTX Engine Oil", quantity: 2, unit: "litres", price: 450 },
      ],
      total: 1855.0,
      status: "delivered",
      assignedTo: "Rajesh Kumar",
      address: "123 Main Street, Sector 15, City - 123456",
      orderTime: "2024-01-15 10:30 AM",
      deliveryTime: "2024-01-15 12:30 PM",
    },
    {
      id: "MP2024002",
      customer: "Priya Patel",
      phone: "+91 98765 43211",
      items: [{ name: "High Speed Diesel", quantity: 25, unit: "litres", price: 87.2 }],
      total: 2180.0,
      status: "on_the_way",
      assignedTo: "Suresh Yadav",
      address: "456 Park Avenue, Sector 8, City - 123456",
      orderTime: "2024-01-15 11:00 AM",
      deliveryTime: null,
    },
    {
      id: "MP2024003",
      customer: "Amit Kumar",
      phone: "+91 98765 43212",
      items: [
        { name: "Exide Car Battery", quantity: 1, unit: "piece", price: 4500 },
        { name: "Mobil 1 Synthetic Oil", quantity: 1, unit: "litre", price: 650 },
      ],
      total: 5150.0,
      status: "preparing",
      assignedTo: null,
      address: "789 Garden Road, Sector 12, City - 123456",
      orderTime: "2024-01-15 11:30 AM",
      deliveryTime: null,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const deliveryBoys = [
    { id: 1, name: "Rajesh Kumar", status: "active" },
    { id: 2, name: "Suresh Yadav", status: "active" },
    { id: 3, name: "Vikash Singh", status: "offline" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "on_the_way":
        return "bg-blue-500"
      case "preparing":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "on_the_way":
        return "On the Way"
      case "preparing":
        return "Preparing"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  const handleAssignDelivery = (orderId: string, deliveryBoy: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, assignedTo: deliveryBoy, status: order.status === "preparing" ? "on_the_way" : order.status }
          : order,
      ),
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Monitor and manage all customer orders</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="on_the_way">On the Way</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">{filteredOrders.length} orders found</div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Assigned To</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium">#{order.id}</div>
                        <div className="text-sm text-gray-500">{order.orderTime}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {order.phone}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.name} ({item.quantity} {item.unit})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">₹{order.total.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        {order.assignedTo ? (
                          <div className="text-sm">
                            <div className="font-medium">{order.assignedTo}</div>
                            <div className="text-gray-500">Assigned</div>
                          </div>
                        ) : (
                          <Badge variant="outline">Unassigned</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - #{order.id}</DialogTitle>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Customer Information</h4>
                                      <div className="text-sm space-y-1">
                                        <div>Name: {selectedOrder.customer}</div>
                                        <div>Phone: {selectedOrder.phone}</div>
                                        <div>Address: {selectedOrder.address}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Order Information</h4>
                                      <div className="text-sm space-y-1">
                                        <div>Order Time: {selectedOrder.orderTime}</div>
                                        <div>Status: {getStatusText(selectedOrder.status)}</div>
                                        <div>Total: ₹{selectedOrder.total.toFixed(2)}</div>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Items</h4>
                                    <div className="space-y-2">
                                      {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                          <span>
                                            {item.name} - {item.quantity} {item.unit}
                                          </span>
                                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {!selectedOrder.assignedTo && (
                                    <div>
                                      <h4 className="font-medium mb-2">Assign Delivery Boy</h4>
                                      <div className="space-y-2">
                                        {deliveryBoys
                                          .filter((boy) => boy.status === "active")
                                          .map((boy) => (
                                            <Button
                                              key={boy.id}
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleAssignDelivery(selectedOrder.id, boy.name)}
                                              className="mr-2 bg-transparent"
                                            >
                                              <Truck className="h-4 w-4 mr-2" />
                                              Assign to {boy.name}
                                            </Button>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {order.assignedTo && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
