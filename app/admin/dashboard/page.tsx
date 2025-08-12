"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Users, Truck, DollarSign, TrendingUp, MapPin } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const stats = [
    {
      title: "Total Orders",
      value: "156",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Delivery Boys",
      value: "8",
      change: "0%",
      icon: Truck,
      color: "text-orange-600",
    },
    {
      title: "Today's Revenue",
      value: "₹45,230",
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  const recentOrders = [
    {
      id: "MP2024001",
      customer: "Rajesh Sharma",
      items: "Premium Petrol (10L), Engine Oil (2L)",
      amount: "₹1,855",
      status: "delivered",
      time: "2 hours ago",
    },
    {
      id: "MP2024002",
      customer: "Priya Patel",
      items: "Diesel (25L)",
      amount: "₹2,180",
      status: "on_the_way",
      time: "30 minutes ago",
    },
    {
      id: "MP2024003",
      customer: "Amit Kumar",
      items: "Car Battery, Mobil Oil",
      amount: "₹5,150",
      status: "preparing",
      time: "1 hour ago",
    },
  ]

  const deliveryBoys = [
    {
      name: "Rajesh Kumar",
      status: "active",
      location: "Sector 15",
      orders: 3,
      phone: "+91 98765 43210",
    },
    {
      name: "Suresh Yadav",
      status: "active",
      location: "Main Market",
      orders: 2,
      phone: "+91 98765 43211",
    },
    {
      name: "Vikash Singh",
      status: "offline",
      location: "Last seen: Sector 8",
      orders: 0,
      phone: "+91 98765 43212",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "on_the_way":
        return "bg-blue-500"
      case "preparing":
        return "bg-yellow-500"
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
      default:
        return "Unknown"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your petrol pump.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">#{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.items}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-green-600">{order.amount}</span>
                        <span className="text-xs text-gray-400">{order.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => router.push("/admin/orders")}
              >
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Boys Status */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Team Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryBoys.map((boy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{boy.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{boy.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {boy.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={boy.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {boy.status === "active" ? "Active" : "Offline"}
                      </Badge>
                      <div className="text-sm text-gray-500 mt-1">{boy.orders} active orders</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => router.push("/admin/delivery")}
              >
                Manage Delivery Team
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/admin/products")}
              >
                <Package className="h-6 w-6 mb-2" />
                Add Product
              </Button>
              <Button
                className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/admin/customers")}
              >
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
              <Button
                className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700"
                onClick={() => router.push("/admin/delivery")}
              >
                <Truck className="h-6 w-6 mb-2" />
                Assign Delivery
              </Button>
              <Button
                className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push("/admin/reports")}
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
