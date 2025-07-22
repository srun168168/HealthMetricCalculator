import { Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function DealsSection() {
  const deals = [
    {
      id: 1,
      title: "Lightning Deal",
      product: "Wireless Earbuds",
      originalPrice: 199.99,
      salePrice: 79.99,
      discount: 60,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
      timeLeft: "2h 15m",
      claimed: 42,
      total: 100
    },
    {
      id: 2,
      title: "Deal of the Day",
      product: "Smart Watch",
      originalPrice: 299.99,
      salePrice: 149.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      timeLeft: "18h 43m",
      claimed: 78,
      total: 150
    },
    {
      id: 3,
      title: "Flash Sale",
      product: "Bluetooth Speaker",
      originalPrice: 129.99,
      salePrice: 49.99,
      discount: 62,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
      timeLeft: "4h 22m",
      claimed: 156,
      total: 200
    },
    {
      id: 4,
      title: "Limited Time",
      product: "Laptop Stand",
      originalPrice: 89.99,
      salePrice: 34.99,
      discount: 61,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      timeLeft: "12h 8m",
      claimed: 89,
      total: 120
    }
  ];

  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
            <div className="flex items-center text-red-600 space-x-1">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Limited time offers</span>
            </div>
          </div>
          <Link href="/deals">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>See all deals</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              {/* Deal Badge */}
              <div className="bg-red-500 text-white text-center py-2">
                <span className="font-bold text-sm">{deal.title}</span>
              </div>

              <div className="p-4">
                {/* Product Image */}
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={deal.image}
                    alt={deal.product}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Product Info */}
                <h3 className="font-semibold text-gray-900 mb-2">{deal.product}</h3>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-red-600">
                    ${deal.salePrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${deal.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                    -{deal.discount}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Claimed: {deal.claimed}/{deal.total}</span>
                    <span>{Math.round((deal.claimed / deal.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.claimed / deal.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Time Left */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-red-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{deal.timeLeft} left</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}