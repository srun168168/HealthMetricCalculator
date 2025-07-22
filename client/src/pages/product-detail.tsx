import { useState } from "react";
import { useRoute } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MapPin
} from "lucide-react";

// Mock product data
const product = {
  id: 1,
  title: "Apple iPhone 15 Pro Max - 256GB - Natural Titanium",
  brand: "Apple",
  price: 1199.99,
  originalPrice: 1399.99,
  discount: 14,
  rating: 4.8,
  reviews: 2847,
  prime: true,
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
  ],
  description: "The iPhone 15 Pro Max is the ultimate iPhone with a 6.7-inch Super Retina XDR display, A17 Pro chip, Pro camera system, and titanium design.",
  features: [
    "6.7-inch Super Retina XDR display",
    "A17 Pro chip with 6-core GPU",
    "Pro camera system with 48MP Main",
    "5x Telephoto zoom",
    "Action Button for quick access",
    "USB-C connectivity",
    "Up to 29 hours video playback"
  ],
  specifications: {
    "Display": "6.7-inch Super Retina XDR",
    "Chip": "A17 Pro",
    "Storage": "256GB",
    "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
    "Battery": "Up to 29 hours video playback",
    "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3",
    "Operating System": "iOS 17"
  }
};

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-lg text-orange-600 font-medium">by {product.brand}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.prime && (
                  <Badge className="bg-blue-500 text-white">prime</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Save ${(product.originalPrice! - product.price).toFixed(2)} ({product.discount}%)
              </p>
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {/* Delivery Info */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">FREE Prime Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-800">
                <MapPin className="w-4 h-4" />
                <span>Deliver to New York 10001 - Tomorrow, FREE</span>
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm">Amazon's Choice - Highly rated and well-priced</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-green-600" />
                <span className="text-sm">Free returns within 30 days</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm">Climate Pledge Friendly - Learn more</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium w-1/3">{key}:</span>
                  <span className="text-gray-700 w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}