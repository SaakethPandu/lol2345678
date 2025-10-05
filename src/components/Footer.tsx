import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Heart,
  Zap,
  Shield,
  Globe,
  MessageCircle,
} from "lucide-react";

const footerLinks = {
  products: [
    { name: "Minecraft Hosting", page: "pricing-minecraft" },
    { name: "VPS Hosting", page: "pricing-vps" },
    { name: "Bot Hosting", page: "pricing-bots" },
    { name: "Dedicated Servers", href: "#" },
    { name: "Domain Registration", href: "#" },
  ],
  support: [
    { name: "Help Center", page: "support" },
    { name: "Live Chat", href: "#" },
    { name: "Server Status", href: "#" },
    { name: "Contact Support", page: "support" },
    { name: "Documentation", href: "#" },
  ],
  company: [
    { name: "About Us", page: "about" },
    { name: "Blog", page: "blog" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", page: "privacy-policy" },
    { name: "Terms of Service", page: "terms-of-service" },
    { name: "Cookie Policy", page: "cookie-policy" },
    { name: "SLA Agreement", page: "sla-agreement" },
    { name: "Acceptable Use", page: "acceptable-use" },
  ],
};

const features = [
  { icon: Zap, text: "Instant Setup" },
  { icon: Shield, text: "DDoS Protection" },
  { icon: Globe, text: "Global Network" },
  { icon: Heart, text: "24/7 Support" },
];

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  return (
    <footer className="relative bg-bg-secondary border-t border-neon-blue/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-4">
                  DishaGB Hosting
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Powering the future of gaming with{" "}
                  <span className="text-primary-cyan">
                    premium infrastructure
                  </span>{" "}
                  and
                  <span className="text-primary-orange">
                    {" "}
                    cutting-edge hosting solutions
                  </span>
                  . Join thousands of gamers who trust us for
                  their{" "}
                  <span className="text-accent-yellow">
                    digital adventures
                  </span>
                  .
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-text-muted">
                  <Mail className="w-4 h-4 text-primary-cyan mr-3" />
                  <a 
                    href="mailto:support@dishagb.shop"
                    className="text-sm hover:text-primary-cyan transition-colors"
                  >
                    support@dishagb.shop
                  </a>
                </div>
                
                <div className="flex items-center text-text-muted">
                  <MapPin className="w-4 h-4 text-primary-red mr-3" />
                  <span className="text-sm">
                    Mumbai, India
                  </span>
                </div>
              </div>

              {/* Discord Button */}
              <motion.button
                onClick={() => window.open('https://discord.gg/4pZ6EkcMv9', '_blank')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover-glow transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Discord</span>
              </motion.button>
            </motion.div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Products */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Products
                </h4>
                <ul className="space-y-3">
                  {footerLinks.products.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.page ? (
                        <button
                          onClick={() => onNavigate?.(link.page)}
                          className="text-text-muted hover:text-primary-cyan transition-colors text-sm text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-text-muted hover:text-primary-cyan transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Support
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.page ? (
                        <button
                          onClick={() => onNavigate?.(link.page)}
                          className="text-text-muted hover:text-primary-orange transition-colors text-sm text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-text-muted hover:text-primary-orange transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.page ? (
                        <button
                          onClick={() => onNavigate?.(link.page)}
                          className="text-text-muted hover:text-primary-red transition-colors text-sm text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-text-muted hover:text-primary-red transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.page ? (
                        <button
                          onClick={() => onNavigate?.(link.page)}
                          className="text-text-muted hover:text-accent-yellow transition-colors text-sm text-left"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-text-muted hover:text-accent-yellow transition-colors text-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-neon-blue/20 py-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center space-x-3 glass p-4 rounded-lg border border-primary-cyan/20 hover:border-primary-cyan/40 transition-all duration-300"
                >
                  <IconComponent className="w-5 h-5 text-primary-cyan" />
                  <span className="text-text-secondary text-sm font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-neon-blue/20 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-text-muted text-sm">
              <span>
                © 2025 DishaGB Hosting. All rights reserved.
              </span>
              <span className="mx-3 text-primary-cyan">•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary-red mx-1 animate-pulse" />
              <span>by</span>
              <a 
                href="https://rudracore.in"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-primary-cyan hover:text-primary-orange transition-colors font-medium"
              >
                RudraCore
              </a>
            </div>

            <div className="flex items-center space-x-6 text-sm text-text-muted">
              <span className="flex items-center">
                <span className="text-xl mr-2">🟢</span>
                All systems operational
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-6 h-6 bg-primary-cyan rounded-lg opacity-30"
      ></motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-10 right-1/4 w-4 h-4 bg-primary-orange rounded-lg opacity-20"
      ></motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-cyan to-transparent"></div>
    </footer>
  );
}
