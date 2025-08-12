"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Truck, Phone } from "lucide-react"

interface GPSTrackerProps {
  orderId: string
  driverName: string
  vehicleInfo: string
  customerLocation: string
  estimatedArrival: string
}

export function GPSTracker({ orderId, driverName, vehicleInfo, customerLocation, estimatedArrival }: GPSTrackerProps) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 19.076,
    lng: 72.8777,
    accuracy: 5,
  })

  const [isTracking, setIsTracking] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time GPS updates
  useEffect(() => {
    if (!isTracking) return

    const interval = setInterval(() => {
      setCurrentPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        accuracy: Math.floor(Math.random() * 10) + 3,
      }))
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [isTracking])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live GPS Tracking
          </CardTitle>
          <Badge variant={isTracking ? "default" : "secondary"} className="bg-green-500">
            {isTracking ? "Live" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Driver Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Truck className="h-8 w-8 text-blue-500" />
          <div>
            <div className="font-medium">{driverName}</div>
            <div className="text-sm text-gray-600">{vehicleInfo}</div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current Location:</span>
            <span className="font-medium">
              Lat: {currentPosition.lat.toFixed(4)}, Lng: {currentPosition.lng.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Accuracy:</span>
            <span className="font-medium text-green-600">±{currentPosition.accuracy}m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Last Update:</span>
            <span className="font-medium">{lastUpdate.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ETA:</span>
            <span className="font-medium text-blue-600">{estimatedArrival}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Navigation className="h-4 w-4 mr-2" />
            Open in Maps
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Call Driver
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Tracking active • Updates every 5 seconds
        </div>
      </CardContent>
    </Card>
  )
}
