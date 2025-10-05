import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Check, ArrowLeft, Bell, Server, Cpu, HardDrive, Shield, Zap, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VPSPricingProps {
  onNavigate: (page: string) => void;
}

export function VPSPricing({ onNavigate }: VPSPricingProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("You'll be notified when VPS hosting is available!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const upcomingFeatures = [
    {
      icon: Cpu,
      title: "Latest AMD EPYC & Intel Xeon Processors",
      description: "Cutting-edge CPU performance with dedicated cores"
    },
    {
      icon: HardDrive,
      title: "NVMe SSD Storage",
      description: "Lightning-fast storage with blazing read/write speeds"
    },
    {
      icon: Shield,
      title: "Advanced DDoS Protection",
      description: "Enterprise-grade security included at no extra cost"
    },
    {
      icon: Server,
      title: "Full Root Access",
      description: "Complete control with custom OS support"
    },
    {
      icon: Zap,
      title: "99.9% Uptime SLA",
      description: "Guaranteed reliability with redundant infrastructure"
    },
    {
      icon: Clock,
      title: "24/7 Expert Support",
      description: "Round-the-clock technical assistance from our team"
    }
  ];

  const plannedPlans = [
    {
      name: "VPS Starter",
      estimatedPrice: "₹599",
      cpu: "2 vCPU",
      ram: "4 GB",
      storage: "50 GB NVMe",
      bandwidth: "1 TB",
      features: ["1 IPv4 Address", "Full Root Access", "Choice of OS"],
      popular: false
    },
    {
      name: "VPS Professional",
      estimatedPrice: "₹1199",
      cpu: "4 vCPU",
      ram: "8 GB",
      storage: "100 GB NVMe",
      bandwidth: "2 TB",
      features: ["2 IPv4 Addresses", "Full Root Access", "Choice of OS", "Free Backups"],
      popular: true
    },
    {
      name: "VPS Enterprise",
      estimatedPrice: "₹2399",
      cpu: "8 vCPU",
      ram: "16 GB",
      storage: "200 GB NVMe",
      bandwidth: "4 TB",
      features: ["4 IPv4 Addresses", "Full Root Access", "Choice of OS", "Free Backups", "Priority Support"],
      popular: false
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 via-transparent to-primary-cyan/5"></div>
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
            className="border-primary-orange/30 text-primary-orange hover:bg-primary-orange/10 hover:border-primary-orange"
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
          <Badge className="bg-accent-yellow text-bg-primary px-4 py-2 text-lg mb-6 animate-pulse-bright">
            🚧 Coming Very Soon! 🚧
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🖥️ <span className="heading-glow">VPS Hosting</span> <span className="text-white">Plans</span>
          </h1>
          <p className="text-medium-contrast text-lg max-w-3xl mx-auto">
            High-performance Virtual Private Servers with cutting-edge hardware and enterprise-grade infrastructure. 
            Get ready for the ultimate hosting experience!
          </p>
        </motion.div>

        {/* Main Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass orange-glow border-glass-border text-center p-8">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-3xl orange-glow bg-glass-bg border border-glass-border">
                  <Server className="w-16 h-16 text-primary-orange" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold heading-glow mb-4">
                🚀 VPS Hosting – Launching Soon!
              </CardTitle>
              <p className="text-medium-contrast text-lg max-w-2xl mx-auto">
                We're putting the finishing touches on our state-of-the-art VPS infrastructure. 
                Be the first to experience blazing-fast performance and enterprise-grade reliability.
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Notify Me Form */}
              <form onSubmit={handleNotifyMe} className="max-w-md mx-auto mb-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-primary-cyan font-medium">
                      Get notified when VPS hosting launches
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 bg-glass-bg border-glass-border text-high-contrast"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      disabled={isSubscribing}
                      className="w-full bg-primary-orange hover:bg-deep-orange text-accent-white font-medium py-3 transition-all duration-300 hover-glow"
                    >
                      {isSubscribing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4 mr-2" />
                          Notify Me When Available
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </form>

              <p className="text-muted-contrast text-sm">
                💡 <strong>Early Bird Special:</strong> First 100 subscribers get 50% off their first month!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-orange mb-4">✨ What to Expect</h2>
            <p className="text-medium-contrast">Enterprise-grade features designed for maximum performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass cyan-glow border-glass-border hover:orange-glow transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-2xl cyan-glow bg-glass-bg border border-glass-border">
                        <feature.icon className="w-6 h-6 text-primary-cyan" />
                      </div>
                    </div>
                    <CardTitle className="text-high-contrast font-bold text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-medium-contrast text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Planned Pricing Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-cyan mb-4">📊 Estimated Pricing</h2>
            <p className="text-medium-contrast">Preview of our upcoming VPS plans (prices may vary at launch)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plannedPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className={`glass border-glass-border transition-all duration-300 hover-bounce relative ${
                  plan.popular ? 'orange-glow border-primary-orange/60' : 'cyan-glow'
                }`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-orange text-accent-white animate-pulse-bright">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-white font-bold text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary-cyan mb-2">
                      {plan.estimatedPrice}<span className="text-lg text-muted-contrast">/month</span>
                    </div>
                    <Badge variant="outline" className="border-primary-cyan/30 text-medium-contrast">
                      Estimated Price
                    </Badge>
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
                      <Server className="w-4 h-4 text-primary-cyan mr-3" />
                      <span className="font-medium">Storage:</span> {plan.storage}
                    </div>
                    <div className="flex items-center text-medium-contrast">
                      <Zap className="w-4 h-4 text-accent-yellow mr-3" />
                      <span className="font-medium">Bandwidth:</span> {plan.bandwidth}
                    </div>
                    
                    <div className="pt-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-medium-contrast text-sm">
                          <Check className="w-3 h-3 text-accent-yellow mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center glass p-8 rounded-2xl border border-glass-border hover:orange-glow transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-high-contrast mb-4">
            Why Wait for <span className="text-accent-yellow">DishaGB VPS?</span>
          </h3>
          <p className="text-medium-contrast mb-6 max-w-2xl mx-auto">
            We're building the most <span className="text-primary-orange font-medium">powerful and affordable</span> VPS hosting 
            solution with cutting-edge technology and unmatched support.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-medium-contrast">
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-accent-yellow rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">Latest Hardware</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-primary-cyan rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">99.9% Uptime SLA</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-primary-orange rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">24/7 Support</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 bg-text-muted rounded-full mb-2 animate-pulse"></span>
              <span className="font-medium">Competitive Pricing</span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}