"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

const featuredProducts = [
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
    description: "High-quality premium petrol for optimal engine performance",
    inStock: true,
  },
  {
    id: 2,
    name: "High Speed Diesel",
    category: "diesel",
    price: 87.2,
    unit: "per litre",
    rating: 4.7,
    reviews: 89,
    image: "/diesel-fuel.png",
    badge: "Popular",
    description: "Clean burning diesel fuel for commercial and personal vehicles",
    inStock: true,
  },
  {
    id: 3,
    name: "Castrol GTX Engine Oil",
    category: "lubricants",
    price: 450,
    unit: "per litre",
    rating: 4.9,
    reviews: 67,
    image: "/placeholder-tccll.png",
    badge: "Premium",
    description: "Superior engine protection with advanced formula",
    inStock: true,
  },
  {
    id: 4,
    name: "Exide Car Battery",
    category: "batteries",
    price: 4500,
    unit: "each",
    rating: 4.6,
    reviews: 45,
    image: "/car-battery.png",
    badge: "Warranty",
    description: "Long-lasting automotive battery with 3-year warranty",
    inStock: true,
  },
]

export function FeaturedProducts() {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular and trusted products, chosen by thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500">{product.badge}</Badge>
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1 capitalize">{product.category}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
