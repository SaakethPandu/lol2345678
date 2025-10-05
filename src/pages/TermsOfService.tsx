import { motion } from "motion/react";
import { Scale, AlertTriangle, CreditCard, Server, Users } from "lucide-react";
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

export function TermsOfService() {
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
          <h1 className="font-bold heading-glow mb-4">Terms of Service</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            These terms govern your use of DishaGB Hosting services. Please read them carefully 
            before using our hosting platforms.
          </p>
          <div className="text-sm text-text-muted mt-2">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Service Agreement */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Scale className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Service Agreement</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Acceptance of Terms</h3>
                <p>
                  By accessing or using DishaGB Hosting services, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using our services.
                </p>
              </div>
              
              <div>
                <h3 className="text-accent-white mb-3">Service Availability</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We strive to maintain 99.9% uptime for all hosting services</li>
                  <li>Scheduled maintenance will be announced 48 hours in advance</li>
                  <li>Emergency maintenance may occur without prior notice</li>
                  <li>Service credits may be provided for significant downtime as per our SLA</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Account Responsibilities</h3>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Regularly backing up your data and configurations</li>
                  <li>Keeping your contact information current and accurate</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Payment Terms */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-orange/20 rounded-xl mr-4">
                <CreditCard className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="text-primary-orange">Payment Terms</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Billing Cycles</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Monthly plans are billed on the anniversary date of your subscription</li>
                  <li>Annual plans are billed in advance for the full year</li>
                  <li>Setup fees (if applicable) are charged upon service activation</li>
                  <li>All prices are in Indian Rupees (₹) unless otherwise specified</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Payment Methods</h3>
                <p>We accept the following payment methods:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Credit and debit cards (Visa, MasterCard, RuPay)</li>
                  <li>Net banking from major Indian banks</li>
                  <li>UPI payments and digital wallets</li>
                  <li>Bank transfers for enterprise accounts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Refund Policy</h3>
                <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-4">
                  <p><strong className="text-primary-cyan">30-Day Money-Back Guarantee:</strong></p>
                  <p className="mt-2">
                    We offer a full refund within 30 days of your initial purchase if you're not 
                    satisfied with our service. Setup fees and domain registrations are non-refundable.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Service Usage */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <Server className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Service Usage Guidelines</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Permitted Uses</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Minecraft server hosting for gaming communities</li>
                  <li>Discord and other gaming bot hosting</li>
                  <li>Web applications and websites</li>
                  <li>Development and testing environments</li>
                  <li>Personal projects and portfolios</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Resource Limits</h3>
                <p>Your usage must stay within the limits of your chosen plan:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>CPU usage should not consistently exceed allocated resources</li>
                  <li>RAM usage is limited to your plan's allocation</li>
                  <li>Storage limits include all files, databases, and backups</li>
                  <li>Bandwidth limits apply to total monthly data transfer</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Fair Use Policy</h3>
                <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-4">
                  <p>
                    While we offer "unlimited" features on some plans, usage must be reasonable and 
                    not interfere with other customers' services. Excessive resource usage may result 
                    in service optimization requests or plan upgrades.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Prohibited Activities */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <AlertTriangle className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Prohibited Activities</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-6">
                <h3 className="text-primary-red mb-4">Strictly Forbidden:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Illegal content or activities</li>
                    <li>Copyright infringement</li>
                    <li>Spam or bulk email sending</li>
                    <li>DDoS attacks or network abuse</li>
                    <li>Cryptocurrency mining</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Adult content or gambling</li>
                    <li>Malware or virus distribution</li>
                    <li>Proxy or VPN services</li>
                    <li>High-frequency trading</li>
                    <li>Resource-intensive processes</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Consequences of Violations</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Warning:</strong> First violation may result in a warning notice</li>
                  <li><strong>Suspension:</strong> Repeated violations lead to service suspension</li>
                  <li><strong>Termination:</strong> Serious violations result in immediate account termination</li>
                  <li><strong>Legal Action:</strong> Criminal activities will be reported to authorities</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-yellow/20 rounded-xl mr-4">
                <Users className="w-6 h-6 text-accent-yellow" />
              </div>
              <h2 className="text-accent-yellow">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Service Disclaimers</h3>
                <p>
                  DishaGB Hosting provides services "as is" without warranties of any kind. 
                  We do not guarantee that our services will be uninterrupted, error-free, 
                  or completely secure.
                </p>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Liability Limitations</h3>
                <p>
                  Our total liability for any claims arising from our services shall not exceed 
                  the amount you paid for services in the 12 months preceding the claim. 
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Data Backup Responsibility</h3>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4">
                  <p>
                    <strong className="text-primary-orange">Important:</strong> You are solely responsible 
                    for backing up your data. While we perform regular system backups, we recommend 
                    maintaining your own backups for critical data.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Modifications */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8 card-hover text-center"
          >
            <h2 className="text-accent-white mb-4">Terms Modifications</h2>
            <p className="text-text-secondary mb-6">
              We reserve the right to modify these terms at any time. Material changes will be 
              communicated via email and our website. Continued use of our services constitutes 
              acceptance of modified terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:legal@dishagb.com" 
                className="btn-primary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                Legal Questions
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