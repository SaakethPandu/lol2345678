import { createClient } from '@supabase/supabase-js@2.39.7'
import { projectId, publicAnonKey } from './info'

const supabaseUrl = `https://${projectId}.supabase.co`



// Database types for customer orders
export interface CustomerOrder {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  items: any[]
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed'
  admin_notes?: string
  pterodactyl_credentials?: {
    panelUrl: string
    username: string
    password: string
  }
  notes?: string
  created_at: string
  updated_at: string
  processed_at?: string
  completed_at?: string
}

export interface Admin {
  id: string
  email: string
  role: string
  created_at: string
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, publicAnonKey)

// ============================================
// CUSTOMER ORDER FUNCTIONS (No Auth Required)
// ============================================

/**
 * Create a new customer order (called from checkout)
 * No authentication required - anyone can create an order
 */
export const createCustomerOrder = async (orderData: {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  items: any[]
  total_amount: number
  notes?: string
}) => {
  console.log('Creating customer order with data:', orderData);
  
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, saving to localStorage');
    const order = saveOrderToLocalStorage(orderData);
    return { data: order, error: null };
  }

  console.log('Supabase is configured, attempting to save to database...');
  
  try {
    const { data, error } = await supabase
      .from('customer_orders')
      .insert({
        ...orderData,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    
    console.log('Successfully saved order to Supabase:', data);
    return { data, error: null }
  } catch (error: any) {
    console.error('Error creating order in Supabase:', error);
    console.log('Falling back to localStorage...');
    const order = saveOrderToLocalStorage(orderData);
    return { data: order, error: null }
  }
}

/**
 * Fallback: Save order to localStorage if Supabase is not configured
 */
export const saveOrderToLocalStorage = (orderData: {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  items: any[]
  total_amount: number
  notes?: string
}) => {
  const order: CustomerOrder = {
    id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...orderData,
    status: 'pending',
    payment_status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const existingOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]')
  localStorage.setItem('dishagb_fallback_orders', JSON.stringify([order, ...existingOrders]))
  
  return order
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

/**
 * Verify admin credentials
 */
export const verifyAdminCredentials = async (email: string, password: string) => {
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, using demo mode');
    return { data: null, error: { message: 'Supabase not configured' } };
  }

  try {
    const { data, error } = await supabase.rpc('verify_admin_credentials', {
      input_email: email,
      input_password: password
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.log('Error verifying admin, using demo mode fallback');
    return { data: null, error }
  }
}

/**
 * Get admin details by email (no password returned)
 */
export const getAdminByEmail = async (email: string) => {
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, using demo mode');
    return { data: null, error: { message: 'Supabase not configured' } };
  }

  try {
    const { data, error } = await supabase.rpc('get_admin_by_email', {
      admin_email: email
    })
    
    if (error) throw error
    return { data: data?.[0] || null, error: null }
  } catch (error: any) {
    console.log('Error getting admin, using demo mode fallback');
    return { data: null, error }
  }
}

/**
 * Fetch all customer orders (admin only)
 */
export const fetchCustomerOrders = async () => {
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, using demo mode with localStorage');
    const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    return { data: fallbackOrders, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('customer_orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.error('Error fetching orders from Supabase:', error);
    console.log('Using localStorage fallback');
    const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    return { data: fallbackOrders, error: null }
  }
}

/**
 * Test if we can actually insert a test order (for debugging)
 */
export const testOrderInsertion = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const testOrder = {
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '+91-9999999999',
      customer_address: 'Test Address, India',
      items: [{ name: 'Test Item', price: 100 }],
      total_amount: 100,
      notes: 'Test order for debugging'
    };

    console.log('Attempting to insert test order:', testOrder);
    
    const { data, error } = await supabase
      .from('customer_orders')
      .insert({
        ...testOrder,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Test order insertion failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Test order inserted successfully:', data);
    
    // Clean up test order
    await supabase
      .from('customer_orders')
      .delete()
      .eq('id', data.id);
    
    console.log('Test order cleaned up');
    return { success: true, data };
  } catch (error: any) {
    console.error('Test order insertion error:', error);
    return { success: false, error: error.message };
  }
}

// Global test function for debugging (can be called from browser console)
(window as any).testSupabaseSetup = async () => {
  console.log('=== Supabase Setup Test ===');
  console.log('Project ID:', projectId);
  console.log('Supabase URL:', supabaseUrl);
  console.log('Public Key Length:', publicAnonKey.length);
  console.log('Is Configured:', isSupabaseConfigured());
  
  const connectionTest = await testSupabaseConnection();
  console.log('Connection Test:', connectionTest);
  
  if (connectionTest.connected) {
    const insertTest = await testOrderInsertion();
    console.log('Insert Test:', insertTest);
  }
  
  console.log('=== Test Complete ===');
};

/**
 * Update order status (admin only)
 */
export const updateOrderStatus = async (
  orderId: string, 
  updates: {
    status?: CustomerOrder['status']
    payment_status?: CustomerOrder['payment_status']
    admin_notes?: string
    pterodactyl_credentials?: any
  }
) => {
  // Check if Supabase is configured first
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, updating localStorage');
    const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    const updatedOrders = fallbackOrders.map((order: CustomerOrder) => {
      if (order.id === orderId) {
        const updateData: any = { ...order, ...updates, updated_at: new Date().toISOString() };
        
        if (updates.status === 'completed') {
          updateData.completed_at = new Date().toISOString();
        }
        
        if (updates.status === 'processing') {
          updateData.processed_at = new Date().toISOString();
        }
        
        return updateData;
      }
      return order;
    });
    
    localStorage.setItem('dishagb_fallback_orders', JSON.stringify(updatedOrders));
    const updatedOrder = updatedOrders.find((o: CustomerOrder) => o.id === orderId);
    return { data: updatedOrder, error: null };
  }

  try {
    const updateData: any = { ...updates }
    
    if (updates.status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    }
    
    if (updates.status === 'processing') {
      updateData.processed_at = new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('customer_orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error: any) {
    console.log('Error updating order, using localStorage fallback');
    const fallbackOrders = JSON.parse(localStorage.getItem('dishagb_fallback_orders') || '[]');
    const updatedOrders = fallbackOrders.map((order: CustomerOrder) => {
      if (order.id === orderId) {
        const updateData: any = { ...order, ...updates, updated_at: new Date().toISOString() };
        
        if (updates.status === 'completed') {
          updateData.completed_at = new Date().toISOString();
        }
        
        if (updates.status === 'processing') {
          updateData.processed_at = new Date().toISOString();
        }
        
        return updateData;
      }
      return order;
    });
    
    localStorage.setItem('dishagb_fallback_orders', JSON.stringify(updatedOrders));
    const updatedOrder = updatedOrders.find((o: CustomerOrder) => o.id === orderId);
    return { data: updatedOrder, error: null }
  }
}

/**
 * Subscribe to real-time order changes (admin panel)
 * DISABLED: Real-time not enabled, using polling instead
 */
export const subscribeToOrders = (callback: (payload: any) => void) => {
  // Real-time disabled - return null
  console.log('Real-time subscription disabled, using polling instead');
  return null
}

/**
 * Unsubscribe from real-time changes
 */
export const unsubscribeFromOrders = (channel: any) => {
  // No-op since real-time is disabled
  console.log('Real-time unsubscribe (no-op)');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
  const configured = projectId !== 'your-project-id' && publicAnonKey !== 'your-anon-key';
  console.log('Supabase Configuration Check:', {
    projectId,
    publicAnonKeyLength: publicAnonKey.length,
    supabaseUrl,
    configured
  });
  return configured;
}

/**
 * Test Supabase connection
 */
export const testSupabaseConnection = async () => {
  console.log('Testing Supabase connection...');
  
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured according to isSupabaseConfigured()');
    return { connected: false, error: { message: 'Supabase not configured' } };
  }

  try {
    console.log('Attempting to connect to Supabase...');
    const { data, error } = await supabase
      .from('customer_orders')
      .select('count')
      .limit(1)
    
    console.log('Supabase connection test result:', { data, error, connected: !error });
    return { connected: !error, error }
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return { connected: false, error }
  }
}
