
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, Filter } from 'lucide-react';

interface OrderWithCustomer {
  id: string;
  items: any[];
  total: number;
  grand_total: number;
  status: string;
  created_at: string;
  special_instructions?: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
}

const OrdersManagement = () => {
  const [orders, setOrders] = useState<OrderWithCustomer[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!inner(first_name, last_name, email, phone)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedOrders: OrderWithCustomer[] = (data || []).map((order) => ({
        id: order.id,
        items: Array.isArray(order.items) ? order.items : [],
        total: order.total,
        grand_total: order.grand_total,
        status: order.status || 'pending',
        created_at: order.created_at || '',
        special_instructions: order.special_instructions || undefined,
        profiles: order.profiles
      }));

      setOrders(convertedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const orderDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          orderDate.setDate(now.getDate());
          filtered = filtered.filter(order => 
            new Date(order.created_at).toDateString() === orderDate.toDateString()
          );
          break;
        case 'week':
          orderDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(order => 
            new Date(order.created_at) >= orderDate
          );
          break;
        case 'month':
          orderDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(order => 
            new Date(order.created_at) >= orderDate
          );
          break;
      }
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center">Loading orders...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-400 flex items-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-grill-gold">Order ID</TableHead>
                <TableHead className="text-grill-gold">Customer</TableHead>
                <TableHead className="text-grill-gold">Items</TableHead>
                <TableHead className="text-grill-gold">Total</TableHead>
                <TableHead className="text-grill-gold">Status</TableHead>
                <TableHead className="text-grill-gold">Date</TableHead>
                <TableHead className="text-grill-gold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-gray-600">
                  <TableCell className="text-white font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <p className="font-medium">
                        {order.profiles.first_name} {order.profiles.last_name}
                      </p>
                      <p className="text-sm text-gray-400">{order.profiles.email}</p>
                      {order.profiles.phone && (
                        <p className="text-sm text-gray-400">{order.profiles.phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div className="text-sm">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      {order.special_instructions && (
                        <p className="text-xs text-gray-400 mt-1">
                          Note: {order.special_instructions}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-grill-gold font-semibold">
                    ${order.grand_total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-white hover:bg-gray-700"
                      onClick={() => {
                        // TODO: Implement order details modal
                        toast({
                          title: "Order Details",
                          description: "Order details view coming soon.",
                        });
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default OrdersManagement;
