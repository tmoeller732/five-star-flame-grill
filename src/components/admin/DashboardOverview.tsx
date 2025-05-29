
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  todayOrders: number;
  totalCustomers: number;
  recentOrders: any[];
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    todayRevenue: 0,
    totalOrders: 0,
    todayOrders: 0,
    totalCustomers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch total revenue and orders
      const { data: allOrders, error: ordersError } = await supabase
        .from('orders')
        .select('grand_total, created_at')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch total customers
      const { data: customers, error: customersError } = await supabase
        .from('profiles')
        .select('id');

      if (customersError) throw customersError;

      // Fetch recent orders with customer info
      const { data: recentOrders, error: recentError } = await supabase
        .from('orders')
        .select(`
          id,
          grand_total,
          status,
          created_at,
          profiles!inner(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Calculate stats
      const totalRevenue = allOrders?.reduce((sum, order) => sum + order.grand_total, 0) || 0;
      const todayOrders = allOrders?.filter(order => 
        order.created_at?.startsWith(today)
      ) || [];
      const todayRevenue = todayOrders.reduce((sum, order) => sum + order.grand_total, 0);

      setStats({
        totalRevenue,
        todayRevenue,
        totalOrders: allOrders?.length || 0,
        todayOrders: todayOrders.length,
        totalCustomers: customers?.length || 0,
        recentOrders: recentOrders || []
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center">Loading dashboard...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-grill-gold">${stats.todayRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-grill-gold" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Today's Orders</p>
              <p className="text-2xl font-bold text-grill-gold">{stats.todayOrders}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-grill-gold" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-grill-gold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-grill-gold" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-grill-gold">{stats.totalCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-grill-gold" />
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6 bg-card border-gray-700">
        <h3 className="text-xl font-bold text-grill-gold mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {stats.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-white">
                  {order.profiles?.first_name} {order.profiles?.last_name}
                </p>
                <p className="text-sm text-gray-400">{order.profiles?.email}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-grill-gold">${order.grand_total.toFixed(2)}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  order.status === 'completed' ? 'bg-green-900 text-green-300' :
                  order.status === 'confirmed' ? 'bg-blue-900 text-blue-300' :
                  order.status === 'preparing' ? 'bg-yellow-900 text-yellow-300' :
                  order.status === 'ready' ? 'bg-purple-900 text-purple-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
