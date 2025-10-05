import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Check, Star, Cpu, HardDrive, Database, Shield, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { useCart } from "../components/CartContext";
import { useState } from "react";

interface MinecraftPricingProps {
  onNavigate: (page: string) => void;
  onShowContactSales?: () => void;
}

// Budget Plans Data
const budgetPlans = [
  {
    name: "🌱 Grass Plan",
    price: "₹90",
    cpu: "unlimited",
    ram: "2 GB",
    storage: "8 GB",
    allocation: "1x (1 server port)",
    backup: "unlimited",
    database: "1x",
    players: "4-7",
    popular: false
  },
  {
    name: "🧱 Brick Plan",
    price: "₹150",
    cpu: "150%",
    ram: "3 GB",
    storage: "12 GB",
    allocation: "1x",
    backup: "1x",
    database: "1x",
    players: "7-12",
    popular: false
  },
  {
    name: "🪵 Wood Plan", 
    price: "₹190",
    cpu: "200%",
    ram: "4 GB",
    storage: "16 GB",
    allocation: "1x",
    backup: "1x",
    database: "1x",
    players: "12-26",
    devFree: true,
    popular: false
  },
  {
    name: "🪨 Stone Plan",
    price: "₹259",
    cpu: "300%",
    ram: "6 GB",
    storage: "24 GB",
    allocation: "2x",
    backup: "1x",
    database: "2x",
    players: "26-37",
    popular: true
  },
  {
    name: "💎 Diamond Plan",
    price: "₹359",
    cpu: "350%",
    ram: "8 GB",
    storage: "32 GB",
    allocation: "2x",
    backup: "2x",
    database: "2x",
    popular: false
  },
  {
    name: "⚡ Titan Plan",
    price: "₹490",
    cpu: "400%",
    ram: "12 GB",
    storage: "45 GB",
    allocation: "3x",
    backup: "3x",
    database: "3x",
    players: "59-95",
    popular: false
  },
  {
    name: "🔥 Legendary Plan",
    price: "₹590",
    cpu: "500%",
    ram: "16 GB",
    storage: "55 GB",
    allocation: "3x",
    backup: "5x",
    database: "3x",
    players: "59-320",
    popular: false
  },
  {
    name: "⭐ Ultimate Plan",
    price: "₹750",
    cpu: "550%",
    ram: "20 GB",
    storage: "60 GB",
    allocation: "3x",
    backup: "6x",
    database: "4x",
    players: "320-674",
    popular: false
  },
  {
    name: "⚡ Titanium Plan",
    price: "₹1550",
    cpu: "700%",
    ram: "32 GB",
    storage: "Ultimate",
    allocation: "6x",
    backup: "12x",
    database: "7x",
    players: "674-3537",
    popular: false
  }
];

// Premium Plans Data
const premiumPlans = [
  {
    name: "🔱 Trident Plan 🔱",
    price: "₹1900",
    cpu: "800% (ultra performance 🚀)",
    ram: "20 GB",
    storage: "400 GB SSD",
    allocation: "40x",
    backup: "5x",
    database: "20x",
    popular: false
  },
  {
    name: "⚔️ Sword Plan ⚔️", 
    price: "₹3100",
    cpu: "800% (extreme power 🚀)",
    ram: "32 GB",
    storage: "800 GB SSD",
    allocation: "50x",
    backup: "5x",
    database: "20x",
    popular: true
  },
  {
    name: "🔨 Mace Plan 🔨",
    price: "₹6300",
    cpu: "1000% (beast performance 🚀)",
    ram: "64 GB",
    storage: "1500 GB SSD",
    allocation: "60x",
    backup: "5x",
    database: "20x",
    popular: false
  },
  {
    name: "🐉 Dragon Plan 🐉",
    price: "₹3500",
    cpu: "8000% (dragon-level power 🚀)",
    ram: "64 GB",
    storage: "128 GB SSD",
    allocation: "90x",
    backup: "7x",
    database: "55x",
    popular: false
  }
];

