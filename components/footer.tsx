import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl">Fuel at Door Step</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for doorstep delivery of premium petroleum products and automotive accessories.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">24/7 Service Available</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/petrol" className="text-gray-400 hover:text-white">
                  Petrol
                </Link>
              </li>
              <li>
                <Link href="/products/diesel" className="text-gray-400 hover:text-white">
                  Diesel
                </Link>
              </li>
              <li>
                <Link href="/products/lubricants" className="text-gray-400 hover:text-white">
                  Lubricants
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-white">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-white">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link href="/delivery/login" className="text-gray-400 hover:text-white">
                  Delivery Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@marutinandan.com</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm">
                  Fuel at Door Step
                  <br />
                  Main Road, City - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Fuel at Door Step. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
