import { Link } from "wouter";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  prime?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative">
        {/* Product Image */}
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Prime Badge */}
        {product.prime && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            prime
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 mt-8 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        {/* Product Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-2 text-xs text-gray-600">
          {product.prime ? (
            <span className="text-blue-600 font-semibold">FREE Prime delivery</span>
          ) : (
            <span>FREE delivery on orders over $25</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}