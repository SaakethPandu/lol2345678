import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Support } from "./pages/Support";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Cart } from "./pages/Cart";
import { Billing } from "./pages/Billing";
import { OrderPlaced } from "./pages/OrderPlaced";
import { AdminSimple } from "./pages/AdminSimple";
import { PricingGateway } from "./pages/PricingGateway";
import { MinecraftPricing } from "./pages/MinecraftPricing";
import { VPSPricing } from "./pages/VPSPricing";
import { BotPricing } from "./pages/BotPricing";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { SLAAgreement } from "./pages/SLAAgreement";
import { AcceptableUse } from "./pages/AcceptableUse";
import { CartProvider } from "./components/CartContext";
import { MetaTags } from "./components/MetaTags";
import { ContactSalesModal } from "./components/ContactSalesModal";
import { AdminLoginModal } from "./components/AdminLoginModal";

import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showContactSales, setShowContactSales] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Check for existing admin session on page load
  useEffect(() => {
    const adminSession = localStorage.getItem('dishagb_admin_session');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff >= 24) {
          localStorage.removeItem('dishagb_admin_session');
        }
      } catch (err) {
        localStorage.removeItem('dishagb_admin_session');
      }
    }
  }, []);

  // Optimized page navigation with scroll reset
  useEffect(() => {
    setIsPageLoading(true);
    
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setIsPageLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Admin icon click handler
  const handleAdminIconClick = () => {
    setShowAdminLogin(true);
  };

  // Admin login success handler
  const handleAdminLoginSuccess = (adminData: { id: string; email: string; role: string }) => {
    setShowAdminLogin(false);
    setCurrentPage("admin");
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    localStorage.removeItem('dishagb_admin_session');
    setCurrentPage("home");
  };

  // Order completion handler
  const handleOrderPlaced = (details: any) => {
    setOrderDetails(details);
    setCurrentPage("order-placed");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div 
            key="home"
            className="min-h-screen bg-bg-primary"
          >
            <Hero 
              onNavigate={setCurrentPage} 
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "pricing":
        return (
          <div 
            key="pricing"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <PricingGateway 
              onNavigate={setCurrentPage}
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "pricing-minecraft":
        return (
          <div 
            key="pricing-minecraft"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <MinecraftPricing 
              onNavigate={setCurrentPage}
              onShowContactSales={() => setShowContactSales(true)}
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "pricing-vps":
        return (
          <div 
            key="pricing-vps"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <VPSPricing 
              onNavigate={setCurrentPage}
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "pricing-bots":
        return (
          <div 
            key="pricing-bots"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <BotPricing 
              onNavigate={setCurrentPage}
              onShowContactSales={() => setShowContactSales(true)}
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "products":
        return (
          <div 
            key="products"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <Products />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );

      case "blog":
        return (
          <div 
            key="blog"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <Blog />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "about":
        return (
          <div 
            key="about"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <About />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "support":
        return (
          <div 
            key="support"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <Support />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "privacy-policy":
        return (
          <div 
            key="privacy-policy"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <PrivacyPolicy />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "terms-of-service":
        return (
          <div 
            key="terms-of-service"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <TermsOfService />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "cookie-policy":
        return (
          <div 
            key="cookie-policy"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <CookiePolicy />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "sla-agreement":
        return (
          <div 
            key="sla-agreement"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <SLAAgreement />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "acceptable-use":
        return (
          <div 
            key="acceptable-use"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <AcceptableUse />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "cart":
        return (
          <div 
            key="cart"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <Cart onNavigate={setCurrentPage} />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "billing":
        return (
          <div 
            key="billing"
            className="min-h-screen bg-bg-primary pt-24"
          >
            <Billing onNavigate={setCurrentPage} onOrderPlaced={handleOrderPlaced} />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
      case "order-placed":
        return (
          <div 
            key="order-placed"
            className="min-h-screen bg-bg-primary"
          >
            <OrderPlaced 
              onNavigate={setCurrentPage} 
              orderDetails={orderDetails}
            />
          </div>
        );
      case "admin":
        return (
          <div 
            key="admin"
            className="min-h-screen bg-bg-primary"
          >
            <AdminSimple onNavigate={setCurrentPage} onLogout={handleAdminLogout} />
          </div>
        );
      default:
        return (
          <div 
            key="home"
            className="min-h-screen bg-bg-primary"
          >
            <Hero 
              onNavigate={setCurrentPage} 
            />
            <Footer onNavigate={setCurrentPage} />
          </div>
        );
    }
  };

  return (
      <CartProvider>
        <MetaTags 
          title="DishaGB Hosting - Premium Minecraft, Bot & VPS Hosting | 99.9% Uptime"
          description="🚀 Best Minecraft & VPS Hosting in India | Starting ₹40/month | 24/7 Support | DDoS Protection | Instant Setup | Discord Bot Hosting | Game Servers | 99.9% Uptime Guarantee"
        />
        
        {/* Fixed Header - Always on top */}
        {currentPage !== "admin" && (
          <Header 
            onNavigate={setCurrentPage} 
            currentPage={currentPage}
            onAdminClick={handleAdminIconClick}
          />
        )}
        
        <div className="min-h-screen bg-bg-primary relative z-content content-with-header">
          {/* Dark Theme Animated Background Pattern */}
          <div className="fixed inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/30 via-transparent to-primary-orange/20"></div>
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(0, 191, 255, 0.4) 1px, transparent 0)
                `,
                backgroundSize: '40px 40px'
              }}
            ></div>
          </div>

          {/* Enhanced Floating Particles for Dark Theme */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-3 h-3 bg-primary-cyan/70 rounded-full animate-bubble shadow-lg shadow-primary-cyan/30"></div>
            <div className="absolute top-1/3 right-20 w-4 h-4 bg-primary-orange/60 rounded-full animate-bubble shadow-lg shadow-primary-orange/30" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-accent-yellow/80 rounded-full animate-bubble shadow-lg shadow-accent-yellow/30" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-primary-cyan/50 rounded-full animate-bubble shadow-lg shadow-primary-cyan/20" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary-red/60 rounded-full animate-bubble shadow-lg shadow-primary-red/30" style={{animationDelay: '3s'}}></div>
          </div>
              
          {renderPage()}

          {/* Page Loading Overlay */}
              <AnimatePresence>
                {isPageLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9998] bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-cyan rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-primary-orange rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-primary-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

          {/* Admin Login Modal */}
          <AdminLoginModal
            isOpen={showAdminLogin}
            onClose={() => setShowAdminLogin(false)}
            onLoginSuccess={handleAdminLoginSuccess}
          />

          {/* Contact Sales Modal */}
          <ContactSalesModal
            isOpen={showContactSales}
            onClose={() => setShowContactSales(false)}
          />

          {/* Toast Notifications */}
          <Toaster />
        </div>
      </CartProvider>
  );
}