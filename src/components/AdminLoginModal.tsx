import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Lock, Mail } from "lucide-react";
import { verifyAdminCredentials, getAdminByEmail, isSupabaseConfigured } from "../utils/supabase/client";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (adminData: { id: string; email: string; role: string }) => void;
}

export function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Check if credentials match the hardcoded admin
      const isCorrectCredentials = email === 'admin@dishagb.shop' && password === 'dishagb@shop';
      
      if (isSupabaseConfigured()) {
        // Try Supabase authentication
        const { data: isValid, error: verifyError } = await verifyAdminCredentials(email, password);

        if (verifyError || !isValid) {
          // Fallback to hardcoded credentials if Supabase fails
          if (isCorrectCredentials) {
            const demoAdmin = {
              id: 'demo-admin-id',
              email: 'admin@dishagb.shop',
              role: 'superadmin'
            };
            
            localStorage.setItem('dishagb_admin_session', JSON.stringify({
              ...demoAdmin,
              loginTime: new Date().toISOString()
            }));
            
            setEmail("");
            setPassword("");
            setError("");
            onLoginSuccess(demoAdmin);
            onClose();
          } else {
            setError("Invalid credentials");
          }
        } else {
          // Get admin details from Supabase
          const { data: admin, error: adminError } = await getAdminByEmail(email);

          if (adminError || !admin) {
            setError("Admin account not found");
          } else {
            localStorage.setItem('dishagb_admin_session', JSON.stringify({
              id: admin.id,
              email: admin.email,
              role: admin.role,
              loginTime: new Date().toISOString()
            }));
            
            setEmail("");
            setPassword("");
            setError("");
            onLoginSuccess({
              id: admin.id,
              email: admin.email,
              role: admin.role
            });
            onClose();
          }
        }
      } else {
        // Demo mode - use hardcoded credentials
        if (isCorrectCredentials) {
          const demoAdmin = {
            id: 'demo-admin-id',
            email: 'admin@dishagb.shop',
            role: 'superadmin'
          };
          
          localStorage.setItem('dishagb_admin_session', JSON.stringify({
            ...demoAdmin,
            loginTime: new Date().toISOString()
          }));
          
          setEmail("");
          setPassword("");
          setError("");
          onLoginSuccess(demoAdmin);
          onClose();
        } else {
          setError("Invalid credentials. Use admin@dishagb.shop / dishagb@shop");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - prevent clicks to underlying site */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="bg-bg-card rounded-2xl p-8 max-w-md w-full glass border-2 border-primary-cyan/30 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-primary-cyan" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Admin Login</h2>
                    <p className="text-text-muted text-sm">DishaGB Hosting Dashboard</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-text-muted hover:text-primary-cyan transition-colors p-2 hover:bg-primary-cyan/10 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-glass-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 focus:border-primary-cyan/50"
                      placeholder="admin@dishagb.shop"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-glass-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 focus:border-primary-cyan/50"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-cyan to-primary-orange text-white py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Login</span>
                    </div>
                  )}
                </motion.button>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-glass-border">
                <p className="text-text-muted text-xs text-center">
                  Secure admin access • DishaGB Hosting Platform
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
