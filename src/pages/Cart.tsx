import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useCart } from "../components/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";

interface CartProps {
  onNavigate: (page: string) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();

  const handleProceedToCheckout = () => {
    // Direct checkout - no authentication required
    onNavigate('billing');
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-bg-primary py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <ShoppingBag className="mx-auto h-24 w-24 text-primary-cyan/50" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 text-lg mb-8">
              Explore our hosting plans and add some services to get started!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => onNavigate('pricing')}
                className="bg-gradient-to-r from-primary-cyan to-primary-red text-white px-8 py-3 hover:from-primary-red hover:to-primary-orange transition-all duration-300 font-medium shadow-lg shadow-primary-cyan/20"
              >
                Browse Hosting Plans
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-bg-primary py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="heading-glow">Shopping Cart</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Review your selected hosting services before checkout
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass border-primary-cyan/20 hover:border-primary-cyan/40 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                        <Badge variant="outline" className="mt-2 border-primary-orange/30 text-primary-orange">
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Plan Details */}
                    {item.details && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {item.details.cpu && (
                          <div className="text-gray-300">
                            <span className="text-primary-cyan">CPU:</span> {item.details.cpu}
                          </div>
                        )}
                        {item.details.ram && (
                          <div className="text-gray-300">
                            <span className="text-primary-orange">RAM:</span> {item.details.ram}
                          </div>
                        )}
                        {item.details.storage && (
                          <div className="text-gray-300">
                            <span className="text-primary-red">Storage:</span> {item.details.storage}
                          </div>
                        )}
                        {item.details.bandwidth && (
                          <div className="text-gray-300">
                            <span className="text-accent-yellow">Bandwidth:</span> {item.details.bandwidth}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center pt-4 border-t border-neon-blue/20">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue flex items-center justify-center transition-all duration-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-white font-semibold min-w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue flex items-center justify-center transition-all duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-cyan">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          ₹{item.price.toLocaleString()} × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass border-primary-orange/30 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Items ({getCartCount()})</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Setup Fee</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Migration Service</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <hr className="border-primary-cyan/20" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-primary-cyan">
                      ₹{getCartTotal().toLocaleString()}/month
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3">
                  <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={handleProceedToCheckout}
                      className="w-full bg-gradient-to-r from-primary-cyan to-primary-red text-white py-3 hover:from-primary-red hover:to-primary-orange transition-all duration-300 font-medium shadow-lg shadow-primary-cyan/20"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </motion.div>
                  
                  <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('pricing')}
                      className="w-full border-primary-orange/30 text-primary-orange hover:bg-primary-orange/10 hover:border-primary-orange transition-all duration-300"
                    >
                      Continue Shopping
                    </Button>
                  </motion.div>

                  {items.length > 0 && (
                    <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline"
                        onClick={clearCart}
                        className="w-full text-red-400 border-red-400/30 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 text-sm"
                      >
                        Clear Cart
                      </Button>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 glass p-4 rounded-lg border border-primary-cyan/20"
            >
              <div className="text-center space-y-2">
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    SSL Secured
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-primary-cyan rounded-full mr-2 animate-pulse"></span>
                    99.9% Uptime
                  </span>
                </div>
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-primary-orange rounded-full mr-2 animate-pulse"></span>
                    24/7 Support
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-primary-red rounded-full mr-2 animate-pulse"></span>
                    Money Back Guarantee
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}