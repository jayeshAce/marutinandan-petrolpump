"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Truck, MapPin, Phone, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function DeliveryTeamPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [deliveryBoys, setDeliveryBoys] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@marutinandan.com",
      status: "active",
      location: "Sector 15",
      activeOrders: 3,
      totalDeliveries: 245,
      rating: 4.8,
      joinDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Suresh Yadav",
      phone: "+91 98765 43211",
      email: "suresh@marutinandan.com",
      status: "active",
      location: "Main Market",
      activeOrders: 2,
      totalDeliveries: 189,
      rating: 4.6,
      joinDate: "Feb 2024",
    },
    {
      id: 3,
      name: "Vikash Singh",
      phone: "+91 98765 43212",
      email: "vikash@marutinandan.com",
      status: "offline",
      location: "Last seen: Sector 8",
      activeOrders: 0,
      totalDeliveries: 156,
      rating: 4.5,
      joinDate: "Mar 2024",
    },
  ])

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery Team</h1>
            <p className="text-gray-600">Manage your delivery partners and track their performance</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Delivery Partner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Delivery Partner</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Add Partner</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Partners</p>
                  <p className="text-2xl font-bold text-gray-900">{deliveryBoys.length}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Now</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deliveryBoys.filter((boy) => boy.status === "active").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deliveryBoys.reduce((sum, boy) => sum + boy.activeOrders, 0)}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.6</p>
                </div>
                <div className="text-yellow-400 text-2xl">★</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Partners List */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryBoys.map((partner) => (
                <div key={partner.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium">{partner.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{partner.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {partner.phone}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {partner.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge className={partner.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                          {partner.status === "active" ? "Active" : "Offline"}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">{partner.activeOrders} active orders</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Deliveries:</span>
                      <span className="ml-2 font-medium">{partner.totalDeliveries}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rating:</span>
                      <span className="ml-2 font-medium">{partner.rating} ★</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Joined:</span>
                      <span className="ml-2 font-medium">{partner.joinDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
