"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

// Mock product data - in real app this would come from API
const getProduct = (id: string) => {
  const products = [
    {
      id: 1,
      name: "Premium Petrol",
      category: "petrol",
      price: 95.5,
      unit: "per litre",
      rating: 4.8,
      reviews: 124,
      image: "/vintage-petrol-pump.png",
      badge: "Best Seller",
      description:
        "High-quality premium petrol for optimal engine performance. Our premium petrol is refined to the highest standards, ensuring clean combustion and maximum efficiency for your vehicle.",
      inStock: true,
      features: [
        "High octane rating for better performance",
        "Clean burning formula",
        "Reduces engine knock",
        "Improves fuel efficiency",
      ],
      specifications: {
        "Octane Rating": "95+",
        Density: "0.72-0.78 kg/L",
        "Sulphur Content": "< 10 ppm",
        "Lead Content": "Unleaded",
      },
    },
  ]

  return products.find((p) => p.id === Number.parseInt(id)) || products[0]
}

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProduct(params.id as string)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    console.log(`Added ${quantity} ${product.unit} of ${product.name} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.badge && <Badge className="absolute top-4 left-4 bg-orange-500">{product.badge}</Badge>}
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-gray-500 mb-2 capitalize">{product.category}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-500 ml-2">{product.unit}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} className="px-3 py-1">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-1 text-center min-w-[3rem]">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} className="px-3 py-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
                <span className="text-xs text-gray-500">On orders above ₹500</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">Quality Assured</span>
                <span className="text-xs text-gray-500">100% genuine products</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium">Easy Returns</span>
                <span className="text-xs text-gray-500">7-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
