"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, DollarSign, Package, Users, Download } from "lucide-react"

export default function AdminReportsPage() {
  const salesData = [
    { month: "Jan", revenue: 45000, orders: 120, customers: 89 },
    { month: "Feb", revenue: 52000, orders: 145, customers: 102 },
    { month: "Mar", revenue: 48000, orders: 132, customers: 95 },
    { month: "Apr", revenue: 61000, orders: 168, customers: 118 },
    { month: "May", revenue: 58000, orders: 156, customers: 112 },
    { month: "Jun", revenue: 67000, orders: 189, customers: 134 },
  ]

  const topProducts = [
    { name: "Premium Petrol", sales: "₹2,45,000", quantity: "2,500 L", percentage: 35 },
    { name: "High Speed Diesel", sales: "₹1,89,000", quantity: "2,100 L", percentage: 28 },
    { name: "Castrol GTX Engine Oil", sales: "₹67,500", quantity: "150 L", percentage: 15 },
    { name: "Exide Car Battery", sales: "₹45,000", quantity: "10 pieces", percentage: 12 },
    { name: "Mobil 1 Synthetic Oil", sales: "₹32,500", quantity: "50 L", percentage: 10 },
  ]

  const deliveryStats = [
    { metric: "Total Deliveries", value: "1,234", change: "+12%" },
    { metric: "On-Time Delivery", value: "94.5%", change: "+2.1%" },
    { metric: "Average Delivery Time", value: "45 min", change: "-5 min" },
    { metric: "Customer Satisfaction", value: "4.8/5", change: "+0.2" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
          </div>

          <div className="flex items-center space-x-4">
            <Select defaultValue="last-30-days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹3,31,000</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +18% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">1,010</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold text-gray-900">650</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹328</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5% from last month
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-semibold text-gray-600 mb-2">Sales Chart</div>
                  <div className="text-gray-500">Interactive sales chart will be displayed here</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Integration with charting library (Chart.js, Recharts)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{product.name}</span>
                        <span className="text-sm font-bold text-green-600">{product.sales}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{product.quantity}</span>
                        <span className="text-xs text-gray-500">{product.percentage}% of total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${product.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {deliveryStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.metric}</div>
                  <div className="text-sm text-green-600">{stat.change}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium">New order from Rajesh Sharma</div>
                  <div className="text-sm text-gray-500">Premium Petrol (10L) - ₹955</div>
                </div>
                <div className="text-sm text-gray-400">2 minutes ago</div>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium">Delivery completed by Suresh Yadav</div>
                  <div className="text-sm text-gray-500">Order #MP2024001 delivered successfully</div>
                </div>
                <div className="text-sm text-gray-400">15 minutes ago</div>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <div className="font-medium">Low stock alert</div>
                  <div className="text-sm text-gray-500">Exide Car Battery - Only 5 units remaining</div>
                </div>
                <div className="text-sm text-gray-400">1 hour ago</div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">New customer registration</div>
                  <div className="text-sm text-gray-500">Priya Patel joined the platform</div>
                </div>
                <div className="text-sm text-gray-400">2 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
