"use client"

import { DeliveryLayout } from "@/components/delivery/delivery-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Fuel } from "lucide-react"

export default function DeliveryNavigationPage() {
  const currentDelivery = {
    id: "MP2024002",
    customer: "Priya Patel",
    phone: "+91 98765 43211",
    address: "456 Park Avenue, Sector 8, City - 123456",
    items: [{ name: "High Speed Diesel", quantity: 25, unit: "litres" }],
    total: 2180.0,
    estimatedTime: "15 minutes",
    distance: "3.2 km",
    otp: "4567",
  }

  const nextDeliveries = [
    {
      id: "MP2024005",
      customer: "Amit Singh",
      address: "789 Garden Road, Sector 12, City - 123456",
      distance: "5.1 km",
      estimatedTime: "25 minutes",
    },
  ]

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-600">GPS navigation and route optimization</p>
        </div>

        {/* Current Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Current Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order #{currentDelivery.id}</div>
                <Badge className="bg-blue-500">On the Way</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="font-medium text-gray-900">{currentDelivery.customer}</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {currentDelivery.phone}
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>{currentDelivery.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentDelivery.distance}</div>
                  <div className="text-sm text-gray-600">Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentDelivery.estimatedTime}</div>
                  <div className="text-sm text-gray-600">ETA</div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-orange-800 mb-1">Delivery OTP</div>
                <div className="text-xl font-bold text-orange-800">{currentDelivery.otp}</div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-600 mb-2">GPS Navigation Map</div>
                <div className="text-gray-500 mb-4">Real-time navigation will be displayed here</div>
                <div className="text-sm text-gray-400">
                  Integration with Google Maps, Apple Maps, or similar navigation service
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Next Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            {nextDeliveries.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No more deliveries scheduled</div>
            ) : (
              <div className="space-y-3">
                {nextDeliveries.map((delivery, index) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">#{delivery.id}</div>
                      <div className="text-sm text-gray-600">{delivery.customer}</div>
                      <div className="text-xs text-gray-500">{delivery.address}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{delivery.distance}</div>
                      <div className="text-gray-500">{delivery.estimatedTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
                <Fuel className="h-6 w-6 mb-2" />
                Find Fuel Station
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
                <Phone className="h-6 w-6 mb-2" />
                Emergency Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DeliveryLayout>
  )
}
