"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

const allProducts = [
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
  {
    id: 5,
    name: "Mobil 1 Synthetic Oil",
    category: "lubricants",
    price: 650,
    unit: "per litre",
    rating: 4.8,
    reviews: 92,
    image: "/mobil-oil-bottle.png",
    badge: "Premium",
    description: "Full synthetic motor oil for maximum engine protection",
    inStock: true,
  },
  {
    id: 6,
    name: "Amaron Battery",
    category: "batteries",
    price: 3800,
    unit: "each",
    rating: 4.5,
    reviews: 78,
    image: "/car-battery.png",
    badge: "Popular",
    description: "Maintenance-free automotive battery",
    inStock: false,
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600">Browse our complete range of petroleum products and accessories</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="lubricants">Lubricants</SelectItem>
                <SelectItem value="batteries">Batteries</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
