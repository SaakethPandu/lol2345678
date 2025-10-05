import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Gamepad2, 
  Server, 
  Bot, 
  ArrowRight, 
  Cpu, 
  HardDrive, 
  Shield,
  Star,
  Zap
} from "lucide-react";

interface PricingGatewayProps {
  onNavigate: (page: string) => void;
}

export function PricingGateway({ onNavigate }: PricingGatewayProps) {
  const hostingTypes = [
    {
      id: "minecraft",
      title: "Minecraft Hosting",
      icon: Gamepad2,
      description: "Complete Minecraft hosting solutions for every community size",
      highlights: [
        "Budget Plans starting from ₹90/month",
        "Premium high-performance options",
        "Free hosting through community engagement",
        "99.9% uptime guarantee"
      ],
      buttonText: "View Minecraft Plans",
      buttonStyle: "bg-primary-cyan hover:bg-primary-cyan/80",
      cardGlow: "cyan-glow",
      badge: "Most Popular",
      badgeStyle: "bg-primary-orange text-accent-white"
    },
    {
      id: "vps",
      title: "VPS Hosting",
      icon: Server,
      description: "High-performance Virtual Private Servers with enterprise-grade infrastructure",
      highlights: [
        "Latest AMD EPYC & Intel Xeon processors",
        "NVMe SSD storage for lightning speed",
        "Advanced DDoS protection included",
        "Full root access & custom OS support"
      ],
      buttonText: "View VPS Plans",
      buttonStyle: "bg-primary-orange hover:bg-deep-orange",
      cardGlow: "orange-glow",
      badge: "Coming Soon",
      badgeStyle: "bg-accent-yellow text-primary-red"
    },
    {
      id: "bots",
      title: "Bot Hosting",
      icon: Bot,
      description: "Optimized hosting specifically designed for Discord bots and automated applications",
      highlights: [
        "Starting from ₹40/month",
        "Optimized for 24/7 bot uptime",
        "Easy deployment and management",
        "Scalable resources on demand"
      ],
      buttonText: "View Bot Plans",
      buttonStyle: "bg-primary-red hover:bg-dark-red",
      cardGlow: "red-glow",
      badge: "Developer Friendly",
      badgeStyle: "bg-primary-cyan text-accent-white"
    }
  ];

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="heading-glow">DishaGB Hosting</span> <span className="text-white">Solutions</span>
          </h1>
          <p className="text-primary-cyan text-lg max-w-3xl mx-auto">
            Choose your hosting solution from our comprehensive range of services designed to power your digital presence.
          </p>
        </motion.div>

        {/* Hosting Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {hostingTypes.map((hosting, index) => (
            <motion.div
              key={hosting.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Card className={`glass ${hosting.cardGlow} border-glass-border hover:orange-glow transition-all duration-300 hover-bounce h-full relative group`}>
                {/* Badge */}
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${hosting.badgeStyle} animate-pulse-bright`}>
                  <Star className="w-3 h-3 mr-1" />
                  {hosting.badge}
                </Badge>

                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-2xl ${hosting.cardGlow} bg-glass-bg border border-glass-border`}>
                      <hosting.icon className="w-8 h-8 text-primary-cyan" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary-cyan mb-3">
                    {hosting.title}
                  </CardTitle>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {hosting.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 pb-8">
                  {/* Highlights */}
                  <div className="space-y-3">
                    {hosting.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-start text-text-secondary">
                        <Zap className="w-4 h-4 text-accent-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => onNavigate(`pricing-${hosting.id}`)}
                        className={`w-full ${hosting.buttonStyle} text-accent-white font-medium py-3 transition-all duration-300 hover-glow group-hover:shadow-lg`}
                      >
                        {hosting.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center glass p-8 rounded-2xl border border-glass-border hover:orange-glow transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-primary-cyan mb-4">
            Why Choose <span className="text-accent-yellow">DishaGB Hosting?</span>
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            We provide <span className="text-primary-cyan font-medium">cutting-edge infrastructure</span> with 
            unmatched performance and support for all your hosting needs.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-text-secondary">
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-accent-yellow rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">99.9% Uptime SLA</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-primary-cyan rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">24/7 Expert Support</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-primary-orange rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">DDoS Protection</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-primary-red rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">Free Setup & Migration</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-accent-yellow rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">Money Back Guarantee</span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}