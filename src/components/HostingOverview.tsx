import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Server, Bot, Zap } from "lucide-react";

interface HostingOverviewProps {
  onNavigate: (page: string) => void;
}

export function HostingOverview({ onNavigate }: HostingOverviewProps) {
  const hostingTypes = [
    {
      icon: Server,
      title: "Minecraft Hosting",
      price: "₹90",
      description: "Premium game servers with instant setup, DDoS protection, and 24/7 support.",
      features: ["1-Click Modpack Installation", "Free Subdomain", "Automatic Backups"],
      gradient: "from-primary-cyan to-primary-orange",
      glowColor: "primary-cyan",
      borderColor: "primary-cyan/30"
    },
    {
      icon: Bot,
      title: "Bot Hosting",
      price: "₹40",
      description: "Reliable hosting for Discord bots, APIs, and small applications.",
      features: ["99.9% Uptime", "Auto Restart", "Easy Deployment"],
      gradient: "from-primary-orange to-primary-red",
      glowColor: "primary-orange",
      borderColor: "primary-orange/30"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #00d4ff 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="heading-glow">Hosting Solution</span>
          </h2>
          <p className="text-medium-contrast text-xl max-w-3xl mx-auto">
            From Minecraft servers to enterprise VPS, we've got the perfect hosting solution for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {hostingTypes.map((hosting, index) => (
            <motion.div
              key={hosting.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="glass border-2 border-glass-border hover:border-primary-cyan/50 transition-all duration-500 h-full relative overflow-hidden cyan-glow">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${hosting.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-primary-cyan/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${hosting.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <hosting.icon className="w-8 h-8 text-accent-white" />
                  </div>

                  {/* Title and Price */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{hosting.title}</h3>
                    <div className="flex items-baseline space-x-1 mt-2">
                      <span className="text-medium-contrast text-lg">Starting at </span>
                      <span className="text-4xl font-bold text-primary-cyan">
                        {hosting.price}
                      </span>
                      <span className="text-muted-contrast">/month</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-medium-contrast mb-6 leading-relaxed">
                    {hosting.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {hosting.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
                        <span className="text-medium-contrast text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <Button
                    onClick={() => {
                      const pageMap = {
                        "Minecraft Hosting": "pricing-minecraft",
                        "Bot Hosting": "pricing-bots"
                      };
                      const targetPage = pageMap[hosting.title as keyof typeof pageMap];
                      if (targetPage) {
                        onNavigate(targetPage);
                        // For Minecraft hosting, scroll to budget section
                        if (targetPage === "pricing-minecraft") {
                          setTimeout(() => {
                            const budgetSection = document.getElementById('budget');
                            if (budgetSection) {
                              budgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 500);
                        }
                      }
                    }}
                    className={`w-full btn-primary font-medium py-3 rounded-xl transition-all duration-300 group-hover:shadow-2xl`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>

                {/* Floating Accent */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary-cyan rounded-full opacity-60 animate-pulse"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}