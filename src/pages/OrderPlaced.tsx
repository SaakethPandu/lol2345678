import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  MessageCircle,
  Clock,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface OrderPlacedProps {
  onNavigate: (page: string) => void;
  orderDetails?: {
    orderId?: string;
    customerName?: string;
    customerEmail?: string;
    totalAmount?: number;
    items?: any[];
  };
}

export function OrderPlaced({ onNavigate, orderDetails }: OrderPlacedProps) {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          setTimeout(() => onNavigate('home'), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigate]);

  const handleManualRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => onNavigate('home'), 300);
  };

  const handleViewSupport = () => {
    onNavigate('support');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-bg-primary relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 via-bg-primary to-primary-orange/10"></div>
        
        {/* Animated Success Particles */}
        <motion.div 
          className="absolute top-20 left-1/4 w-2 h-2 bg-primary-cyan rounded-full"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div 
          className="absolute top-32 right-1/3 w-3 h-3 bg-accent-yellow rounded-full"
          animate={{
            y: [0, -120, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-primary-orange rounded-full"
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.3, 0]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 1
          }}
        />
        
        {/* Floating Success Icons */}
        <motion.div 
          className="absolute top-1/4 right-1/4 text-primary-cyan/30"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/5 text-accent-yellow/30"
          animate={{ 
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Shield size={20} />
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Main Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2 
            }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(0, 191, 255, 0.4)",
                    "0 0 0 20px rgba(0, 191, 255, 0)",
                    "0 0 0 40px rgba(0, 191, 255, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="w-32 h-32 bg-gradient-to-br from-primary-cyan via-primary-cyan to-primary-orange rounded-full flex items-center justify-center mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle2 size={64} className="text-white" />
                </motion.div>
              </motion.div>
              
              {/* Floating Success Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4"
              >
                <Badge className="bg-gradient-to-r from-accent-yellow to-primary-orange text-bg-primary font-bold px-3 py-1">
                  SUCCESS
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl mb-4 heading-glow">
              🎉 Order Placed Successfully!
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary mb-6 max-w-2xl mx-auto">
              Thank you for choosing DishaGB Hosting! Your order has been received and our team will verify your payment to activate your services shortly.
            </p>
          </motion.div>

          {/* Order Details Card */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <Card className="glass border-primary-cyan/30 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {orderDetails.orderId && (
                      <div>
                        <p className="text-text-muted text-sm">Order ID</p>
                        <p className="text-text-primary font-mono">{orderDetails.orderId}</p>
                      </div>
                    )}
                    {orderDetails.customerName && (
                      <div>
                        <p className="text-text-muted text-sm">Customer Name</p>
                        <p className="text-text-primary">{orderDetails.customerName}</p>
                      </div>
                    )}
                    {orderDetails.customerEmail && (
                      <div>
                        <p className="text-text-muted text-sm">Email</p>
                        <p className="text-text-primary">{orderDetails.customerEmail}</p>
                      </div>
                    )}
                    {orderDetails.totalAmount && (
                      <div>
                        <p className="text-text-muted text-sm">Total Amount</p>
                        <p className="text-text-primary font-semibold">₹{orderDetails.totalAmount}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl lg:text-2xl text-text-primary mb-6">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass border-primary-cyan/20 p-4 rounded-xl"
              >
                <Clock className="w-8 h-8 text-primary-cyan mx-auto mb-3" />
                <h4 className="text-text-primary font-semibold mb-2">Payment Verification</h4>
                <p className="text-text-muted text-sm">Our team will verify your payment within 10-30 minutes</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass border-primary-orange/20 p-4 rounded-xl"
              >
                <Zap className="w-8 h-8 text-primary-orange mx-auto mb-3" />
                <h4 className="text-text-primary font-semibold mb-2">Service Activation</h4>
                <p className="text-text-muted text-sm">Your services will be activated automatically after verification</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass border-accent-yellow/20 p-4 rounded-xl"
              >
                <Mail className="w-8 h-8 text-accent-yellow mx-auto mb-3" />
                <h4 className="text-text-primary font-semibold mb-2">Credentials Delivery</h4>
                <p className="text-text-muted text-sm">Access details will be sent to your email</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              onClick={handleViewSupport}
              variant="outline"
              className="border-primary-cyan/50 text-primary-cyan hover:bg-primary-cyan/10 px-6 py-3"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Support
            </Button>
            
            <Button
              onClick={handleManualRedirect}
              disabled={isRedirecting}
              className="btn-primary px-8 py-3 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                {isRedirecting ? "Redirecting..." : "Continue Browsing"}
                {!isRedirecting && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
              
              {/* Button shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                initial={false}
              />
            </Button>
          </motion.div>

          {/* Auto-redirect notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-text-muted text-sm"
          >
            <p>
              {isRedirecting 
                ? "Redirecting to homepage..." 
                : `Automatically redirecting to homepage in ${countdown} seconds`
              }
            </p>
          </motion.div>

          {/* Confetti-like particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary-cyan to-primary-orange rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, (i % 2 ? 1 : -1) * 20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}