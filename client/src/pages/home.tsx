import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryCard } from "@/components/home/CategoryCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { DealsSection } from "@/components/home/DealsSection";

// Mock data for products
const featuredProducts = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1399.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 2847,
    prime: true,
    discount: 14
  },
  {
    id: 2,
    title: "Samsung 65\" 4K Smart TV",
    price: 599.99,
    originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 1523,
    prime: true,
    discount: 25
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Headphones",
    price: 329.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 3421,
    prime: true,
    discount: 18
  },
  {
    id: 4,
    title: "MacBook Air M2",
    price: 999.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 892,
    prime: true,
    discount: 17
  },
  {
    id: 5,
    title: "Nintendo Switch OLED",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 2156,
    prime: true,
    discount: 13
  },
  {
    id: 6,
    title: "Dyson V15 Vacuum",
    price: 649.99,
    originalPrice: 749.99,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 987,
    prime: true,
    discount: 13
  }
];

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=300&h=300&fit=crop",
    description: "Latest gadgets and tech"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    description: "Trending styles for everyone"
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    description: "Everything for your home"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
    description: "Gear for active lifestyle"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main>
        {/* Hero Carousel */}
        <HeroCarousel />
        
        {/* Categories Section */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <DealsSection />

        {/* Featured Products */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {featuredProducts.slice().reverse().map((product) => (
                <ProductCard key={`bestseller-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}