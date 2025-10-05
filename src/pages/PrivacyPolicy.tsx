import { motion } from "motion/react";
import { Shield, Lock, Eye, Globe, FileText } from "lucide-react";
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

export function PrivacyPolicy() {
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
          <h1 className="font-bold heading-glow mb-4">Privacy Policy</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how DishaGB Hosting collects, 
            uses, and protects your personal information.
          </p>
          <div className="text-sm text-text-muted mt-2">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Information We Collect */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <FileText className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Information We Collect</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account registration details (username, email address)</li>
                  <li>Billing information (name, address, payment details)</li>
                  <li>Contact information for support requests</li>
                  <li>Server configuration and usage preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-accent-white mb-3">Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP addresses and connection logs</li>
                  <li>Server performance and usage statistics</li>
                  <li>Website analytics and user behavior data</li>
                  <li>Device information and browser details</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-orange/20 rounded-xl mr-4">
                <Eye className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="text-primary-orange">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-4 text-text-secondary">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-cyan rounded-full mt-2"></div>
                <p><strong className="text-accent-white">Service Provision:</strong> To create and manage your hosting accounts, process payments, and deliver requested services.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-orange rounded-full mt-2"></div>
                <p><strong className="text-accent-white">Customer Support:</strong> To respond to inquiries, troubleshoot issues, and provide technical assistance.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                <p><strong className="text-accent-white">Service Improvement:</strong> To analyze usage patterns, optimize performance, and develop new features.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-yellow rounded-full mt-2"></div>
                <p><strong className="text-accent-white">Security:</strong> To protect our systems, detect fraud, and ensure compliance with our terms of service.</p>
              </div>
            </div>
          </motion.section>

          {/* Data Protection */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <Shield className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Security Measures</h3>
                <p className="mb-4">We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>256-bit SSL encryption for all data transmission</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for administrative access</li>
                  <li>Encrypted data storage with secure backup systems</li>
                  <li>24/7 monitoring and intrusion detection</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-accent-white mb-3">Data Retention</h3>
                <p>We retain your personal information only as long as necessary to provide our services and comply with legal obligations. Account data is typically retained for the duration of your subscription plus 30 days for billing purposes.</p>
              </div>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-yellow/20 rounded-xl mr-4">
                <Lock className="w-6 h-6 text-accent-yellow" />
              </div>
              <h2 className="text-accent-yellow">Your Privacy Rights</h2>
            </div>
            
            <div className="space-y-4 text-text-secondary">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-accent-white">Access & Portability</h3>
                  <p>Request a copy of your personal data in a structured format</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-accent-white">Correction</h3>
                  <p>Update or correct inaccurate personal information</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-accent-white">Deletion</h3>
                  <p>Request deletion of your personal data (subject to legal requirements)</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-accent-white">Restriction</h3>
                  <p>Limit how we process your personal information</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* GDPR Compliance */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Globe className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">GDPR Compliance</h2>
            </div>
            
            <div className="text-text-secondary space-y-4">
              <p>
                DishaGB Hosting is fully compliant with the General Data Protection Regulation (GDPR) 
                and other applicable privacy laws. We ensure that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal data is never sold or shared with third parties for marketing purposes</li>
                <li>Data processing is based on lawful grounds (consent, contract, or legitimate interest)</li>
                <li>Data breach notifications are made within 72 hours when required</li>
                <li>Privacy by design principles are implemented in all our systems</li>
                <li>Regular privacy impact assessments are conducted</li>
              </ul>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8 card-hover text-center"
          >
            <h2 className="text-accent-white mb-4">Questions About Privacy?</h2>
            <p className="text-text-secondary mb-6">
              If you have questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us.
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