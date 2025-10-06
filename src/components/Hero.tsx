import { Button } from "./ui/button";
import { ArrowRight, Zap, Shield, Globe, MessageCircleQuestion } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { QuickActions } from "./QuickActions";
import { HostingOverview } from "./HostingOverview";
import { DataCenters } from "./DataCenters";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 via-bg-primary to-primary-orange/15"></div>
        
        {/* Enhanced Moving Grid for Dark Theme */}
        <div 
          className="absolute inset-0 opacity-30 animate-grid"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 191, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        ></div>

        {/* Floating Orbs - Optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-cyan/10 to-primary-orange/10 rounded-full blur-3xl pointer-events-none"
        ></motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-primary-red/10 to-accent-yellow/10 rounded-full blur-3xl pointer-events-none"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center px-6 py-3 glass cyan-glow rounded-full text-primary-red mb-8 animate-pulse-bright"
          >
            <span className="w-3 h-3 bg-accent-yellow rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium">🚀 Next-Gen Hosting Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="text-white">Future of</span>{" "}
            <span className="heading-glow block">
              Gaming
            </span>
            <span className="heading-glow block">
              Hosting
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-medium-contrast mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Experience <span className="text-primary-cyan font-semibold">ultra-low latency</span> gaming with our 
            <span className="text-primary-orange font-semibold"> AI-powered infrastructure</span>. 
            Join the revolution of <span className="text-primary-red font-semibold">next-generation hosting</span>.
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl cyan-glow hover-bounce card-hover"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-cyan mb-2">50</div>
              <div className="text-medium-contrast text-sm">Active Players</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl orange-glow hover-bounce card-hover"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-orange mb-2">99.9%</div>
              <div className="text-medium-contrast text-sm">Uptime</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl red-glow hover-bounce card-hover"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-red mb-2">24/7</div>
              <div className="text-medium-contrast text-sm">Expert Support</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl white-glow hover-bounce card-hover"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-yellow mb-2">5</div>
              <div className="text-medium-contrast text-sm">Our Nodes</div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                onClick={() => window.open('https://panel.dishagb.shop/', '_blank')}
                className="btn-primary px-10 py-4 text-lg rounded-xl font-medium shadow-lg"
              >
                Launch Your Server
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="ghost" 
                onClick={() => onNavigate('support')}
                className="btn-secondary px-10 py-4 text-lg rounded-xl font-medium"
              >
                <MessageCircleQuestion className="mr-2" size={20} />
                Get Support
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center justify-center space-x-3 glass p-4 rounded-xl border border-primary-cyan/20 hover:border-primary-cyan/40 transition-all duration-300"
            >
              <Zap className="text-accent-yellow" size={24} />
              <span className="text-text-muted font-medium">Instant Setup</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center justify-center space-x-3 glass p-4 rounded-xl border border-primary-red/20 hover:border-primary-red/40 transition-all duration-300"
            >
              <Shield className="text-primary-cyan" size={24} />
              <span className="text-text-muted font-medium">DDoS Protection</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center justify-center space-x-3 glass p-4 rounded-xl border border-primary-orange/20 hover:border-primary-orange/40 transition-all duration-300"
            >
              <Globe className="text-primary-red" size={24} />
              <span className="text-text-muted font-medium">Global Network</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements - Lazy loaded for performance */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-primary-cyan rounded-lg opacity-60 animate-pulse-bright pointer-events-none"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-primary-red rounded-lg opacity-50 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-accent-yellow rounded-lg opacity-40 pointer-events-none"></div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent"></div>
    </section>

    {/* Additional Sections */}
    <>
      <QuickActions onNavigate={onNavigate} />
      <HostingOverview onNavigate={onNavigate} />
      <DataCenters />
    </>
  </>
  );
}
