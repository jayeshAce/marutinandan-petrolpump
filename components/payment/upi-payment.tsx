"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, Smartphone } from "lucide-react"
import QRCode from "qrcode"

interface UPIPaymentProps {
  amount: number
  orderId: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function UPIPayment({ amount, orderId, onSuccess, onError }: UPIPaymentProps) {
  const [qrCode, setQrCode] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  useEffect(() => {
    generateQRCode()
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onError("Payment timeout. Please try again.")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const generateQRCode = async () => {
    try {
      // UPI payment string format
      const upiString = `upi://pay?pa=marutinandan@paytm&pn=Marutinandan Petrolpump&am=${amount}&cu=INR&tn=Order ${orderId}`
      const qrCodeDataURL = await QRCode.toDataURL(upiString)
      setQrCode(qrCodeDataURL)
    } catch (error) {
      onError("Failed to generate QR code")
    }
  }

  const simulatePayment = () => {
    setPaymentStatus("processing")
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate for demo
      if (success) {
        setPaymentStatus("success")
        onSuccess(`UPI${Date.now()}`)
      } else {
        setPaymentStatus("failed")
        onError("Payment failed. Please try again.")
      }
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <Smartphone className="h-5 w-5" />
            UPI Payment
          </div>

          <div className="text-2xl font-bold text-blue-600">₹{amount.toFixed(2)}</div>

          {paymentStatus === "pending" && (
            <>
              <div className="bg-gray-100 p-4 rounded-lg">
                {qrCode && <img src={qrCode || "/placeholder.svg"} alt="UPI QR Code" className="mx-auto w-48 h-48" />}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Scan QR code with any UPI app or use UPI ID: <strong>marutinandan@paytm</strong>
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-orange-600">
                  <Clock className="h-4 w-4" />
                  Time remaining: {formatTime(timeLeft)}
                </div>
              </div>

              <Button onClick={simulatePayment} className="w-full">
                I have made the payment
              </Button>
            </>
          )}

          {paymentStatus === "processing" && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-blue-600">Verifying payment...</p>
            </div>
          )}

          {paymentStatus === "success" && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Payment successful! Redirecting...</AlertDescription>
            </Alert>
          )}

          {paymentStatus === "failed" && (
            <Alert variant="destructive">
              <AlertDescription>Payment failed. Please try again.</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
