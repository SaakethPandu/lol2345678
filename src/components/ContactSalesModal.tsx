import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, User, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SalesMessage {
  id: string;
  email: string;
  username: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'responded';
}

// Mock sales messages store
const salesMessages: SalesMessage[] = [];

export function ContactSalesModal({ isOpen, onClose }: ContactSalesModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to mock sales messages
    const newMessage: SalesMessage = {
      id: Date.now().toString(),
      email: formData.email,
      username: formData.username,
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    salesMessages.push(newMessage);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({
        email: user?.email || '',
        username: user?.username || '',
        message: ''
      });
      setErrors({});
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setFormData({
      email: user?.email || '',
      username: user?.username || '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-md bg-bg-card border border-glass-border rounded-xl p-6 glass"
          onClick={(e) => e.stopPropagation()}
        >
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-neon-blue" />
                  <h2 className="text-xl text-white">Send us a message</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="hover:bg-neon-blue/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-gray-400 text-sm mb-6">
                Have questions about our services? Our sales team is here to help!
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-email" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="sales-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`bg-input-background border-glass-border ${errors.email ? 'border-destructive' : ''}`}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="text-destructive text-sm">{errors.email}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-username" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Username</span>
                  </Label>
                  <Input
                    id="sales-username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className={`bg-input-background border-glass-border ${errors.username ? 'border-destructive' : ''}`}
                    placeholder="Enter your username"
                    disabled={isSubmitting}
                  />
                  {errors.username && (
                    <span className="text-destructive text-sm">{errors.username}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-message" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </Label>
                  <Textarea
                    id="sales-message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className={`bg-input-background border-glass-border min-h-[100px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Tell us about your hosting needs, questions, or how we can help..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <span className="text-destructive text-sm">{errors.message}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white mb-2"
              >
                Message Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400"
              >
                Thank you for contacting us. Our sales team will get back to you within 24 hours.
              </motion.p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Export function to get all sales messages for admin
export function getAllSalesMessages(): SalesMessage[] {
  return [...salesMessages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}