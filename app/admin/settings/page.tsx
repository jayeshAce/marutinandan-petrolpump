"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Store, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [settings, setSettings] = useState({
    storeName: "Marutinandan Petrolpump",
    storeAddress: "Main Road, Sector 15, Gurgaon, Haryana",
    contactPhone: "+91 98765 43210",
    contactEmail: "info@marutinandan.com",
    gstNumber: "07ABCDE1234F1Z5",
    notifications: {
      orderAlerts: true,
      lowStockAlerts: true,
      deliveryUpdates: true,
      customerMessages: false,
    },
    delivery: {
      freeDeliveryThreshold: 500,
      deliveryCharges: 50,
      maxDeliveryRadius: 15,
    },
    payment: {
      codEnabled: true,
      upiEnabled: true,
      cardEnabled: true,
      minimumOrderAmount: 100,
    },
  })

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

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your petrol pump settings and configurations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => handleInputChange("", "storeName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => handleInputChange("", "storeAddress", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange("", "contactPhone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("", "contactEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={settings.gstNumber}
                  onChange={(e) => handleInputChange("", "gstNumber", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="orderAlerts">Order Alerts</Label>
                <Switch
                  id="orderAlerts"
                  checked={settings.notifications.orderAlerts}
                  onCheckedChange={(checked) => handleInputChange("notifications", "orderAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                <Switch
                  id="lowStockAlerts"
                  checked={settings.notifications.lowStockAlerts}
                  onCheckedChange={(checked) => handleInputChange("notifications", "lowStockAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="deliveryUpdates">Delivery Updates</Label>
                <Switch
                  id="deliveryUpdates"
                  checked={settings.notifications.deliveryUpdates}
                  onCheckedChange={(checked) => handleInputChange("notifications", "deliveryUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="customerMessages">Customer Messages</Label>
                <Switch
                  id="customerMessages"
                  checked={settings.notifications.customerMessages}
                  onCheckedChange={(checked) => handleInputChange("notifications", "customerMessages", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Delivery Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="freeDeliveryThreshold">Free Delivery Threshold (₹)</Label>
                <Input
                  id="freeDeliveryThreshold"
                  type="number"
                  value={settings.delivery.freeDeliveryThreshold}
                  onChange={(e) =>
                    handleInputChange("delivery", "freeDeliveryThreshold", Number.parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <Label htmlFor="deliveryCharges">Delivery Charges (₹)</Label>
                <Input
                  id="deliveryCharges"
                  type="number"
                  value={settings.delivery.deliveryCharges}
                  onChange={(e) => handleInputChange("delivery", "deliveryCharges", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="maxDeliveryRadius">Max Delivery Radius (km)</Label>
                <Input
                  id="maxDeliveryRadius"
                  type="number"
                  value={settings.delivery.maxDeliveryRadius}
                  onChange={(e) => handleInputChange("delivery", "maxDeliveryRadius", Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="codEnabled">Cash on Delivery</Label>
                <Switch
                  id="codEnabled"
                  checked={settings.payment.codEnabled}
                  onCheckedChange={(checked) => handleInputChange("payment", "codEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="upiEnabled">UPI Payments</Label>
                <Switch
                  id="upiEnabled"
                  checked={settings.payment.upiEnabled}
                  onCheckedChange={(checked) => handleInputChange("payment", "upiEnabled", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cardEnabled">Card Payments</Label>
                <Switch
                  id="cardEnabled"
                  checked={settings.payment.cardEnabled}
                  onCheckedChange={(checked) => handleInputChange("payment", "cardEnabled", checked)}
                />
              </div>
              <div>
                <Label htmlFor="minimumOrderAmount">Minimum Order Amount (₹)</Label>
                <Input
                  id="minimumOrderAmount"
                  type="number"
                  value={settings.payment.minimumOrderAmount}
                  onChange={(e) => handleInputChange("payment", "minimumOrderAmount", Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Save Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
