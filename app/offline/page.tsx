"use client"

import { Wifi, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Wifi className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're Offline</h1>
          <p className="text-gray-600">
            It looks like you've lost your internet connection. Some features may not be available.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Go to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> You can still browse previously visited pages while offline.
          </p>
        </div>
      </div>
    </div>
  )
}
