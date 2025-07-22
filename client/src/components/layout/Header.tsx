import { useState } from "react";
import { Link } from "wouter";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  MapPin, 
  ChevronDown,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Departments",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty"
  ];

  return (
    <header className="bg-gray-900 text-white">
      {/* Main Header */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">
                  amazon
                  <span className="text-orange-400">.com</span>
                </div>
              </div>
            </Link>

            {/* Delivery Location */}
            <div className="hidden md:flex items-center space-x-1 text-sm">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs text-gray-300">Deliver to</div>
                <div className="font-semibold">New York 10001</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="flex">
                <select className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md text-sm border-r border-gray-300">
                  <option>All</option>
                  {categories.slice(1).map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <Input
                  type="text"
                  placeholder="Search Amazon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-none border-none focus:ring-0"
                />
                <Button className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              {/* Language */}
              <div className="hidden md:flex items-center space-x-1 text-sm">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-3" />
                <span>EN</span>
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Account */}
              <Link href="/account">
                <div className="flex flex-col text-sm">
                  <span className="text-xs">Hello, sign in</span>
                  <span className="font-semibold">Account & Lists</span>
                </div>
              </Link>

              {/* Orders */}
              <Link href="/orders">
                <div className="flex flex-col text-sm">
                  <span className="text-xs">Returns</span>
                  <span className="font-semibold">& Orders</span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist">
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Wishlist</span>
                </div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-orange-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      3
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm font-semibold">Cart</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12 space-x-6">
            {/* All Menu */}
            <button 
              className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-4 h-4" />
              <span className="text-sm font-semibold">All</span>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="/deals" className="hover:text-orange-400">Today's Deals</Link>
              <Link href="/customer-service" className="hover:text-orange-400">Customer Service</Link>
              <Link href="/registry" className="hover:text-orange-400">Registry</Link>
              <Link href="/gift-cards" className="hover:text-orange-400">Gift Cards</Link>
              <Link href="/sell" className="hover:text-orange-400">Sell</Link>
            </nav>

            {/* Prime */}
            <div className="ml-auto">
              <Link href="/prime" className="text-sm hover:text-orange-400">
                <span className="font-bold text-blue-400">prime</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-80 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Shop by Department</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <span className="text-2xl text-gray-600">&times;</span>
              </button>
            </div>
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link 
                  key={category} 
                  href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block py-2 text-gray-700 hover:text-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}