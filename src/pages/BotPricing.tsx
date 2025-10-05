import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check, Star, Cpu, HardDrive, Database, ShoppingCart, ArrowLeft, Bot, Zap, Clock, Shield } from "lucide-react";
import { useCart } from "../components/CartContext";

interface BotPricingProps {
  onNavigate: (page: string) => void;
  onShowContactSales?: () => void;
}

// Bot Hosting Plans Data
const botPlans = [
  {
    name: "⭐ Starter Plan ⭐",
    price: "₹40",
    cpu: "50%",
    ram: "512 MB",
    storage: "4 GB SSD",
    uptime: "99.5%",
    support: "Community",
    features: [
      "Perfect for small Discord bots",
      "Basic monitoring included",
      "1 bot application",
      "Community support"
    ],
    popular: false,
    color: "cyan"
  },
  {
    name: "⚡ Essential Plan ⚡",
    price: "₹60",
    cpu: "100%",
    ram: "1 GB",
    storage: "6 GB SSD",
    uptime: "99.8%",
    support: "Priority Email",
    features: [
      "Ideal for medium-sized communities",
      "Advanced monitoring dashboard",
      "Up to 3 bot applications",
      "Priority email support",
      "Auto-restart on crashes"
    ],
    popular: true,
    color: "orange"
  },
  {
    name: "👨‍💻 Developer Plan 👨‍💻",
    price: "₹120",
    cpu: "150%",
    ram: "2 GB",
    storage: "8 GB SSD",
    uptime: "99.9%",
    support: "24/7 Live Chat",
    features: [
      "Perfect for developers & large servers",
      "Real-time performance analytics",
      "Unlimited bot applications",
      "24/7 live chat support",
      "Advanced auto-scaling",
      "Custom environment variables",
      "Git deployment integration"
    ],
    popular: false,
    color: "light-blue"
  }
];

const botFeatures = [
  {
    icon: Bot,
    title: "Discord Bot Optimized",
    description: "Specially tuned infrastructure for Discord bot hosting with minimal latency"
  },
  {
    icon: Zap,
    title: "99.9% Uptime Guarantee",
    description: "Keep your bots online 24/7 with our reliable hosting infrastructure"
  },
  {
    icon: Clock,
    title: "Auto-Restart Protection",
    description: "Automatic restart on crashes ensures your bots are always running"
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Isolated hosting environment with advanced security measures"
  }
];

