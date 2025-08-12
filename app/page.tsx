import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
      </main>
      <Footer />
      <PWAInstallPrompt />
    </div>
  )
}
