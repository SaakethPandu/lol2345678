import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { useCart } from "../components/CartContext";
import { 
  ArrowLeft, 
  CheckCircle2, 
  QrCode,
  Building2,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { createCustomerOrder, saveOrderToLocalStorage, isSupabaseConfigured } from "../utils/supabase/client";
import upiQrCode from "figma:asset/bd8f8910988bd994953f2a8adc0004baa259027a.png";

interface BillingProps {
  onNavigate: (page: string) => void;
}

export function Billing({ onNavigate }: BillingProps) {
  const { items, getCartTotal, getCartCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'billing' | 'payment'>('billing');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    discordId: ""
  });

  // UPI Payment Details
  const UPI_ID = "dishagb@ybl";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy UPI ID");
    }
  };

  const handleProceedToPayment = () => {
    // Validation
    const requiredFields = ['fullName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (basic check)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setPaymentStep('payment');
    toast.success("Proceed to payment! Scan the QR code or use the UPI ID below.");
  };

  const handlePaymentComplete = async () => {
    setIsProcessing(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: "", // Not required anymore
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: finalTotal,
        notes: formData.discordId ? `Discord ID: ${formData.discordId}` : undefined
      };

      // Save to Supabase
      const configured = isSupabaseConfigured();
      
      if (configured) {
        const { data, error } = await createCustomerOrder(orderData);
        
        if (error) {
          saveOrderToLocalStorage(orderData);
          toast.warning('Order saved to local storage (Supabase unavailable)', {
            duration: 3000,
          });
        } else {
          toast.success('Order saved to database successfully!', {
            duration: 3000,
          });
        }
      } else {
        saveOrderToLocalStorage(orderData);
        toast.info('Order saved locally (Supabase not configured)', {
          duration: 3000,
        });
      }
      
      // Show order confirmation immediately
      toast.success("🎉 Order Confirmed! Your order has been placed successfully.", {
        duration: 5000,
        style: {
          background: 'linear-gradient(135deg, #1E1E2E 0%, #252535 100%)',
          border: '2px solid #00BFFF',
          color: '#F8F9FA',
          fontSize: '16px',
          padding: '16px',
        }
      });
      
      // Clear cart and navigate to order placed screen
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        
        // Prepare order details for the order placed screen
        const orderDetails = {
          orderId: `DGB-${Date.now()}`,
          customerName: formData.fullName,
          customerEmail: formData.email,
          items: items,
          totalAmount: finalTotal,
          paymentMethod: 'UPI',
          orderDate: new Date().toISOString()
        };
        
        onOrderPlaced(orderDetails);
        toast.info("Thank you! Our team will verify your payment and activate your services shortly.");
      }, 2500);
      
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
      setIsProcessing(false);
    }
  };

  const total = getCartTotal();
  const setupFee = 0; // Free setup
  const tax = Math.round(total * 0.18); // 18% GST
  const finalTotal = total + setupFee + tax;

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-bg-primary py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-high-contrast mb-4">No Items to Checkout</h1>
          <p className="text-muted-contrast text-lg mb-8">
            Your cart is empty. Add some hosting services to proceed with billing.
          </p>
          <Button 
            onClick={() => onNavigate('pricing')}
            className="btn-primary px-8 py-3"
          >
            Browse Hosting Plans
          </Button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={() => onNavigate('cart')}
              className="flex items-center text-bright-cyan hover:text-primary-orange transition-colors mr-4 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Cart
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="heading-glow">
              {paymentStep === 'billing' ? 'Billing Information' : 'Complete Payment'}
            </span>
          </h1>
          
          {/* Checkout Flow Indicator */}
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-contrast mt-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent-yellow flex items-center justify-center text-bg-primary">
                ✓
              </div>
              <span className="ml-2 text-accent-yellow">Cart</span>
            </div>
            <div className="w-8 h-0.5 bg-primary-cyan"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-cyan flex items-center justify-center text-accent-white">
                {paymentStep === 'billing' ? '2' : '✓'}
              </div>
              <span className="ml-2 text-primary-cyan">Billing</span>
            </div>
            <div className={`w-8 h-0.5 ${paymentStep === 'payment' ? 'bg-primary-orange' : 'bg-text-dim'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ paymentStep === 'payment' ? 'bg-primary-orange text-accent-white' : 'bg-bg-surface text-text-dim'
              }`}>
                3
              </div>
              <span className={`ml-2 ${paymentStep === 'payment' ? 'text-primary-orange' : 'text-text-dim'}`}>
                Payment
              </span>
            </div>
          </div>
        </motion.div>

        {/* Highlighted Warning Notice - Pinned at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="sticky top-20 z-30 mb-8"
        >
          <div className="glass p-6 rounded-2xl border-2 border-accent-yellow/80 bg-accent-yellow/15 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center animate-pulse-bright shadow-lg">
                  <span className="text-bg-primary text-2xl">⚠️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-accent-yellow text-xl mb-3 font-semibold">⚡ Important Notice</h3>
                <p className="text-high-contrast text-base leading-relaxed">
                  <strong className="text-accent-yellow text-lg">These fields must be filled correctly.</strong> Your order will be delivered <strong className="text-primary-cyan">digitally</strong> to the details you provide.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Billing Form or Payment */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {paymentStep === 'billing' ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass cyan-glow hover:orange-glow transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-high-contrast text-xl flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-primary-cyan" />
                      Billing Information
                    </CardTitle>
                    <p className="text-muted-contrast text-sm">
                      Please provide your details for digital service delivery
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">

                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName" className="text-medium-contrast flex items-center mb-2">
                        <span>Full Name</span>
                        <span className="text-accent-yellow ml-1">* (Required)</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                        required
                      />
                      <p className="text-text-dim text-xs mt-1">Your name for the hosting account</p>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-medium-contrast flex items-center mb-2">
                        <span>Email Address</span>
                        <span className="text-accent-yellow ml-1">* (Required)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                        required
                      />
                      <p className="text-text-dim text-xs mt-1">Your hosting credentials will be sent to this email</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-medium-contrast flex items-center mb-2">
                        <span>Phone Number</span>
                        <span className="text-accent-yellow ml-1">* (Required)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                        required
                      />
                      <p className="text-text-dim text-xs mt-1">We'll contact you on this number for order updates</p>
                    </div>

                    {/* Discord ID (Optional) */}
                    <div>
                      <Label htmlFor="discordId" className="text-medium-contrast flex items-center mb-2">
                        <span>Discord ID (Optional)</span>
                      </Label>
                      <Input
                        id="discordId"
                        value={formData.discordId}
                        onChange={(e) => handleInputChange('discordId', e.target.value)}
                        placeholder="username#1234"
                        className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                      />
                      <p className="text-text-dim text-xs mt-1">For Discord support and updates</p>
                    </div>

                    {/* Next Button */}
                    <div className="pt-6">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={handleProceedToPayment}
                          className="btn-primary w-full py-4 text-lg btn-interactive"
                        >
                          Next →
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass orange-glow transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-high-contrast text-xl flex items-center">
                      <QrCode className="w-5 h-5 mr-2 text-primary-orange" />
                      UPI Payment
                    </CardTitle>
                    <p className="text-muted-contrast text-sm">
                      Scan the QR code or use the UPI ID to complete your payment
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* QR Code */}
                    <div className="text-center">
                      <div className="glass p-6 rounded-2xl inline-block white-glow">
                        <img 
                          src={upiQrCode} 
                          alt="UPI QR Code" 
                          className="w-64 h-64 mx-auto rounded-lg"
                        />
                      </div>
                      <p className="text-muted-contrast text-sm mt-4">
                        Scan with any UPI app (PhonePe, Paytm, GPay, etc.)
                      </p>
                    </div>

                    {/* UPI ID */}
                    <div className="glass p-6 rounded-xl cyan-glow">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-medium-contrast text-sm mb-2 block">UPI ID:</Label>
                          <p className="text-primary-cyan font-mono text-2xl font-bold">{UPI_ID}</p>
                        </div>
                        <Button
                          onClick={handleCopyUPI}
                          variant="outline"
                          size="sm"
                          className="btn-secondary"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Payment Amount */}
                    <div className="glass p-4 rounded-xl red-glow text-center">
                      <Label className="text-medium-contrast text-sm">Amount to Pay:</Label>
                      <p className="text-3xl font-bold text-white">₹{finalTotal.toLocaleString()}</p>
                    </div>

                    {/* Payment Instructions */}
                    <div className="space-y-3">
                      <h4 className="text-medium-contrast">Payment Instructions:</h4>
                      <div className="space-y-2 text-sm text-muted-contrast">
                        <div className="flex items-start">
                          <span className="w-6 h-6 bg-primary-cyan text-accent-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                          <span>Scan the QR code or copy the UPI ID</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-6 h-6 bg-primary-orange text-accent-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                          <span>Open your UPI app and make the payment</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-6 h-6 bg-primary-red text-accent-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
                          <span>Click "Payment Completed" after successful payment</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Complete Button */}
                    <div className="pt-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          onClick={handlePaymentComplete}
                          disabled={isProcessing}
                          className="btn-primary w-full py-4 text-lg btn-interactive"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Submitting Order...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-5 w-5 mr-3" />
                              Payment Completed
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass cyan-glow sticky top-24">
                <CardHeader>
                  <CardTitle className="text-high-contrast text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-medium-contrast text-sm">{item.name}</p>
                          <Badge variant="outline" className="border-primary-cyan/30 text-primary-cyan text-xs mt-1">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                          <p className="text-text-dim text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-primary-cyan text-sm">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-primary-cyan/20" />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-medium-contrast">
                      <span>Subtotal ({getCartCount()} items)</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-medium-contrast">
                      <span>Setup Fee</span>
                      <span className="text-accent-yellow">Free</span>
                    </div>
                    <div className="flex justify-between text-medium-contrast">
                      <span>GST (18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <hr className="border-primary-cyan/20" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-primary-cyan">
                        ₹{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass p-4 rounded-lg cyan-glow"
            >
              <div className="text-center space-y-2">
                <h4 className="text-primary-cyan text-sm">Why Choose DishaGB Hosting?</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-contrast">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent-yellow rounded-full mr-2 animate-pulse"></span>
                    99.9% Uptime
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary-cyan rounded-full mr-2 animate-pulse"></span>
                    24/7 Support
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary-orange rounded-full mr-2 animate-pulse"></span>
                    30-Day Refund
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary-red rounded-full mr-2 animate-pulse"></span>
                    Free Migration
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
