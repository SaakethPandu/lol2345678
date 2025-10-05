import { motion } from "motion/react";
import { Shield, AlertTriangle, Ban, Gavel, Users } from "lucide-react";
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

export function AcceptableUse() {
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
          <h1 className="font-bold heading-glow mb-4">Acceptable Use Policy</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Guidelines for responsible use of DishaGB Hosting services to ensure a safe and 
            positive experience for all our customers.
          </p>
          <div className="text-sm text-text-muted mt-2">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Purpose & Scope */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Shield className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Purpose & Scope</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Our Commitment</h3>
                <p>
                  DishaGB Hosting is committed to providing reliable, secure hosting services for 
                  legitimate purposes. This Acceptable Use Policy outlines what we consider 
                  appropriate use of our services and helps maintain a safe environment for all customers.
                </p>
              </div>
              
              <div>
                <h3 className="text-accent-white mb-3">Policy Application</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Applies to all DishaGB Hosting services and platforms</li>
                  <li>Covers Minecraft hosting, VPS hosting, and bot hosting</li>
                  <li>Includes customer websites, applications, and content</li>
                  <li>Extends to customer communications and support interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Customer Responsibility</h3>
                <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-4">
                  <p>
                    <strong className="text-primary-cyan">Important:</strong> You are responsible for 
                    ensuring that your use of our services complies with this policy, applicable laws, 
                    and the terms of your hosting agreement.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Permitted Uses */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-orange/20 rounded-xl mr-4">
                <Users className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="text-primary-orange">Permitted Uses</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Minecraft Hosting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Minecraft Java and Bedrock servers</li>
                    <li>Modded Minecraft servers (Forge, Fabric, etc.)</li>
                    <li>Gaming communities and guilds</li>
                    <li>Educational Minecraft projects</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Mini-game and adventure maps</li>
                    <li>Roleplay and creative servers</li>
                    <li>Competitive gaming tournaments</li>
                    <li>Streamers and content creators</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">VPS & Web Hosting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Business websites and applications</li>
                    <li>E-commerce platforms</li>
                    <li>Content management systems</li>
                    <li>Development and testing environments</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Personal blogs and portfolios</li>
                    <li>API services and microservices</li>
                    <li>Database hosting</li>
                    <li>Educational and research projects</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">Bot Hosting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Discord community bots</li>
                    <li>Gaming automation bots</li>
                    <li>Social media management</li>
                    <li>Customer service chatbots</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Notification and alert systems</li>
                    <li>Data monitoring and reporting</li>
                    <li>Workflow automation</li>
                    <li>API integration services</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Prohibited Activities */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <Ban className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Prohibited Activities</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-6">
                <h3 className="text-primary-red mb-4">Strictly Forbidden</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-accent-white mb-3">Illegal Activities</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Copyright and trademark infringement</li>
                      <li>Distribution of illegal content</li>
                      <li>Hacking or unauthorized access</li>
                      <li>Identity theft or fraud</li>
                      <li>Money laundering activities</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent-white mb-3">Harmful Content</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Adult content or pornography</li>
                      <li>Violence or hate speech</li>
                      <li>Harassment or cyberbullying</li>
                      <li>Discrimination based on protected classes</li>
                      <li>Self-harm or suicide promotion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">Network & Security Violations</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-primary-orange mb-3">Network Abuse</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>DDoS attacks or network flooding</li>
                      <li>Port scanning or vulnerability testing of third parties</li>
                      <li>Packet sniffing or network monitoring</li>
                      <li>Bandwidth abuse or resource hogging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-primary-orange mb-3">Security Threats</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Malware, viruses, or trojans</li>
                      <li>Phishing or social engineering</li>
                      <li>Brute force attacks</li>
                      <li>Unauthorized data collection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">Commercial Restrictions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-accent-yellow mb-3">Prohibited Services</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Cryptocurrency mining operations</li>
                      <li>High-frequency trading platforms</li>
                      <li>Proxy or VPN services</li>
                      <li>Email spam or bulk messaging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent-yellow mb-3">Restricted Content</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Gambling or betting platforms</li>
                      <li>Pyramid schemes or MLM</li>
                      <li>Counterfeit goods sales</li>
                      <li>Unregulated financial services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Resource Usage Guidelines */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-yellow/20 rounded-xl mr-4">
                <AlertTriangle className="w-6 h-6 text-accent-yellow" />
              </div>
              <h2 className="text-accent-yellow">Resource Usage Guidelines</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Fair Usage Principles</h3>
                <p className="mb-4">
                  While we provide generous resource allocations, usage must be reasonable and not 
                  interfere with other customers' services. We monitor resource usage to ensure fair 
                  access for all customers.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>CPU usage should not consistently max out allocated cores</li>
                  <li>Memory usage should stay within plan limits</li>
                  <li>Disk I/O should not cause system-wide performance issues</li>
                  <li>Network usage should be proportional to service requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Prohibited Resource Usage</h3>
                <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-4">
                  <p>
                    <strong className="text-accent-yellow">Examples of Abuse:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                    <li>Running multiple intensive processes simultaneously</li>
                    <li>Continuous high CPU usage for non-hosting purposes</li>
                    <li>Excessive bandwidth usage for content distribution</li>
                    <li>Storage of backup files for non-hosted services</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Resource Optimization</h3>
                <p>
                  If your usage consistently exceeds fair use guidelines, we'll work with you to 
                  optimize your setup or recommend a more suitable hosting plan. Our goal is to 
                  ensure optimal performance for all customers.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Enforcement & Consequences */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <Gavel className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Enforcement & Consequences</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Violation Response Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-accent-yellow/5 border border-accent-yellow/20 rounded-xl">
                    <div className="w-8 h-8 bg-accent-yellow/20 rounded-full flex items-center justify-center text-accent-yellow font-mono text-sm">1</div>
                    <div>
                      <h4 className="text-accent-white">Investigation</h4>
                      <p className="text-sm">We investigate reported violations promptly and thoroughly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-primary-orange/5 border border-primary-orange/20 rounded-xl">
                    <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center text-primary-orange font-mono text-sm">2</div>
                    <div>
                      <h4 className="text-accent-white">Notification</h4>
                      <p className="text-sm">You'll be notified of any violations and given opportunity to respond</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-primary-cyan/5 border border-primary-cyan/20 rounded-xl">
                    <div className="w-8 h-8 bg-primary-cyan/20 rounded-full flex items-center justify-center text-primary-cyan font-mono text-sm">3</div>
                    <div>
                      <h4 className="text-accent-white">Resolution</h4>
                      <p className="text-sm">Work with you to resolve issues when possible</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-primary-red/5 border border-primary-red/20 rounded-xl">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-full flex items-center justify-center text-primary-red font-mono text-sm">4</div>
                    <div>
                      <h4 className="text-accent-white">Enforcement</h4>
                      <p className="text-sm">Apply appropriate consequences based on violation severity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-4">Potential Consequences</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-primary-orange mb-3">Minor Violations</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Warning notice with corrective guidance</li>
                      <li>Temporary content removal</li>
                      <li>Resource usage optimization requirements</li>
                      <li>Account monitoring period</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-primary-red mb-3">Serious Violations</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Immediate service suspension</li>
                      <li>Account termination without refund</li>
                      <li>IP address blacklisting</li>
                      <li>Legal action and law enforcement reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Appeal Process</h3>
                <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-4">
                  <p>
                    If you believe enforcement action was taken in error, you can appeal by contacting 
                    our abuse team at abuse@dishagb.com. We'll review all appeals fairly and promptly.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Reporting Violations */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Shield className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Reporting Violations</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">How to Report</h3>
                <p className="mb-4">
                  If you encounter content or behavior that violates this policy, please report it to us immediately. 
                  We take all reports seriously and investigate promptly.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Email:</strong> abuse@dishagb.com for policy violations</li>
                  <li><strong>Security Issues:</strong> security@dishagb.com for security concerns</li>
                  <li><strong>DMCA Claims:</strong> dmca@dishagb.com for copyright issues</li>
                  <li><strong>Emergency:</strong> Call our 24/7 hotline for critical security threats</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Information to Include</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Detailed description of the violation</li>
                  <li>URLs, IP addresses, or server information</li>
                  <li>Screenshots or evidence (if applicable)</li>
                  <li>Date and time of the incident</li>
                  <li>Your contact information for follow-up</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Response Timeline</h3>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4">
                  <p>
                    We acknowledge all abuse reports within 24 hours and complete investigations within 
                    3-5 business days. Critical security issues are addressed immediately.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass rounded-2xl p-8 card-hover text-center"
          >
            <h2 className="text-accent-white mb-4">Questions About This Policy?</h2>
            <p className="text-text-secondary mb-6">
              Our team is here to help you understand our acceptable use guidelines and ensure 
              your services comply with our policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:abuse@dishagb.com" 
                className="btn-primary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                Abuse Team
              </a>
              <a 
                href="#support" 
                className="btn-secondary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                General Support
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}