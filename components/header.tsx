"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Menu, X, LogOut, Package, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItems = getCartItemsCount()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Fuel at Door Step</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>
            <Link href="/products/petrol" className="text-gray-700 hover:text-blue-600 font-medium">
              Petrol
            </Link>
            <Link href="/products/diesel" className="text-gray-700 hover:text-blue-600 font-medium">
              Diesel
            </Link>
            <Link href="/products/lubricants" className="text-gray-700 hover:text-blue-600 font-medium">
              Lubricants
            </Link>
            <Link href="/products/batteries" className="text-gray-700 hover:text-blue-600 font-medium">
              Batteries
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-24 truncate">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                All Products
              </Link>
              <Link href="/products/petrol" className="text-gray-700 hover:text-blue-600 font-medium">
                Petrol
              </Link>
              <Link href="/products/diesel" className="text-gray-700 hover:text-blue-600 font-medium">
                Diesel
              </Link>
              <Link href="/products/lubricants" className="text-gray-700 hover:text-blue-600 font-medium">
                Lubricants
              </Link>
              <Link href="/products/batteries" className="text-gray-700 hover:text-blue-600 font-medium">
                Batteries
              </Link>

              {isAuthenticated && user ? (
                <>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-2">{user.name}</p>
                    <Link href="/orders" className="text-gray-700 hover:text-blue-600 font-medium block">
                      My Orders
                    </Link>
                    <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium block mt-2">
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 font-medium block mt-2 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
