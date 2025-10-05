import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  FileText, 
  Search,
  HelpCircle,
  Book,
  Settings,
  Shield
} from "lucide-react";
import { useState } from "react";

const supportCategories = [
  {
    icon: Settings,
    title: "Server Setup",
    description: "Get help setting up your Minecraft server",
    articles: 12
  },
  {
    icon: Shield,
    title: "Security & DDoS",
    description: "Learn about our protection features",
    articles: 8
  },
  {
    icon: Book,
    title: "Plugin Management",
    description: "Installing and managing server plugins",
    articles: 15
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and their solutions",
    articles: 20
  }
];

const faqs = [
  {
    question: "How quickly can I get my server running?",
    answer: "Your server will be ready in under 60 seconds after payment confirmation. Our automated system provisions resources instantly."
  },
  {
    question: "Do you provide automatic backups?",
    answer: "Yes! We create automatic daily backups of your server data. You can also create manual backups anytime through your control panel."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can change your hosting plan at any time. Upgrades are instant, and downgrades take effect at your next billing cycle."
  },
  {
    question: "What Minecraft versions do you support?",
    answer: "We support all Minecraft versions from 1.8 to the latest release, including snapshots. You can easily switch versions through your control panel."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with our service, contact us within 7 days for a full refund."
  }
];

export function Support() {

  return (
    <>
      <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              How can we help you?
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Get the support you need to make the most of your Minecraft server
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Support
            </h2>
            <p className="text-gray-400">
              Choose the best way to reach our expert team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email Support */}
            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-colors">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">Email Support</CardTitle>
                <p className="text-gray-400 text-sm">Get detailed help via email</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-blue-400 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Response within 2 hours</span>
                </div>
                <div className="mb-4">
                  <a 
                    href="mailto:support@dishagb.shop" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@dishagb.shop
                  </a>
                </div>
                <Button 
                  onClick={() => window.location.href = 'mailto:support@dishagb.shop'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* Discord Support */}
            <Card className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-colors">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Discord Support</CardTitle>
                <p className="text-gray-400 text-sm">Join our community for instant help</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online now</span>
                </div>
                <Button 
                  onClick={() => window.open('https://discord.gg/dishagb', '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Knowledge Base
            </h2>
            <p className="text-gray-400">
              Find answers to common questions and learn about our features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-green-500/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <IconComponent className="w-8 h-8 text-green-400 mb-3" />
                    <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articles} articles</span>
                      <FileText className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Quick answers to the most common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}