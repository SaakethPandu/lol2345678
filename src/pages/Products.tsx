import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Server, 
  Cloud, 
  Database, 
  Shield, 
  Zap, 
  Globe,
  Cpu,
  HardDrive,
  ArrowRight
} from "lucide-react";

const products = [
  {
    id: "minecraft-hosting",
    title: "Minecraft Hosting",
    description: "High-performance servers optimized for Minecraft with instant setup and full mod support.",
    icon: Server,
    features: ["Instant Setup", "Full Mod Support", "DDoS Protection", "24/7 Support"],
    price: "From ₹110/month",
    gradient: "from-neon-blue to-neon-purple",
    popular: true
  },
  {
    id: "vps-hosting",
    title: "VPS Hosting",
    description: "Powerful virtual private servers with full root access and scalable resources.",
    icon: Cloud,
    features: ["Full Root Access", "SSD Storage", "Scalable Resources", "Multiple OS Options"],
    price: "From ₹750/month",
    gradient: "from-neon-purple to-neon-pink"
  },
  {
    id: "bot-hosting",
    title: "Bot Hosting",
    description: "Specialized hosting for Discord bots and applications with 24/7 uptime guarantee.",
    icon: Database,
    features: ["24/7 Uptime", "Auto Restart", "Log Monitoring", "Easy Deployment"],
    price: "From ₹40/month",
    gradient: "from-neon-pink to-neon-lime"
  },
  {
    id: "web-hosting",
    title: "Web Hosting",
    description: "Fast and reliable web hosting with SSD storage and free SSL certificates.",
    icon: Globe,
    features: ["Free SSL", "SSD Storage", "99.9% Uptime", "WordPress Ready"],
    price: "From ₹200/month",
    gradient: "from-neon-lime to-neon-blue"
  },
  {
    id: "dedicated-servers",
    title: "Dedicated Servers",
    description: "Enterprise-grade dedicated servers with maximum performance and security.",
    icon: Cpu,
    features: ["Dedicated Resources", "Premium Hardware", "Advanced Security", "Custom Config"],
    price: "From ₹15000/month",
    gradient: "from-neon-blue to-cyber-purple"
  },
  {
    id: "backup-services",
    title: "Backup Services",
    description: "Automated backup solutions to keep your data safe and easily recoverable.",
    icon: HardDrive,
    features: ["Automated Backups", "One-Click Restore", "Encrypted Storage", "Multiple Locations"],
    price: "From ₹100/month",
    gradient: "from-cyber-purple to-neon-pink"
  }
];

export function Products() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="neon-gradient-text">Products</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Discover our comprehensive range of <span className="text-neon-blue">hosting solutions</span> designed 
            to power your digital presence with <span className="text-neon-purple">cutting-edge technology</span>.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className={`relative glass border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 hover-neon h-full ${
                  product.popular ? 'border-neon-purple/50 neon-glow-purple' : ''
                }`}>
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-purple to-neon-pink text-white px-4 py-1 rounded-full text-xs font-medium animate-pulse-neon">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${product.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white transition-all duration-300">
                      {product.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-neon-lime rounded-full mr-3 group-hover:animate-pulse"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="border-t border-neon-blue/20 pt-4">
                      <div className="text-lg font-bold text-primary-cyan mb-4">
                        {product.price}
                      </div>
                      
                      {/* Features highlight */}
                      <div className="text-muted-contrast text-sm">
                        Explore our comprehensive {product.title.toLowerCase()} solutions
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 glass p-8 rounded-2xl border border-neon-blue/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a <span className="text-neon-lime">Custom Solution?</span>
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our enterprise team can create a <span className="text-neon-blue">tailored hosting solution</span> that perfectly fits your unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-3 transition-all duration-300 hover-neon font-medium">
                Contact Enterprise Sales
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10 hover:border-neon-lime px-8 py-3 transition-all duration-300">
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}