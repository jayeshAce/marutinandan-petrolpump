"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, Plus, Edit, Trash2, Settings } from "lucide-react"

export default function DeliverySlotsPage() {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: "09:00", endTime: "11:00", isActive: true, maxOrders: 10, currentOrders: 3 },
    { id: 2, startTime: "11:00", endTime: "13:00", isActive: true, maxOrders: 10, currentOrders: 7 },
    { id: 3, startTime: "13:00", endTime: "15:00", isActive: true, maxOrders: 10, currentOrders: 5 },
    { id: 4, startTime: "15:00", endTime: "17:00", isActive: true, maxOrders: 10, currentOrders: 8 },
    { id: 5, startTime: "17:00", endTime: "19:00", isActive: false, maxOrders: 8, currentOrders: 0 },
  ])

  const [newSlot, setNewSlot] = useState({
    startTime: "",
    endTime: "",
    maxOrders: 10,
    isActive: true,
  })

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddSlot = () => {
    if (newSlot.startTime && newSlot.endTime) {
      const slot = {
        id: Date.now(),
        ...newSlot,
        currentOrders: 0,
      }
      setTimeSlots([...timeSlots, slot])
      setNewSlot({ startTime: "", endTime: "", maxOrders: 10, isActive: true })
      setIsAddDialogOpen(false)
    }
  }

  const toggleSlotStatus = (id: number) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, isActive: !slot.isActive } : slot)))
  }

  const deleteSlot = (id: number) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const getAvailabilityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "bg-red-100 text-red-800"
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delivery Slot Management</h1>
            <p className="text-gray-600">Manage delivery time slots and capacity</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Time Slot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="maxOrders">Maximum Orders</Label>
                  <Input
                    id="maxOrders"
                    type="number"
                    min="1"
                    value={newSlot.maxOrders}
                    onChange={(e) => setNewSlot({ ...newSlot, maxOrders: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={newSlot.isActive}
                    onCheckedChange={(checked) => setNewSlot({ ...newSlot, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <Button onClick={handleAddSlot} className="w-full">
                  Add Time Slot
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Delivery Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="advanceBooking">Advance Booking Days</Label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cutoffTime">Booking Cutoff Time</Label>
                <Input id="cutoffTime" type="time" defaultValue="20:00" />
              </div>
              <div>
                <Label htmlFor="emergencySlots">Emergency Slots</Label>
                <Input id="emergencySlots" type="number" defaultValue="2" min="0" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <Card key={slot.id} className={`${!slot.isActive ? "opacity-60" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <CardTitle className="text-lg">
                      {slot.startTime} - {slot.endTime}
                    </CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteSlot(slot.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={slot.isActive} onCheckedChange={() => toggleSlotStatus(slot.id)} size="sm" />
                    <Badge variant={slot.isActive ? "default" : "secondary"}>
                      {slot.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <Badge className={getAvailabilityColor(slot.currentOrders, slot.maxOrders)}>
                    {slot.currentOrders}/{slot.maxOrders}
                  </Badge>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(slot.currentOrders / slot.maxOrders) * 100}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500">{slot.maxOrders - slot.currentOrders} slots available</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Delivery Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timeSlots
                .filter((slot) => slot.isActive && slot.currentOrders > 0)
                .map((slot) => (
                  <div key={slot.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div className="text-sm text-gray-600">{slot.currentOrders} orders scheduled</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Orders
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
