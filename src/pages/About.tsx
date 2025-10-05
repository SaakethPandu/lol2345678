import { motion } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Users, 
  Target, 
  Zap, 
  Shield,
  Globe,
  Award,
  Heart,
  Rocket
} from "lucide-react";

const timelineEvents = [
  {
    year: "2020",
    title: "Company Founded",
    description: "DishaGB Hosting was born from a passion for gaming and technology, starting with a small team of dedicated developers."
  },
  {
    year: "2021", 
    title: "First 1000 Customers",
    description: "Reached our first milestone of 1000 satisfied customers with our innovative hosting solutions."
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded our network to 15 global locations, ensuring low latency worldwide."
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Launched AI-powered support and server optimization, revolutionizing customer experience."
  },
  {
    year: "2024",
    title: "50K+ Players",
    description: "Celebrating over 50,000 active players across our hosting network worldwide."
  }
];

const team = [
  {
    name: "Radhe Krishna",
    role: "Founder & CEO",
    description: "Visionary leader with 10+ years in cloud infrastructure and gaming technology.",
    avatar: "RK"
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    description: "Expert in distributed systems and AI, driving our technical innovation forward.",
    avatar: "PS"
  },
  {
    name: "Arjun Patel",
    role: "Head of Operations",
    description: "Ensures 99.9% uptime with expertise in datacenter management and optimization.",
    avatar: "AP"
  },
  {
    name: "Meera Singh",
    role: "Customer Success",
    description: "Dedicated to delivering exceptional customer experiences and support solutions.",
    avatar: "MS"
  }
];

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly pushing boundaries with cutting-edge technology and AI-powered solutions."
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "99.9% uptime guarantee backed by enterprise-grade infrastructure and monitoring."
  },
  {
    icon: Heart,
    title: "Community",
    description: "Building strong relationships with our gaming community and supporting their success."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Worldwide network ensuring low latency and optimal performance everywhere."
  }
];

export function About() {
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
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="neon-gradient-text">DishaGB Hosting</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            We're on a mission to <span className="text-neon-blue">revolutionize gaming hosting</span> with 
            cutting-edge technology, <span className="text-neon-purple">AI-powered solutions</span>, and 
            an unwavering commitment to the <span className="text-neon-lime">gaming community</span>.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 hover-neon h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-neon-blue mr-3" />
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To empower gaming communities worldwide with <span className="text-neon-blue">ultra-reliable hosting solutions</span> that 
                  deliver exceptional performance, security, and support. We believe every gamer deserves 
                  <span className="text-neon-purple"> lag-free experiences</span> and <span className="text-neon-lime">instant accessibility</span>.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300 hover-neon h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Rocket className="w-8 h-8 text-neon-purple mr-3" />
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To become the <span className="text-neon-purple">leading force</span> in next-generation gaming infrastructure, 
                  setting new standards for performance, reliability, and innovation. We envision a future where 
                  <span className="text-neon-blue"> AI-powered hosting</span> seamlessly adapts to every gaming need.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our <span className="cyber-gradient-text">Journey</span>
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="glass border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 hover-glow">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary-cyan mb-2">
                          {event.year}
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-6 h-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full border-4 border-bg-primary animate-pulse-neon"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our <span className="neon-gradient-text">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="glass border-neon-blue/20 hover:border-neon-blue/40 transition-all duration-300 hover-neon h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">{value.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Meet Our <span className="cyber-gradient-text">Team</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="glass border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300 hover-neon h-full text-center group">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-neon">
                      {member.avatar}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                    <p className="text-neon-blue text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center glass p-8 rounded-2xl border border-neon-blue/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join the <span className="text-neon-lime">Future?</span>
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Experience the difference that <span className="text-neon-blue">next-generation hosting</span> can make 
            for your gaming community. Start your journey with DishaGB Hosting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-8 py-3 transition-all duration-300 hover-neon font-medium">
                Start Your Server
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10 hover:border-neon-lime px-8 py-3 transition-all duration-300">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}