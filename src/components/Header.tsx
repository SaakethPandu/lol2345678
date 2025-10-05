import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './CartContext';
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onAdminClick?: () => void;
}

export function Header({ onNavigate, currentPage, onAdminClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'products', label: 'Products' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'support', label: 'Support' }
  ];

  const handleNavigation = (page: string) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-primary-cyan/30 shadow-xl' 
            : 'bg-bg-primary/80 backdrop-blur-lg border-b border-primary-cyan/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavigation('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logoImage} 
                alt="DishaGB Hosting" 
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-cyan/40"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">DishaGB Hosting</h1>
                <p className="text-xs text-primary-cyan font-medium">Premium Gaming Solutions</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                    currentPage === item.id
                      ? 'text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/30'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Cart Button */}
              <motion.button
                onClick={() => handleNavigation('cart')}
                className="relative p-3 text-text-secondary hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </motion.button>

              {/* Admin Button */}
              {onAdminClick && (
                <motion.button
                  onClick={onAdminClick}
                  className="p-3 text-text-secondary hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Admin Panel"
                >
                  <Shield size={20} />
                </motion.button>
              )}

              {/* CTA Button */}
              <motion.button
                onClick={() => handleNavigation('support')}
                className="px-6 py-2 bg-gradient-to-r from-primary-cyan to-primary-orange text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-cyan/25 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Support
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Cart */}
              <motion.button
                onClick={() => handleNavigation('cart')}
                className="relative p-3 text-text-secondary hover:text-white transition-colors duration-200 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={22} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 text-text-secondary hover:text-white transition-colors duration-200 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-bg-secondary/95 backdrop-blur-xl border-t border-primary-cyan/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentPage === item.id
                        ? 'text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/30'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-primary-cyan/20 space-y-3">
                  {/* Mobile Cart Link */}
                  <button
                    onClick={() => handleNavigation('cart')}
                    className="flex items-center justify-between w-full px-4 py-3 text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      Cart
                    </div>
                    {getCartCount() > 0 && (
                      <span className="bg-primary-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {getCartCount()}
                      </span>
                    )}
                  </button>

                  {/* Mobile Admin Button */}
                  {onAdminClick && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onAdminClick();
                      }}
                      className="flex items-center w-full px-4 py-3 text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
                    >
                      <Shield className="w-5 h-5 mr-3" />
                      Admin Panel
                    </button>
                  )}

                  {/* Mobile CTA Button */}
                  <button
                    onClick={() => handleNavigation('support')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-cyan to-primary-orange text-white font-medium rounded-lg"
                  >
                    Get Support
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
}