import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Fuel, Droplets, Wrench, Battery, Settings } from "lucide-react"

const categories = [
  {
    name: "Petrol",
    description: "Premium quality petrol for all vehicles",
    icon: Fuel,
    href: "/products/petrol",
    color: "bg-red-500",
  },
  {
    name: "Diesel",
    description: "High-grade diesel fuel",
    icon: Droplets,
    href: "/products/diesel",
    color: "bg-green-500",
  },
  {
    name: "Lubricants",
    description: "Engine oils, greases & lubricants",
    icon: Wrench,
    href: "/products/lubricants",
    color: "bg-yellow-500",
  },
  {
    name: "Batteries",
    description: "Automotive batteries & power solutions",
    icon: Battery,
    href: "/products/batteries",
    color: "bg-purple-500",
  },
  {
    name: "Accessories",
    description: "Other petroleum accessories",
    icon: Settings,
    href: "/products/accessories",
    color: "bg-blue-500",
  },
]

export function ProductCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Product Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of petroleum products and automotive accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
