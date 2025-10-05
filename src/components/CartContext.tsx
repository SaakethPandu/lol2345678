import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number; // Changed from string to number for easier calculations
  type: 'minecraft' | 'vps' | 'bot' | 'domain';
  quantity: number;
  details?: {
    cpu?: string;
    ram?: string;
    storage?: string;
    allocation?: string;
    backup?: string;
    database?: string;
    bandwidth?: string;
    players?: string;
    features?: string[];
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dishagb-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        // Failed to load cart from localStorage
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('dishagb-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = `${item.type}-${item.name}-${Date.now()}`;
    const newItem: CartItem = {
      ...item,
      id,
      quantity: 1
    };

    setItems(prev => {
      // Check if item already exists (same name and type)
      const existingItemIndex = prev.findIndex(
        existing => existing.name === item.name && existing.type === item.type
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        // Add new item
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}