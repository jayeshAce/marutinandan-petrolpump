"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  category: string
  price: number
  unit: string
  rating: number
  reviews: number
  image: string
  badge?: string
  description: string
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
    console.log("Added to cart:", product.name)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {product.badge && <Badge className="absolute top-2 left-2 bg-orange-500">{product.badge}</Badge>}
            {!product.inStock && <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
          </div>

          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1 capitalize">{product.category}</div>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center mb-3">
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
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
