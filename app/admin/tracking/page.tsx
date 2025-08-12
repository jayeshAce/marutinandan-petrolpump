"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Truck, Clock, Navigation } from "lucide-react"

export default function AdminTrackingPage() {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const [activeDeliveries] = useState([
    {
      id: "MP2024002",
      deliveryBoy: "Rajesh Kumar",
      customer: "Priya Patel",
      phone: "+91 98765 43210",
      vehicle: "Truck - MH 12 AB 1234",
      currentLocation: "Near Sector 10 Market",
      destination: "456 Park Avenue, Sector 8",
      estimatedArrival: "15 minutes",
      status: "on_the_way",
      orderValue: "₹2,180",
      startTime: "11:30 AM",
      gpsData: {
        lat: 19.076,
        lng: 72.8777,
        speed: "45 km/h",
        batteryLevel: "85%",
        lastPing: "2 min ago",
      },
    },
    {
      id: "MP2024004",
      deliveryBoy: "Suresh Yadav",
      customer: "Amit Singh",
      phone: "+91 98765 43211",
      vehicle: "Van - MH 12 CD 5678",
      currentLocation: "Main Road Junction",
      destination: "789 Garden Road, Sector 12",
      estimatedArrival: "25 minutes",
      status: "on_the_way",
      orderValue: "₹1,450",
      startTime: "12:00 PM",
      gpsData: {
        lat: 19.0761,
        lng: 72.8778,
        speed: "50 km/h",
        batteryLevel: "90%",
        lastPing: "1 min ago",
      },
    },
  ])

  const [allDeliveryBoys] = useState([
    {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      vehicle: "Truck - MH 12 AB 1234",
      status: "active",
      currentLocation: "Near Sector 10 Market",
      activeOrders: 1,
      todayDeliveries: 8,
    },
    {
      name: "Suresh Yadav",
      phone: "+91 98765 43211",
      vehicle: "Van - MH 12 CD 5678",
      status: "active",
      currentLocation: "Main Road Junction",
      activeOrders: 1,
      todayDeliveries: 6,
    },
    {
      name: "Vikash Singh",
      phone: "+91 98765 43212",
      vehicle: "Bike - MH 12 EF 9012",
      status: "offline",
      currentLocation: "Last seen: Sector 15",
      activeOrders: 0,
      todayDeliveries: 4,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "on_the_way":
        return "bg-blue-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">GPS Tracking</h1>
          <p className="text-gray-600">Real-time tracking of delivery vehicles and team</p>
        </div>

        {/* Live Map Placeholder */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Live Map View
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Live • Updated {lastUpdate.toLocaleTimeString()}
                </Badge>
              </CardTitle>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Full Screen
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 h-96 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200 relative">
              <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs font-medium text-gray-600">Active Vehicles</div>
                <div className="text-lg font-bold text-blue-600">{activeDeliveries.length}</div>
              </div>

              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                <div className="text-xs font-medium text-gray-600">Coverage Area</div>
                <div className="text-lg font-bold text-green-600">15 km²</div>
              </div>

              <div className="text-center">
                <div className="relative mb-4">
                  <MapPin className="h-16 w-16 text-blue-400 mx-auto" />
                  <div className="absolute top-0 right-0 flex space-x-1">
                    {activeDeliveries.map((_, index) => (
                      <div key={index} className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div className="text-xl font-semibold text-gray-600 mb-2">Interactive GPS Map</div>
                <div className="text-gray-500 mb-2">Real-time vehicle tracking with live updates</div>
                <div className="text-sm text-gray-400">
                  Integration with Google Maps • Auto-refresh every 10 seconds
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Deliveries</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setLastUpdate(new Date())}>
                  <Clock className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Order #{delivery.id}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(delivery.status)}>On the Way</Badge>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          GPS
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{delivery.deliveryBoy}</span>
                        <span className="text-gray-500">• {delivery.vehicle}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{delivery.customer}</span>
                        <span className="text-gray-500">• {delivery.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Current: {delivery.currentLocation}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Going to: {delivery.destination}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-green-600 font-medium">ETA: {delivery.estimatedArrival}</span>
                      </div>
                    </div>

                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="font-medium">{delivery.gpsData.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Battery:</span>
                        <span className="font-medium">{delivery.gpsData.batteryLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Ping:</span>
                        <span className="font-medium text-green-600">{delivery.gpsData.lastPing}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <span className="font-medium text-blue-600">{delivery.orderValue}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MapPin className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {activeDeliveries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No active deliveries at the moment</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Team Status */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Team Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allDeliveryBoys.map((boy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{boy.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{boy.name}</div>
                          <div className="text-sm text-gray-500">{boy.vehicle}</div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(boy.status)}>
                        {boy.status === "active" ? "Active" : "Offline"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{boy.currentLocation}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{boy.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div className="text-sm">
                        <span className="text-gray-500">Active: </span>
                        <span className="font-medium">{boy.activeOrders}</span>
                        <span className="text-gray-500 ml-3">Today: </span>
                        <span className="font-medium">{boy.todayDeliveries}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MapPin className="h-4 w-4 mr-1" />
                          Locate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
