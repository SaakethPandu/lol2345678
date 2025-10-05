import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  MapPin, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Activity,
  CheckCircle,
  Clock4
} from "lucide-react";

export function DataCenters() {
  const dataCenters = [
    {
      country: "India",
      location: "Mumbai DC",
      status: "online",
      uptime: "99.9%",
      avgLatency: "27ms",
      speed: "5Gbps",
      statusText: "Online",
      statusColor: "neon-lime",
      borderColor: "neon-lime/30",
      glowColor: "neon-lime",
      features: [
        "High Performance",
        "DDoS Protected", 
        "24/7 Support",
        "Instant Setup"
      ],
      details: {
        uptime: "100.0%",
        status: "Active"
      }
    },
    {
      country: "India",
      location: "Noida DC",
      status: "online",
      uptime: "99.9%",
      avgLatency: "32ms",
      speed: "5Gbps",
      statusText: "Online",
      statusColor: "neon-lime",
      borderColor: "neon-lime/30", 
      glowColor: "neon-lime",
      features: [
        "North India Region",
        "Ultra-Low Latency",
        "Advanced Security",
        "Instant Setup"
      ],
      details: {
        uptime: "100.0%",
        status: "Active"
      }
    },
    {
      country: "India",
      location: "Karnataka DC",
      status: "online",
      uptime: "99.9%",
      avgLatency: "29ms",
      speed: "5Gbps",
      statusText: "Online", 
      statusColor: "neon-lime",
      borderColor: "neon-lime/30",
      glowColor: "neon-lime",
      features: [
        "South India Region",
        "Lightning Fast",
        "GDPR Compliant",
        "Instant Setup"
      ],
      details: {
        uptime: "100.0%",
        status: "Active"
      }
    }
  ];

  return (
    <section className="relative py-24 bg-bg-primary">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
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
            Our <span className="neon-gradient-text">Nodes</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Our worldwide infrastructure ensures lightning-fast performance wherever you are
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dataCenters.map((dc, index) => (
            <motion.div
              key={dc.location}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className={`glass border-2 border-${dc.borderColor} hover:border-${dc.glowColor} transition-all duration-500 h-full relative overflow-hidden`}>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-${dc.glowColor}/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className={`absolute inset-0 bg-${dc.glowColor}/20 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${dc.glowColor} to-${dc.glowColor}/60 rounded-xl flex items-center justify-center`}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${dc.status === 'online' 
                          ? 'border-neon-lime/50 text-neon-lime bg-neon-lime/10' 
                          : 'border-neon-pink/50 text-neon-pink bg-neon-pink/10'
                        }
                      `}
                    >
                      {dc.status === 'online' ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
                          <span>{dc.statusText}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
                          <span>Coming Soon</span>
                        </div>
                      )}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl text-white mb-2">
                    🔹 {dc.country} – {dc.location}
                  </CardTitle>

                  <div className="space-y-3">
                    {dc.status === 'online' ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Status:</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-neon-lime rounded-full"></div>
                            <span className="text-neon-lime font-medium">{dc.statusText}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Uptime:</span>
                          <span className="text-neon-blue font-medium">{dc.uptime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Location:</span>
                          <span className="text-gray-300">{dc.country}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Avg Latency:</span>
                          <span className="text-neon-purple font-medium">{dc.avgLatency}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Status:</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                            <span className="text-neon-pink font-medium">{dc.statusText}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Expected:</span>
                          <span className="text-neon-purple font-medium">{dc.expectedDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Progress:</span>
                          <span className="text-neon-blue font-medium">{dc.progress}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  {dc.status === 'development' && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Development Progress</span>
                        <span className="text-sm font-medium text-neon-blue">{dc.progress}%</span>
                      </div>
                      <Progress 
                        value={dc.progress} 
                        className={`h-2 bg-bg-tertiary border border-${dc.borderColor}`}
                      />
                      <div 
                        className={`h-2 bg-gradient-to-r from-${dc.glowColor} to-${dc.glowColor}/60 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${dc.progress}%` }}
                      ></div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {dc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 bg-${dc.glowColor} rounded-full ${dc.status === 'online' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {dc.status === 'online' && (
                    <div className="mt-6 pt-6 border-t border-gray-700/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-neon-lime">{dc.details.uptime}</div>
                          <div className="text-xs text-gray-400">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-neon-blue">{dc.speed}</div>
                          <div className="text-xs text-gray-400">Speed</div>
                        </div>
                      </div>
                      
                      <div className="mt-[16px] p-[12px] bg-neon-lime/10 border border-neon-lime/30 rounded-lg mr-[11px] mb-[10px] ml-[3px]">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-neon-lime" />
                          <span className="text-sm font-medium text-neon-lime">Status: {dc.details.status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Floating Icons */}
                <div className="absolute top-6 right-6 opacity-20">
                  {dc.status === 'online' ? (
                    <Activity className={`w-6 h-6 text-${dc.glowColor} animate-pulse`} />
                  ) : (
                    <Clock4 className={`w-6 h-6 text-${dc.glowColor}`} />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}