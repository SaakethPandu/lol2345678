import { motion } from "motion/react";
import { Clock, Zap, Headphones, DollarSign, Activity } from "lucide-react";
import logoImage from 'figma:asset/9ba924ac5d4f35f69b4f35790956421f4e208b45.png';

export function SLAAgreement() {
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
          <h1 className="font-bold heading-glow mb-4">Service Level Agreement</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our commitment to providing reliable, high-performance hosting services with 
            guaranteed uptime and responsive support.
          </p>
          <div className="text-sm text-text-muted mt-2">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Uptime Guarantee */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Activity className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Uptime Guarantee</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-cyan/20 to-primary-orange/20 rounded-full mb-6">
                  <div className="text-4xl font-bold text-white">99.9%</div>
                </div>
                <h3 className="text-accent-white mb-2">Minimum Uptime Commitment</h3>
                <p>We guarantee 99.9% uptime for all our hosting services</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-6 text-center">
                  <div className="text-2xl text-primary-cyan mb-2">43.8 min</div>
                  <div className="text-sm">Maximum Monthly Downtime</div>
                </div>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-6 text-center">
                  <div className="text-2xl text-primary-orange mb-2">8.77 hrs</div>
                  <div className="text-sm">Maximum Annual Downtime</div>
                </div>
                <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-6 text-center">
                  <div className="text-2xl text-primary-red mb-2">24/7</div>
                  <div className="text-sm">Continuous Monitoring</div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">What's Included in Uptime</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Server availability and responsiveness</li>
                  <li>Network connectivity and routing</li>
                  <li>Core hosting services (web, database, email)</li>
                  <li>Control panel and administrative interfaces</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Planned Maintenance Exclusions</h3>
                <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-4">
                  <p>
                    <strong className="text-accent-yellow">Scheduled Maintenance:</strong> 
                    Planned maintenance windows (announced 48+ hours in advance) are excluded 
                    from uptime calculations. Emergency maintenance may occur with minimal notice.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Performance Standards */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-orange/20 rounded-xl mr-4">
                <Zap className="w-6 h-6 text-primary-orange" />
              </div>
              <h2 className="text-primary-orange">Performance Standards</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Server Response Times</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-primary-cyan/5 border border-primary-cyan/20 rounded-xl">
                      <span>Web Pages</span>
                      <span className="text-primary-cyan">&lt; 200ms</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary-orange/5 border border-primary-orange/20 rounded-xl">
                      <span>Database Queries</span>
                      <span className="text-primary-orange">&lt; 100ms</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary-red/5 border border-primary-red/20 rounded-xl">
                      <span>API Responses</span>
                      <span className="text-primary-red">&lt; 150ms</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-accent-yellow/5 border border-accent-yellow/20 rounded-xl">
                      <span>Minecraft Server</span>
                      <span className="text-accent-yellow">&lt; 50ms</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary-cyan/5 border border-primary-cyan/20 rounded-xl">
                      <span>Bot Responses</span>
                      <span className="text-primary-cyan">&lt; 100ms</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-primary-orange/5 border border-primary-orange/20 rounded-xl">
                      <span>VPS Boot Time</span>
                      <span className="text-primary-orange">&lt; 30s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Network Performance</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Mumbai Node:</strong> 22-46ms average ping from major Indian cities</li>
                  <li><strong>Noida Node:</strong> 24-52ms average ping from North India</li>
                  <li><strong>Karnataka Node:</strong> 24-52ms average ping from South India</li>
                  <li><strong>International Connectivity:</strong> Sub-200ms to major global destinations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Resource Availability</h3>
                <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-4">
                  <p>
                    CPU, RAM, and storage resources will be available as allocated in your plan. 
                    Burst capacity may be available during low-usage periods without additional charges.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Support Response Times */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-red/20 rounded-xl mr-4">
                <Headphones className="w-6 h-6 text-primary-red" />
              </div>
              <h2 className="text-primary-red">Support Response Times</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Priority Levels</h3>
                <div className="space-y-4">
                  <div className="border border-primary-red/30 rounded-xl p-6 bg-primary-red/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-primary-red">Critical (P1)</h4>
                      <span className="text-primary-red font-mono">15 minutes</span>
                    </div>
                    <p className="text-sm">Server down, service unavailable, data loss</p>
                  </div>
                  
                  <div className="border border-primary-orange/30 rounded-xl p-6 bg-primary-orange/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-primary-orange">High (P2)</h4>
                      <span className="text-primary-orange font-mono">1 hour</span>
                    </div>
                    <p className="text-sm">Performance issues, partial service disruption</p>
                  </div>
                  
                  <div className="border border-accent-yellow/30 rounded-xl p-6 bg-accent-yellow/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-accent-yellow">Medium (P3)</h4>
                      <span className="text-accent-yellow font-mono">4 hours</span>
                    </div>
                    <p className="text-sm">General issues, configuration questions</p>
                  </div>
                  
                  <div className="border border-primary-cyan/30 rounded-xl p-6 bg-primary-cyan/5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-primary-cyan">Low (P4)</h4>
                      <span className="text-primary-cyan font-mono">24 hours</span>
                    </div>
                    <p className="text-sm">Feature requests, general inquiries</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Support Channels</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Live Chat:</strong> Available 24/7 for immediate assistance</li>
                  <li><strong>Email Support:</strong> support@dishagb.com with guaranteed response times</li>
                  <li><strong>Phone Support:</strong> Available for Premium and Enterprise customers</li>
                  <li><strong>Discord Community:</strong> Community support and announcements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Escalation Process</h3>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4">
                  <p>
                    If initial response times are not met, tickets are automatically escalated to 
                    senior technicians and management for immediate attention.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Service Credits */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent-yellow/20 rounded-xl mr-4">
                <DollarSign className="w-6 h-6 text-accent-yellow" />
              </div>
              <h2 className="text-accent-yellow">Service Credits & Compensation</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-4">Uptime Service Credits</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-primary-red/10 border border-primary-red/30 rounded-xl p-4 text-center">
                      <div className="text-primary-red mb-2">99.0% - 99.8%</div>
                      <div className="text-sm">10% Credit</div>
                    </div>
                    <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4 text-center">
                      <div className="text-primary-orange mb-2">95.0% - 98.9%</div>
                      <div className="text-sm">25% Credit</div>
                    </div>
                    <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-4 text-center">
                      <div className="text-primary-cyan mb-2">Below 95.0%</div>
                      <div className="text-sm">50% Credit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Credit Application Process</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Service credits are calculated monthly based on actual uptime</li>
                  <li>Credits are automatically applied to your next invoice</li>
                  <li>No action required - we monitor and apply credits proactively</li>
                  <li>Credits can be requested for up to 60 days after the incident</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Additional Compensation</h3>
                <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-xl p-4">
                  <p>
                    <strong className="text-primary-cyan">Data Loss Protection:</strong> 
                    In the unlikely event of data loss due to our fault, we provide full restoration 
                    from backups plus additional service credits equal to 3 months of service.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Credit Limitations</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maximum credit per month: 100% of monthly service fees</li>
                  <li>Credits expire 12 months from issue date if unused</li>
                  <li>Credits cannot be converted to cash or refunds</li>
                  <li>Scheduled maintenance downtime is excluded from calculations</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Monitoring & Reporting */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-cyan/20 rounded-xl mr-4">
                <Clock className="w-6 h-6 text-primary-cyan" />
              </div>
              <h2 className="text-primary-cyan">Monitoring & Reporting</h2>
            </div>
            
            <div className="space-y-6 text-text-secondary">
              <div>
                <h3 className="text-accent-white mb-3">Continuous Monitoring</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>24/7 automated monitoring from multiple locations</li>
                  <li>Real-time alerts for service disruptions</li>
                  <li>Performance metrics tracked every 60 seconds</li>
                  <li>Synthetic transaction monitoring for critical services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Transparency</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Status Page:</strong> Real-time service status at status.dishagb.com</li>
                  <li><strong>Monthly Reports:</strong> Detailed uptime and performance reports</li>
                  <li><strong>Incident Reports:</strong> Post-incident analysis and remediation steps</li>
                  <li><strong>API Access:</strong> Programmatic access to service metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-accent-white mb-3">Proactive Communication</h3>
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-xl p-4">
                  <p>
                    We believe in transparent communication. You'll be notified immediately of any 
                    service issues via email, SMS, and our status page, along with regular updates 
                    until resolution.
                  </p>
                </div>
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
            <h2 className="text-accent-white mb-4">SLA Questions or Claims?</h2>
            <p className="text-text-secondary mb-6">
              Our SLA team is here to help with any questions about our service commitments 
              or to process service credit requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:sla@dishagb.com" 
                className="btn-primary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                SLA Team
              </a>
              <a 
                href="#support" 
                className="btn-secondary px-6 py-3 rounded-xl hover-bounce inline-block"
              >
                24/7 Support
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}