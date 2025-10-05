import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  LogOut,
  TrendingUp,
  DollarSign,
  Clock,
  Check,
  X as XIcon,
  Mail,
  Phone,
  Package,
  RefreshCw,
  Menu,
  CheckCircle2,
  Copy,
  MessageCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  fetchCustomerOrders, 
  updateOrderStatus,
  isSupabaseConfigured,
  CustomerOrder 
} from "../utils/supabase/client";
import { toast } from "sonner@2.0.3";

interface AdminProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

type ViewMode = 'home' | 'current' | 'completed';

export function AdminSimple({ onNavigate, onLogout }: AdminProps) {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrderForDelivery, setSelectedOrderForDelivery] = useState<CustomerOrder | null>(null);

  // Debug function to test Supabase connection
  const testConnection = async () => {
    try {
      const { testSupabaseConnection, testOrderInsertion } = await import('../utils/supabase/client');
      
      const connectionResult = await testSupabaseConnection();
      
      if (connectionResult.connected) {
        toast.success('✅ Supabase connected successfully!');
        
        const insertResult = await testOrderInsertion();
        
        if (insertResult.success) {
          toast.success('✅ Order insertion test passed!');
        } else {
          toast.error(`❌ Order insertion failed: ${insertResult.error}`);
        }
      } else {
        toast.error(`❌ Connection failed: ${connectionResult.error?.message}`);
      }
    } catch (error: any) {
      toast.error(`❌ Test error: ${error.message}`);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Fetch orders from Supabase or fallback
  const fetchOrders = async (showRefreshMessage = false) => {
    if (showRefreshMessage) {
      setRefreshing(true);
    }
    
    try {
      const previousOrderCount = orders.length;
      
      if (isSupabaseConfigured()) {
        const { data, error } = await fetchCustomerOrders();

        if (error) {
          loadFallbackOrders();
        } else {
          setOrders(data || []);
          
          if (showRefreshMessage) {
            const newOrderCount = data?.length || 0;
            const newOrders = newOrderCount - previousOrderCount;
            
            if (newOrders > 0) {
              toast.success(`🎉 ${newOrders} new order${newOrders === 1 ? '' : 's'} found!`, {
                duration: 3000,
              });
            } else if (newOrderCount === 0) {
              toast.info("📋 No orders found yet.", {
                duration: 2000,
              });
            } else {
              toast.info("✅ No new orders found.", {
                duration: 2000,
              });
            }
          }
        }
      } else {
        loadFallbackOrders();
        
        if (showRefreshMessage) {
          const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
          const newOrderCount = fallbackOrders.length;
          const newOrders = newOrderCount - previousOrderCount;
          
          if (newOrders > 0) {
            toast.success(`🎉 ${newOrders} new order${newOrders === 1 ? '' : 's'} found!`, {
              duration: 3000,
            });
          } else if (newOrderCount === 0) {
            toast.info("📋 No orders found yet.", {
              duration: 2000,
            });
          } else {
            toast.info("✅ No new orders found.", {
              duration: 2000,
            });
          }
        }
      }
      
      if (showRefreshMessage) {
        setLastRefreshTime(new Date());
      }
    } catch (err) {
      loadFallbackOrders();
      if (showRefreshMessage) {
        toast.error("❌ Failed to refresh orders", {
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
      if (showRefreshMessage) {
        setTimeout(() => setRefreshing(false), 500);
      }
    }
  };

  // Load orders from localStorage (fallback)
  const loadFallbackOrders = () => {
    const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    setOrders(fallbackOrders);
    
    if (fallbackOrders.length === 0) {
      toast.info("No orders yet. Customers' orders will appear here.");
    }
  };

  // Polling-based updates (real-time disabled)
  useEffect(() => {
    fetchOrders(false);

    // Poll for changes every 10 seconds
    const pollInterval = setInterval(() => {
      fetchOrders(false);
    }, 10000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const updates: any = { payment_status: paymentStatus };

      if (isSupabaseConfigured()) {
        const { error } = await updateOrderStatus(orderId, updates);

        if (error) {
          console.warn('Supabase error, using fallback:', error);
          updateFallbackOrder(orderId, updates);
        } else {
          toast.success("Payment status updated");
          fetchOrders(false);
        }
      } else {
        updateFallbackOrder(orderId, updates);
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Failed to update payment status");
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      const updates: any = { 
        status: 'completed',
        updated_at: new Date().toISOString()
      };

      if (isSupabaseConfigured()) {
        const { error } = await updateOrderStatus(orderId, updates);

        if (error) {
          console.warn('Supabase error, using fallback:', error);
          updateFallbackOrder(orderId, updates);
        } else {
          toast.success("Order moved to completed!");
          setSelectedOrderForDelivery(null);
          fetchOrders(false);
        }
      } else {
        updateFallbackOrder(orderId, updates);
        setSelectedOrderForDelivery(null);
      }
    } catch (error) {
      console.error('Complete order error:', error);
      toast.error("Failed to complete order");
    }
  };

  const updateFallbackOrder = (orderId: string, updates: any) => {
    const existingOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    const updatedOrders = existingOrders.map((order: CustomerOrder) => 
      order.id === orderId ? { ...order, ...updates, updated_at: new Date().toISOString() } : order
    );
    localStorage.setItem('dishagb_fallback_orders', JSON.stringify(updatedOrders));
    toast.success("Updated successfully");
    fetchOrders(false);
  };

  const currentOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: completedOrders.length,
    totalRevenue: orders.reduce((sum, o) => sum + parseFloat(o.total_amount.toString() || '0'), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSendViaEmail = (order: CustomerOrder) => {
    const subject = encodeURIComponent(`DishaGB Hosting - Server Details for Order #${order.id.slice(0, 8)}`);
    const body = encodeURIComponent(`Dear ${order.customer_name},\n\nYour hosting service has been activated!\n\nOrder ID: ${order.id.slice(0, 8)}\nTotal Amount: ₹${order.total_amount}\n\n[Admin: Please provide pterodactyl panel credentials here]\nPanel URL: \nUsername: \nPassword: \n\nThank you for choosing DishaGB Hosting!\n\nBest regards,\nDishaGB Team`);
    
    window.location.href = `mailto:${order.customer_email}?subject=${subject}&body=${body}`;
    toast.success("Email client opened!");
  };

  const handleSendViaMobile = (order: CustomerOrder) => {
    const phoneNumber = order.customer_phone.replace(/\D/g, '');
    
    // Try to copy to clipboard
    navigator.clipboard.writeText(phoneNumber).then(() => {
      toast.success(`Phone number ${phoneNumber} copied to clipboard!`);
      
      // Also try to open dialer on mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `tel:${phoneNumber}`;
      }
    }).catch(() => {
      toast.error("Failed to copy phone number");
    });
  };

  const OrderCard = ({ order, showCompleteButton = false }: { order: CustomerOrder; showCompleteButton?: boolean }) => {
    const [paymentStatus, setPaymentStatus] = useState(order.payment_status || 'pending');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg p-6 border border-primary-cyan/20"
      >
        <div className="space-y-4">
          {/* Customer Name */}
          <div>
            <p className="text-xs text-gray-400">Customer Name</p>
            <p className="text-lg text-white">{order.customer_name}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm text-gray-300 flex items-center">
              <Mail className="h-3 w-3 mr-2 text-primary-cyan" />
              {order.customer_email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-xs text-gray-400">Phone Number</p>
            <p className="text-sm text-gray-300 flex items-center">
              <Phone className="h-3 w-3 mr-2 text-primary-cyan" />
              {order.customer_phone}
            </p>
          </div>

          {/* Order Details */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Order Details</p>
            <div className="space-y-1">
              {order.items?.map((item: any, idx: number) => (
                <Badge key={idx} variant="outline" className="border-primary-cyan/30 text-gray-300 mr-2">
                  {item.name} x{item.quantity} - ₹{item.price}
                </Badge>
              ))}
            </div>
            <p className="text-xl text-primary-orange mt-2">
              Total: ₹{parseFloat(order.total_amount.toString()).toLocaleString()}/month
            </p>
          </div>

          {/* Payment Status Dropdown */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Payment Status</p>
            <Select
              value={paymentStatus}
              onValueChange={(value) => {
                setPaymentStatus(value);
                handleUpdatePaymentStatus(order.id, value);
              }}
            >
              <SelectTrigger className="bg-bg-tertiary border-primary-cyan/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Not Received</SelectItem>
                <SelectItem value="paid">Received</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Continue Button - Only show when payment is received */}
          {paymentStatus === 'paid' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={() => setSelectedOrderForDelivery(order)}
                className="w-full bg-gradient-to-r from-primary-cyan to-primary-orange text-white hover:shadow-lg"
              >
                Continue →
              </Button>
            </motion.div>
          )}

          {/* Order Date */}
          <div className="pt-2 border-t border-primary-cyan/20">
            <p className="text-xs text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed md:sticky top-0 left-0 h-screen w-70 bg-bg-card border-r border-primary-cyan/30 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setViewMode('home');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    viewMode === 'home'
                      ? 'bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30'
                      : 'text-gray-400 hover:bg-bg-surface hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Home
                </button>

                <button
                  onClick={() => {
                    setViewMode('current');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    viewMode === 'current'
                      ? 'bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30'
                      : 'text-gray-400 hover:bg-bg-surface hover:text-white'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Current Orders
                  {currentOrders.length > 0 && (
                    <Badge className="ml-auto bg-primary-orange text-white">
                      {currentOrders.length}
                    </Badge>
                  )}
                </button>

                <button
                  onClick={() => {
                    setViewMode('completed');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    viewMode === 'completed'
                      ? 'bg-primary-cyan/20 text-primary-cyan border border-primary-cyan/30'
                      : 'text-gray-400 hover:bg-bg-surface hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="h-5 w-5 mr-3" />
                  Completed Orders
                  {completedOrders.length > 0 && (
                    <Badge className="ml-auto bg-green-500/20 text-green-400">
                      {completedOrders.length}
                    </Badge>
                  )}
                </button>
              </nav>

              <div className="mt-auto pt-6 border-t border-primary-cyan/20">
                <Button
                  variant="outline"
                  onClick={onLogout}
                  className="w-full border-primary-red/30 text-primary-red hover:bg-primary-red/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="admin-header-pinned bg-bg-card border-b border-primary-cyan/30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-white">
                  {viewMode === 'home' ? 'Dashboard' : viewMode === 'current' ? 'Current Orders' : 'Completed Orders'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  {lastRefreshTime && (
                    <span className="text-xs text-gray-500 mb-1">
                      Last: {lastRefreshTime.toLocaleTimeString()}
                    </span>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fetchOrders(true)}
                      disabled={refreshing}
                      className="text-gray-400 hover:text-white hover:bg-primary-cyan/10 transition-all duration-200"
                    >
                      <motion.div
                        animate={{ rotate: refreshing ? 360 : 0 }}
                        transition={{ 
                          duration: refreshing ? 1 : 0, 
                          repeat: refreshing ? Infinity : 0, 
                          ease: "linear" 
                        }}
                      >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'text-primary-cyan' : ''}`} />
                      </motion.div>
                      <span className="ml-2 text-sm">
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Home View - Stats */}
          {viewMode === 'home' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="glass border-primary-cyan/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Orders</p>
                        <p className="text-3xl text-white mt-1">{stats.total}</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-primary-cyan" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-yellow-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Pending</p>
                        <p className="text-3xl text-yellow-400 mt-1">{stats.pending}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-blue-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Processing</p>
                        <p className="text-3xl text-blue-400 mt-1">{stats.processing}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Completed</p>
                        <p className="text-3xl text-green-400 mt-1">{stats.completed}</p>
                      </div>
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-primary-orange/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Revenue</p>
                        <p className="text-2xl text-primary-orange mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary-orange" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass border-primary-cyan/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Package className="mr-2 h-5 w-5 text-primary-cyan" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="mb-3 pb-3 border-b border-primary-cyan/10 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white text-sm">{order.customer_name}</p>
                            <p className="text-xs text-gray-400">{order.customer_email}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass border-primary-orange/30">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Orders</span>
                      <span className="text-white">{currentOrders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed Orders</span>
                      <span className="text-white">{completedOrders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Revenue</span>
                      <span className="text-primary-orange">₹{stats.totalRevenue.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Current Orders View */}
          {viewMode === 'current' && (
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-cyan mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading orders...</p>
                </div>
              ) : currentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-600" />
                  <p className="text-gray-400 mt-4">No current orders</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Completed Orders View */}
          {viewMode === 'completed' && (
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-cyan mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading orders...</p>
                </div>
              ) : completedOrders.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-gray-600" />
                  <p className="text-gray-400 mt-4">No completed orders yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-lg p-6 border border-green-500/30"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-lg text-white">{order.customer_name}</p>
                            <p className="text-sm text-gray-400">Order #{order.id.slice(0, 8)}</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Completed
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-300">
                          <p className="flex items-center mb-1">
                            <Mail className="h-3 w-3 mr-2 text-primary-cyan" />
                            {order.customer_email}
                          </p>
                          <p className="flex items-center">
                            <Phone className="h-3 w-3 mr-2 text-primary-cyan" />
                            {order.customer_phone}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-green-500/20">
                          <p className="text-xl text-primary-orange">
                            ₹{parseFloat(order.total_amount.toString()).toLocaleString()}/month
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Completed: {new Date(order.updated_at || order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delivery Method Popup */}
      <AnimatePresence>
        {selectedOrderForDelivery && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-xl max-w-md w-full p-6 border border-primary-cyan/30"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Choose Delivery Method</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrderForDelivery(null)}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>

              <p className="text-gray-300 mb-6">
                How would you like to send the server details to <span className="text-primary-cyan">{selectedOrderForDelivery.customer_name}</span>?
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => {
                    handleSendViaEmail(selectedOrderForDelivery);
                    handleCompleteOrder(selectedOrderForDelivery.id);
                  }}
                  className="w-full bg-primary-cyan hover:bg-primary-cyan/80 text-white py-6 text-lg"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Send via Email
                </Button>

                <Button
                  onClick={() => {
                    handleSendViaMobile(selectedOrderForDelivery);
                    handleCompleteOrder(selectedOrderForDelivery.id);
                  }}
                  className="w-full bg-primary-orange hover:bg-primary-orange/80 text-white py-6 text-lg"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  Send via Mobile
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setSelectedOrderForDelivery(null)}
                  className="w-full border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
