import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart } from "lucide-react";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
    quantity: 1,
    inStock: true,
    prime: true
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Headphones",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    quantity: 2,
    inStock: true,
    prime: true
  },
  {
    id: 3,
    title: "Dyson V15 Vacuum",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
    quantity: 1,
    inStock: false,
    prime: true
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 25 ? 0 : 9.99;
  const tax = subtotal * 0.08875; // NY tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                  <Button onClick={() => window.location.href = '/'}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.prime && (
                              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                                prime
                              </span>
                            )}
                          </div>
                          
                          <div className={`text-sm mb-4 ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {item.inStock ? 'In Stock' : 'Currently unavailable'}
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {/* Action Buttons */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="flex items-center space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-1"
                            >
                              <Heart className="w-4 h-4" />
                              <span>Save for later</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold mb-2">
                  Proceed to Checkout
                </Button>
                
                <div className="text-xs text-gray-600 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
              
              {/* Prime Benefits */}
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Prime Benefits</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ FREE One-Day Delivery</li>
                  <li>✓ FREE Same-Day Delivery</li>
                  <li>✓ Exclusive deals and discounts</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}