function BotPlanCard({ plan }: { plan: any }) {
  const { items, addToCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Find existing cart item for this plan
  const existingItem = items.find(item => 
    item.name === plan.name && item.type === "bot"
  );

  const currentQuantity = existingItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Convert price string to number (remove ₹ symbol and parse)
    const priceNumber = parseFloat(plan.price.replace('₹', '').replace(',', ''));
    
    const cartItem = {
      name: plan.name,
      price: priceNumber,
      type: "bot" as const,
      details: {
        cpu: plan.cpu,
        ram: plan.ram,
        storage: plan.storage,
        uptime: plan.uptime,
        support: plan.support
      }
    };

    addToCart(cartItem);
    
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (change: number) => {
    if (!existingItem) return;
    
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      updateQuantity(existingItem.id, 0); // This will remove the item
    } else {
      updateQuantity(existingItem.id, newQuantity);
    }
  };

  const getCardStyles = () => {
    switch (plan.color) {
      case "orange":
        return "border-primary-orange/60 orange-glow";
      case "light-blue":
        return "border-primary-cyan/40 bg-primary-cyan/5 shadow-lg shadow-primary-cyan/20";
      case "red":
        return "border-primary-red/60 red-glow";
      default:
        return "border-glass-border cyan-glow";
    }
  };

  const getButtonStyles = () => {
    switch (plan.color) {
      case "orange":
        return "bg-primary-orange hover:bg-deep-orange text-accent-white";
      case "light-blue":
        return "bg-primary-cyan/80 hover:bg-primary-cyan text-accent-white border border-primary-cyan/50";
      case "red":
        return "bg-primary-red hover:bg-dark-red text-accent-white";
      default:
        return "bg-primary-cyan hover:bg-primary-cyan/80 text-accent-white border-2 border-primary-cyan/30";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`relative glass hover:orange-glow transition-all duration-300 hover-bounce group h-full ${getCardStyles()}`}>
        {plan.popular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-orange text-accent-white animate-pulse-bright">
            <Star className="w-3 h-3 mr-1 text-accent-yellow" />
            Most Popular
          </Badge>
        )}
        
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-white font-bold text-lg">{plan.name}</CardTitle>
          <div className="text-3xl font-bold text-primary-cyan mb-2">
            {plan.price}<span className="text-lg text-muted-contrast">/month</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-1">
          <div className="flex items-center text-medium-contrast">
            <Cpu className="w-4 h-4 text-primary-cyan mr-3" />
            <span className="font-medium">CPU:</span> {plan.cpu}
          </div>
          <div className="flex items-center text-medium-contrast">
            <HardDrive className="w-4 h-4 text-primary-orange mr-3" />
            <span className="font-medium">RAM:</span> {plan.ram}
          </div>
          <div className="flex items-center text-medium-contrast">
            <Database className="w-4 h-4 text-primary-cyan mr-3" />
            <span className="font-medium">Storage:</span> {plan.storage}
          </div>
          <div className="flex items-center text-medium-contrast">
            <Clock className="w-4 h-4 text-accent-yellow mr-3" />
            <span className="font-medium">Uptime:</span> {plan.uptime}
          </div>
          <div className="flex items-center text-medium-contrast">
            <Shield className="w-4 h-4 text-primary-orange mr-3" />
            <span className="font-medium">Support:</span> {plan.support}
          </div>
          
          <div className="pt-4 space-y-2">
            <h4 className="font-medium text-high-contrast">Features:</h4>
            {plan.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start text-medium-contrast text-sm">
                <Check className="w-3 h-3 text-accent-yellow mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          {currentQuantity > 0 ? (
            <div className="w-full flex items-center justify-center space-x-4">
              <motion.button
                onClick={() => handleQuantityChange(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary-red hover:bg-dark-red text-white flex items-center justify-center transition-all duration-200 font-bold text-lg"
              >
                -
              </motion.button>
              
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary-cyan">{currentQuantity}</span>
                <span className="text-xs text-text-muted">in cart</span>
              </div>
              
              <motion.button
                onClick={() => handleQuantityChange(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary-cyan hover:bg-primary-cyan/80 text-white flex items-center justify-center transition-all duration-200 font-bold text-lg"
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full transition-all duration-300 font-medium hover-glow ${getButtonStyles()}`}
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function BotPricing({ onNavigate, onShowContactSales }: BotPricingProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-bg-tertiary/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={() => onNavigate("pricing")}
            variant="outline"
            className="border-primary-cyan/40 text-primary-cyan hover:bg-primary-cyan/10 hover:border-primary-cyan"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🤖 <span className="heading-glow">Bot Hosting</span> <span className="text-white">Plans</span>
          </h1>
          <p className="text-medium-contrast text-lg max-w-3xl mx-auto">
            Optimized hosting specifically designed for Discord bots and automated applications. 
            Keep your bots online 24/7 with our reliable infrastructure.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-cyan mb-4">🚀 Why Choose Our Bot Hosting?</h2>
            <p className="text-medium-contrast">Specialized infrastructure optimized for Discord bot performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {botFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass cyan-glow border-glass-border hover:orange-glow transition-all duration-300 h-full text-center">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-2xl cyan-glow bg-glass-bg border border-glass-border">
                        <feature.icon className="w-6 h-6 text-primary-cyan" />
                      </div>
                    </div>
                    <CardTitle className="text-high-contrast font-bold text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-medium-contrast text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-orange mb-4">💰 Choose Your Plan</h2>
            <p className="text-medium-contrast">Scalable bot hosting solutions for every need and budget</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {botPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <BotPlanCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Setup Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="glass cyan-glow border-glass-border">
            <CardHeader>
              <CardTitle className="text-high-contrast font-bold text-2xl text-center">
                🛠️ Easy Bot Setup Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary-cyan rounded-full flex items-center justify-center text-accent-white font-bold text-lg mx-auto">
                    1
                  </div>
                  <h3 className="font-medium text-high-contrast">Choose Plan</h3>
                  <p className="text-sm text-medium-contrast">Select the perfect hosting plan for your bot's needs</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center text-accent-white font-bold text-lg mx-auto">
                    2
                  </div>
                  <h3 className="font-medium text-high-contrast">Upload Code</h3>
                  <p className="text-sm text-medium-contrast">Upload your bot code via our intuitive panel or Git integration</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center text-bg-primary font-bold text-lg mx-auto">
                    3
                  </div>
                  <h3 className="font-medium text-high-contrast">Configure</h3>
                  <p className="text-sm text-medium-contrast">Set up environment variables and configure your bot settings</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary-cyan rounded-full flex items-center justify-center text-accent-white font-bold text-lg mx-auto">
                    4
                  </div>
                  <h3 className="font-medium text-high-contrast">Deploy</h3>
                  <p className="text-sm text-medium-contrast">Launch your bot and enjoy 24/7 uptime with monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center glass p-8 rounded-2xl border border-glass-border hover:orange-glow transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-high-contrast mb-4">
            Need Custom <span className="text-accent-yellow">Bot Hosting?</span>
          </h3>
          <p className="text-medium-contrast mb-6 max-w-2xl mx-auto">
            Running multiple bots or need custom requirements? Our <span className="text-primary-cyan font-medium">expert team</span> can 
            create a tailored hosting solution just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onShowContactSales}
                className="bg-primary-cyan hover:bg-primary-cyan/80 text-accent-white px-8 py-3 transition-all duration-300 hover-glow font-medium"
              >
                Contact Sales
              </Button>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-medium-contrast mt-8">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-accent-yellow rounded-full mr-2 animate-pulse"></span>
              Node.js & Python Support
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-primary-cyan rounded-full mr-2 animate-pulse"></span>
              Real-time Monitoring
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-primary-orange rounded-full mr-2 animate-pulse"></span>
              Auto-scaling Available
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-text-muted rounded-full mr-2 animate-pulse"></span>
              24/7 Expert Support
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}