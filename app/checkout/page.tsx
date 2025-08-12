"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Smartphone, Banknote, MapPin, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { UPIPayment } from "@/components/payment/upi-payment"
import { CardPayment } from "@/components/payment/card-payment"

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [deliveryTime, setDeliveryTime] = useState("scheduled")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    instructions: "",
  })

  const cartItems = [
    { name: "Premium Petrol", quantity: 10, price: 95.5, unit: "litres" },
    { name: "Castrol GTX Engine Oil", quantity: 2, price: 450, unit: "litres" },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 0
  const gst = subtotal * 0.18
  const total = subtotal + deliveryFee + gst

  const getAvailableDates = () => {
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      })
    }
    return dates
  }

  const timeSlots = [
    { value: "09:00-11:00", label: "9:00 AM - 11:00 AM" },
    { value: "11:00-13:00", label: "11:00 AM - 1:00 PM" },
    { value: "13:00-15:00", label: "1:00 PM - 3:00 PM" },
    { value: "15:00-17:00", label: "3:00 PM - 5:00 PM" },
    { value: "17:00-19:00", label: "5:00 PM - 7:00 PM" },
  ]

  const validateForm = () => {
    const required = ["firstName", "lastName", "address", "city", "pincode", "phone"]
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        setPaymentError(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        return false
      }
    }
    if (formData.pincode.length !== 6) {
      setPaymentError("Please enter a valid 6-digit PIN code")
      return false
    }
    if (formData.phone.length !== 10) {
      setPaymentError("Please enter a valid 10-digit phone number")
      return false
    }
    if (deliveryTime === "scheduled" && (!selectedDate || !selectedTimeSlot)) {
      setPaymentError("Please select delivery date and time slot")
      return false
    }
    return true
  }

  const handlePlaceOrder = async () => {
    setPaymentError("")

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Generate order ID
      const orderId = `MP${Date.now()}`

      if (paymentMethod === "cod") {
        // COD order processing
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

        const orderData = {
          orderId,
          items: cartItems,
          total,
          paymentMethod: "Cash on Delivery",
          deliveryAddress: formData,
          deliveryTime,
          deliverySlot:
            deliveryTime === "scheduled"
              ? {
                  date: selectedDate,
                  timeSlot: selectedTimeSlot,
                }
              : null,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        }

        localStorage.setItem("currentOrder", JSON.stringify(orderData))
        router.push(`/order-confirmation?orderId=${orderId}`)
      } else if (paymentMethod === "upi") {
        // UPI payment will be handled by UPIPayment component
        return
      } else if (paymentMethod === "card") {
        // Card payment will be handled by CardPayment component
        return
      }
    } catch (error) {
      setPaymentError("Failed to process order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setPaymentError("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Alert */}
            {paymentError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{paymentError}</AlertDescription>
              </Alert>
            )}

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      placeholder="Enter PIN code"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      maxLength={6}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special instructions for delivery"
                    value={formData.instructions}
                    onChange={(e) => handleInputChange("instructions", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Delivery Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="flex-1">
                      <div>
                        <div className="font-medium">Scheduled Delivery</div>
                        <div className="text-sm text-gray-500">Choose your preferred date and time • Free</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1">
                      <div>
                        <div className="font-medium">Standard Delivery</div>
                        <div className="text-sm text-gray-500">Within 2-4 hours • Free</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryTime === "scheduled" && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 font-medium">
                      <Calendar className="h-4 w-4" />
                      Select Delivery Slot
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deliveryDate">Delivery Date *</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableDates().map((date) => (
                              <SelectItem key={date.value} value={date.value}>
                                {date.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeSlot">Time Slot *</Label>
                        <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value}>
                                {slot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Cash on Delivery
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      UPI Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "upi" && (
                  <UPIPayment
                    amount={total}
                    orderId={`MP${Date.now()}`}
                    onSuccess={(transactionId) => {
                      const orderData = {
                        orderId: `MP${Date.now()}`,
                        items: cartItems,
                        total,
                        paymentMethod: "UPI",
                        transactionId,
                        deliveryAddress: formData,
                        deliveryTime,
                        deliverySlot:
                          deliveryTime === "scheduled"
                            ? {
                                date: selectedDate,
                                timeSlot: selectedTimeSlot,
                              }
                            : null,
                        status: "paid",
                        createdAt: new Date().toISOString(),
                      }
                      localStorage.setItem("currentOrder", JSON.stringify(orderData))
                      router.push(`/order-confirmation?orderId=${orderData.orderId}`)
                    }}
                    onError={(error) => setPaymentError(error)}
                  />
                )}

                {paymentMethod === "card" && (
                  <CardPayment
                    amount={total}
                    orderId={`MP${Date.now()}`}
                    onSuccess={(transactionId) => {
                      const orderData = {
                        orderId: `MP${Date.now()}`,
                        items: cartItems,
                        total,
                        paymentMethod: "Card",
                        transactionId,
                        deliveryAddress: formData,
                        deliveryTime,
                        deliverySlot:
                          deliveryTime === "scheduled"
                            ? {
                                date: selectedDate,
                                timeSlot: selectedTimeSlot,
                              }
                            : null,
                        status: "paid",
                        createdAt: new Date().toISOString(),
                      }
                      localStorage.setItem("currentOrder", JSON.stringify(orderData))
                      router.push(`/order-confirmation?orderId=${orderData.orderId}`)
                    }}
                    onError={(error) => setPaymentError(error)}
                  />
                )}

                {paymentMethod === "cod" && (
                  <Alert className="mt-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Pay cash to our delivery partner when your order arrives. Please keep exact change ready.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} {item.unit} × ₹{item.price}
                        </div>
                      </div>
                      <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                        {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  {paymentMethod === "cod" && (
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  )}

                  <div className="text-xs text-gray-500 text-center mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
