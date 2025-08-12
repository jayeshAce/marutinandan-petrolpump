// Authentication utilities and types
export interface User {
  id: string
  email?: string
  username?: string
  name: string
  role: "customer" | "admin" | "delivery"
  phone?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user database
const mockUsers = {
  customers: [
    { id: "1", email: "customer@example.com", name: "John Doe", role: "customer" as const, phone: "9876543210" },
    { id: "2", email: "test@example.com", name: "Test User", role: "customer" as const, phone: "9876543211" },
  ],
  admin: [{ id: "admin1", username: "admin", name: "Admin User", role: "admin" as const }],
  delivery: [
    { id: "delivery1", username: "rajesh", name: "Rajesh Kumar", role: "delivery" as const, phone: "9876543212" },
    { id: "delivery2", username: "suresh", name: "Suresh Yadav", role: "delivery" as const, phone: "9876543213" },
    { id: "delivery3", username: "vikash", name: "Vikash Singh", role: "delivery" as const, phone: "9876543214" },
  ],
}

// Authentication functions
export const authenticateCustomer = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple validation - in real app, this would be server-side
  const user = mockUsers.customers.find((u) => u.email === email)
  if (user && password.length >= 6) {
    // Simple password validation
    return user
  }
  return null
}

export const registerCustomer = async (
  email: string,
  password: string,
  name: string,
  phone: string,
): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = mockUsers.customers.find((u) => u.email === email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Create new user
  const newUser: User = {
    id: `customer_${Date.now()}`,
    email,
    name,
    phone,
    role: "customer",
  }

  mockUsers.customers.push(newUser)
  return newUser
}

export const authenticateAdmin = async (username: string, password: string): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (username === "admin" && password === "admin") {
    return mockUsers.admin[0]
  }
  return null
}

export const authenticateDelivery = async (username: string, password: string): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const deliveryBoy = mockUsers.delivery.find((d) => d.username === username && password === "delivery123")
  return deliveryBoy || null
}

// Session management
export const setAuthSession = (user: User) => {
  localStorage.setItem("authUser", JSON.stringify(user))
  localStorage.setItem(`${user.role}Auth`, "true")

  if (user.role === "delivery") {
    localStorage.setItem("deliveryBoyName", user.name)
    localStorage.setItem("deliveryBoyUsername", user.username || "")
  }
}

export const getAuthSession = (): User | null => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("authUser")
  if (!userStr) return null

  try {
    const user = JSON.parse(userStr)
    // Verify session is still valid
    const authKey = `${user.role}Auth`
    if (localStorage.getItem(authKey) === "true") {
      return user
    }
  } catch (error) {
    console.error("Error parsing auth session:", error)
  }

  return null
}

export const clearAuthSession = () => {
  localStorage.removeItem("authUser")
  localStorage.removeItem("customerAuth")
  localStorage.removeItem("adminAuth")
  localStorage.removeItem("deliveryAuth")
  localStorage.removeItem("deliveryBoyName")
  localStorage.removeItem("deliveryBoyUsername")
}

export const isAuthenticated = (role?: string): boolean => {
  if (typeof window === "undefined") return false

  const user = getAuthSession()
  if (!user) return false

  if (role) {
    return user.role === role
  }

  return true
}
