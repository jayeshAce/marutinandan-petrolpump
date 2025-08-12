"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Lock } from "lucide-react"

interface CardPaymentProps {
  amount: number
  orderId: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function CardPayment({ amount, orderId, onSuccess, onError }: CardPaymentProps) {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateCard = () => {
    const newErrors: Record<string, string> = {}

    if (!cardData.number || cardData.number.replace(/\s/g, "").length !== 16) {
      newErrors.number = "Please enter a valid 16-digit card number"
    }

    if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = "Please enter expiry in MM/YY format"
    }

    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = "Please enter a valid 3-digit CVV"
    }

    if (!cardData.name) {
      newErrors.name = "Please enter cardholder name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateCard()) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success/failure (90% success rate for demo)
      const success = Math.random() > 0.1

      if (success) {
        onSuccess(`CARD${Date.now()}`)
      } else {
        onError("Payment failed. Please check your card details and try again.")
      }
    } catch (error) {
      onError("Payment processing error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <CreditCard className="h-5 w-5" />
            Card Payment
          </div>

          <div className="text-center text-2xl font-bold text-blue-600">₹{amount.toFixed(2)}</div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Enter name on card"
                value={cardData.name}
                onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData((prev) => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                maxLength={19}
              />
              {errors.number && <p className="text-sm text-red-600 mt-1">{errors.number}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                  maxLength={5}
                />
                {errors.expiry && <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                  maxLength={3}
                  type="password"
                />
                {errors.cvv && <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>Your payment information is secure and encrypted</AlertDescription>
            </Alert>

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700">
              {isProcessing ? "Processing Payment..." : `Pay ₹${amount.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
