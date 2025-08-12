"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Phone, Mail, MapPin, Calendar } from "lucide-react"

export default function AdminCustomersPage() {
  const [customers] = useState([
    {
      id: 1,
      name: "Rajesh Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 98765 43210",
      address: "123 Main Street, Sector 15, City - 123456",
      joinDate: "2024-01-10",
      totalOrders: 15,
      totalSpent: 18500,
      lastOrder: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 98765 43211",
      address: "456 Park Avenue, Sector 8, City - 123456",
      joinDate: "2024-01-05",
      totalOrders: 8,
      totalSpent: 12300,
      lastOrder: "2024-01-14",
      status: "active",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      phone: "+91 98765 43212",
      address: "789 Garden Road, Sector 12, City - 123456",
      joinDate: "2023-12-20",
      totalOrders: 22,
      totalSpent: 28900,
      lastOrder: "2024-01-13",
      status: "vip",
    },
    {
      id: 4,
      name: "Sunita Singh",
      email: "sunita.singh@email.com",
      phone: "+91 98765 43213",
      address: "321 Market Street, Sector 5, City - 123456",
      joinDate: "2024-01-01",
      totalOrders: 3,
      totalSpent: 2800,
      lastOrder: "2024-01-08",
      status: "new",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-purple-500"
      case "active":
        return "bg-green-500"
      case "new":
        return "bg-blue-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "vip":
        return "VIP"
      case "active":
        return "Active"
      case "new":
        return "New"
      case "inactive":
        return "Inactive"
      default:
        return "Unknown"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage and view customer information and order history</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-600">{filteredCustomers.length} customers found</div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.filter((c) => c.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.filter((c) => c.status === "new").length}
              </div>
              <div className="text-sm text-gray-600">New This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {customers.filter((c) => c.status === "vip").length}
              </div>
              <div className="text-sm text-gray-600">VIP Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Orders</th>
                    <th className="text-left py-3 px-4">Total Spent</th>
                    <th className="text-left py-3 px-4">Last Order</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">
                            Joined {new Date(customer.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium">{customer.totalOrders}</td>
                      <td className="py-4 px-4 font-medium text-green-600">₹{customer.totalSpent.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Customer Details - {customer.name}</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium mb-3">Personal Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        {selectedCustomer.email}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        {selectedCustomer.phone}
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <span>{selectedCustomer.address}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-3">Order Statistics</h4>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Orders:</span>
                                        <span className="font-medium">{selectedCustomer.totalOrders}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Total Spent:</span>
                                        <span className="font-medium text-green-600">
                                          ₹{selectedCustomer.totalSpent.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Average Order:</span>
                                        <span className="font-medium">
                                          ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Last Order:</span>
                                        <span className="font-medium">
                                          {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge className={getStatusColor(selectedCustomer.status)}>
                                          {getStatusText(selectedCustomer.status)}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex space-x-3 pt-4 border-t">
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call Customer
                                  </Button>
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Email
                                  </Button>
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    View Order History
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
