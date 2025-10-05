import { motion } from "motion/react";
import { Cookie, Settings, BarChart3, Shield, ToggleLeft } from "lucide-react";
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-bg-primary py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <img src={logoImage} alt="DishaGB Logo" className="w-20 h-20 rounded-full" />
          </div>
          <h1 className="font-bold heading-glow mb-4">Cookie Policy</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Learn how DishaGB Hosting uses cookies and similar technologies to enhance your 
            experience and provide our services effectively.
          </p>
          <div className="text-sm text-text-muted mt-2">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* What Are Cookies */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Cookie className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">What Are Cookies?</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <p className="mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  analyzing how you use our services.
                </p>
              </div>
              
              <div>
                <h3 className="text-accent-white mb-3">Types of Cookies We Use</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary-cyan/5 border border-primary-cyan/20 rounded-xl p-4">
                    <h4 className="text-primary-cyan mb-2">Essential Cookies</h4>
                    <p className="text-sm">Required for basic website functionality and security</p>
                  </div>
                  <div className="bg-primary-orange/5 border border-primary-orange/20 rounded-xl p-4">
                    <h4 className="text-primary-orange mb-2">Performance Cookies</h4>
                    <p className="text-sm">Help us understand how visitors interact with our website</p>
                  </div>
                  <div className="bg-primary-red/5 border border-primary-red/20 rounded-xl p-4">
                    <h4 className="text-primary-red mb-2">Functional Cookies</h4>
                    <p className="text-sm">Remember your preferences and personalize your experience</p>
                  </div>
                  <div className="bg-accent-yellow/5 border border-accent-yellow/20 rounded-xl p-4">
                    <h4 className="text-accent-yellow mb-2">Analytics Cookies</h4>
                    <p className="text-sm">Collect information about website usage and performance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* How We Use Cookies */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-orange/20 rounded-xl mr-4">
                <Settings className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="text-primary-orange">How We Use Cookies</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Essential Functions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-cyan rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-accent-white">Authentication</h4>
                      <p>Keep you logged in to your hosting account and admin dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-accent-white">Security</h4>
                      <p>Protect against fraudulent activity and secure your sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-accent-white">Shopping Cart</h4>
                      <p>Remember items in your cart during the ordering process</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">Enhanced Experience</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-yellow rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-accent-white">Preferences</h4>
                      <p>Remember your language, theme, and dashboard settings</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-cyan rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-accent-white">Personalization</h4>
                      <p>Customize content and recommendations based on your usage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Third-Party Cookies */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <BarChart3 className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Third-Party Services</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Analytics & Monitoring</h3>
                <p className="mb-4">We use trusted third-party services to improve our website and services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                  <li><strong>CloudFlare:</strong> Performance optimization and security monitoring</li>
                  <li><strong>StatusPage:</strong> Service status monitoring and incident communication</li>
                  <li><strong>Intercom:</strong> Customer support chat functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Payment Processing</h3>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4">
                  <p>
                    Our payment processors (Razorpay, PayU) may set cookies to secure transactions 
                    and prevent fraud. These cookies are essential for processing payments safely.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Social Media Integration</h3>
                <p>
                  If you interact with social media features on our site (like sharing buttons), 
                  those platforms may set their own cookies according to their privacy policies.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Cookie Management */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-yellow/20 rounded-xl mr-4">
                <ToggleLeft className="w-6 h-6 text-accent-yellow" />
              </div>
              <h2 className="text-accent-yellow">Managing Your Cookie Preferences</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Browser Controls</h3>
                <p className="mb-4">You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Block all cookies (may affect website functionality)</li>
                  <li>Delete existing cookies from your device</li>
                  <li>Set notifications when cookies are being used</li>
                  <li>Manage cookies on a site-by-site basis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Browser-Specific Instructions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-primary-cyan/5 border border-primary-cyan/20 rounded-xl p-4">
                    <h4 className="text-primary-cyan mb-2">Chrome</h4>
                    <p className="text-sm">Settings → Privacy & Security → Cookies</p>
                  </div>
                  <div className="bg-primary-orange/5 border border-primary-orange/20 rounded-xl p-4">
                    <h4 className="text-primary-orange mb-2">Firefox</h4>
                    <p className="text-sm">Options → Privacy & Security → Cookies</p>
                  </div>
                  <div className="bg-primary-red/5 border border-primary-red/20 rounded-xl p-4">
                    <h4 className="text-primary-red mb-2">Safari</h4>
                    <p className="text-sm">Preferences → Privacy → Cookies</p>
                  </div>
                  <div className="bg-accent-yellow/5 border border-accent-yellow/20 rounded-xl p-4">
                    <h4 className="text-accent-yellow mb-2">Edge</h4>
                    <p className="text-sm">Settings → Cookies and site permissions</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Impact of Disabling Cookies</h3>
                <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-4">
                  <p>
                    <strong className="text-primary-red">Note:</strong> Disabling cookies may affect 
                    your experience on our website. Essential cookies are required for basic functionality 
                    like logging in and making purchases.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Data Retention */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Shield className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Cookie Data Retention</h2>
            </div>
            
            <div className="space-y-4 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Retention Periods</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-primary-cyan">Session Cookies</h4>
                    <p>Deleted when you close your browser</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-primary-orange">Persistent Cookies</h4>
                    <p>Stored for up to 2 years or until manually deleted</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-primary-red">Analytics Cookies</h4>
                    <p>Retained for 24 months for trend analysis</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-accent-yellow">Preference Cookies</h4>
                    <p>Stored indefinitely until you change settings</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Your Rights</h3>
                <p>
                  You have the right to know what cookies we use, opt-out of non-essential cookies, 
                  and request deletion of your cookie data at any time.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8 card-hover text-center"
          >
            <h2 className="text-accent-white mb-4">Questions About Cookies?</h2>
            <p className="text-text-secondary mb-6">
              If you have questions about our cookie policy or need help managing your preferences, 
              we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@dishagb.com" 
                className="btn-primary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                Email Privacy Team
              </a>
              <a 
                href="#support" 
                className="btn-secondary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                Contact Support
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}