// Free Plans Data
const freePlansInfo = {
  inviteRewards: [
    { invites: 5, reward: "1GB RAM" },
    { invites: 10, reward: "2GB RAM" },
    { invites: 15, reward: "3GB RAM" },
    { invites: 20, reward: "4GB RAM" },
    { invites: 25, reward: "5GB RAM" },
    { invites: 30, reward: "6GB RAM" }
  ],
  boostRewards: [
    { boosts: 1, reward: "2GB RAM for 1 month" },
    { boosts: 3, reward: "4GB RAM for 2 months" },
    { boosts: 5, reward: "6GB RAM for 3 months" }
  ],
  ytPromoRewards: [
    { requirement: "YouTube video with 100+ views", reward: "3GB RAM for 1 month" },
    { requirement: "YouTube video with 500+ views", reward: "5GB RAM for 2 months" },
    { requirement: "YouTube video with 1000+ views", reward: "8GB RAM for 3 months" }
  ],
  rules: [
    "Must be active in our Discord community",
    "No alternate accounts allowed",
    "Server must be used actively (not just claimed)",
    "Must follow all community guidelines",
    "Free servers have 7-day inactivity timeout",
    "Only 1 free server per person",
    "No commercial use allowed on free plans"
  ]
};

function PlanCard({ plan }: { plan: any }) {
  const { items, addToCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Find existing cart item for this plan
  const existingItem = items.find(item => 
    item.name === plan.name && item.type === "minecraft"
  );

  const currentQuantity = existingItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Convert price string to number (remove ₹ symbol and parse)
    const priceNumber = parseFloat(plan.price.replace('₹', '').replace(',', ''));
    
    const cartItem = {
      name: plan.name,
      price: priceNumber,
      type: "minecraft" as const,
      details: {
        cpu: plan.cpu,
        ram: plan.ram,
        storage: plan.storage,
        allocation: plan.allocation,
        backup: plan.backup,
        database: plan.database,
        players: plan.players
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

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`relative glass cyan-glow hover:orange-glow transition-all duration-300 hover-bounce group ${
        plan.popular ? 'border-primary-orange/60 orange-glow' : 'border-glass-border'
      }`}>
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

        <CardContent className="space-y-3">
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
            <Check className="w-4 h-4 text-accent-yellow mr-3" />
            <span className="font-medium">Allocation:</span> {plan.allocation}
          </div>
          <div className="flex items-center text-medium-contrast">
            <Shield className="w-4 h-4 text-primary-cyan mr-3" />
            <span className="font-medium">Backups:</span> {plan.backup}
          </div>
          <div className="flex items-center text-medium-contrast">
            <Database className="w-4 h-4 text-primary-orange mr-3" />
            <span className="font-medium">Databases:</span> {plan.database}
          </div>
          {plan.players && (
            <div className="flex items-center text-medium-contrast">
              <Check className="w-4 h-4 text-accent-yellow mr-3" />
              <span className="font-medium">Players:</span> {plan.players}
            </div>
          )}
          {plan.devFree && (
            <div className="flex items-center text-accent-yellow font-medium">
              <Star className="w-4 h-4 text-accent-yellow mr-3" />
              Dev Free Included
            </div>
          )}
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
                className={`w-full transition-all duration-300 font-medium hover-glow ${
                  plan.popular 
                    ? 'bg-primary-orange hover:bg-deep-orange text-accent-white' 
                    : 'bg-primary-cyan hover:bg-primary-cyan/80 text-accent-white border-2 border-primary-cyan/30'
                }`}
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

export function MinecraftPricing({ onNavigate, onShowContactSales }: MinecraftPricingProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-primary-orange/5"></div>
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
            className="border-primary-cyan/30 text-primary-cyan hover:bg-primary-cyan/10 hover:border-primary-cyan"
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
            🎮 <span className="heading-glow">Minecraft Hosting</span> <span className="text-white">Plans</span>
          </h1>
          <p className="text-medium-contrast text-lg max-w-3xl mx-auto">
            Complete Minecraft hosting solutions designed for every community size. From budget-friendly options to enterprise-grade performance.
          </p>
        </motion.div>

        {/* Plans Tabs */}
        <Tabs defaultValue="budget" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-3 mb-12 glass border border-glass-border">
              <TabsTrigger value="budget" className="text-medium-contrast data-[state=active]:bg-primary-cyan data-[state=active]:text-accent-white transition-all duration-300 font-medium">
                💎 Budget Plans
              </TabsTrigger>
              <TabsTrigger value="premium" className="text-medium-contrast data-[state=active]:bg-primary-orange data-[state=active]:text-accent-white transition-all duration-300 font-medium">
                🚀 Premium Plans
              </TabsTrigger>
              <TabsTrigger value="free" className="text-medium-contrast data-[state=active]:bg-accent-yellow data-[state=active]:text-bg-primary transition-all duration-300 font-medium">
                💰 Free Plans
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Budget Plans */}
          <TabsContent value="budget" id="budget">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-cyan mb-4">💎 Budget Plans</h2>
              <p className="text-medium-contrast">Affordable hosting solutions perfect for small communities and growing servers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {budgetPlans.map((plan, index) => (
                <PlanCard key={index} plan={plan} />
              ))}
            </div>
          </TabsContent>

          {/* Premium Plans */}
          <TabsContent value="premium">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-orange mb-4">🚀 Premium Plans</h2>
              <p className="text-medium-contrast">High-performance hosting with massive storage and resources for large networks.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumPlans.map((plan, index) => (
                <PlanCard key={index} plan={plan} />
              ))}
            </div>
          </TabsContent>

          {/* Free Plans */}
          <TabsContent value="free">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-accent-yellow mb-4">💰 HOW TO GET FREE MONTHLY 24/7 MC SERVER</h2>
              <p className="text-medium-contrast text-lg">Earn free Minecraft hosting through our community engagement programs!</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Invite Rewards */}
              <Card className="glass cyan-glow border-glass-border hover:orange-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary-cyan font-bold text-xl flex items-center">
                    <Star className="w-6 h-6 text-accent-yellow mr-2" />
                    Invite Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {freePlansInfo.inviteRewards.map((reward, index) => (
                    <div key={index} className="flex items-center justify-between text-medium-contrast">
                      <span className="font-medium">{reward.invites} invites</span>
                      <Badge className="bg-primary-cyan text-accent-white">{reward.reward}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Boost Rewards */}
              <Card className="glass cyan-glow border-glass-border hover:orange-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary-orange font-bold text-xl flex items-center">
                    <Shield className="w-6 h-6 text-primary-orange mr-2" />
                    Boost Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {freePlansInfo.boostRewards.map((reward, index) => (
                    <div key={index} className="flex items-center justify-between text-medium-contrast">
                      <span className="font-medium">{reward.boosts} boost{reward.boosts > 1 ? 's' : ''}</span>
                      <Badge className="bg-primary-orange text-accent-white">{reward.reward}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* YouTube Promo Rewards */}
              <Card className="glass cyan-glow border-glass-border hover:orange-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-accent-yellow font-bold text-xl flex items-center">
                    <Star className="w-6 h-6 text-accent-yellow mr-2" />
                    YT Promo Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {freePlansInfo.ytPromoRewards.map((reward, index) => (
                    <div key={index} className="text-medium-contrast">
                      <div className="font-medium text-sm mb-1">{reward.requirement}</div>
                      <Badge className="bg-accent-yellow text-bg-primary">{reward.reward}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Rules */}
            <Card className="glass cyan-glow border-glass-border mb-6">
              <CardHeader>
                <CardTitle className="text-high-contrast font-bold text-2xl">📋 Rules & Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freePlansInfo.rules.map((rule, index) => (
                    <div key={index} className="flex items-start text-medium-contrast">
                      <Check className="w-5 h-5 text-accent-yellow mr-3 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Claim Notice */}
            <div className="text-center">
              <Card className="glass orange-glow border-primary-orange/50 inline-block">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-primary-orange mb-2">💡 After completing → make a ticket to claim.</h3>
                  <p className="text-medium-contrast">Join our Discord server and create a support ticket with proof of completion!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 glass p-8 rounded-2xl border border-glass-border hover:orange-glow transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-high-contrast mb-4">
            Need Help <span className="text-accent-yellow">Choosing?</span>
          </h3>
          <p className="text-medium-contrast mb-6 max-w-2xl mx-auto">
            Our <span className="text-primary-cyan font-medium">expert team</span> is here to help you find the perfect Minecraft hosting solution.
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
        </motion.div>
      </div>
    </motion.section>
  );
}